import * as actionType from '../actions/actions';

const INGREDIENT_PRICES = {
    salad: 0.0,
    cheese: 0.75,
    meat: 2,
    bacon: 1.25,
    sauce: 0.25
};

const initialState = {
    totalPrice: 4,
    purchasable: false,
    count:0,
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        sauce: 0,
    },
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.INGREDIENT_ADD:
        console.log("STATE", state.count)
            state = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
                count: state.count + 1,
                purchasable: true,
            };

            console.log(state);
            break;
        case actionType.INGREDIENT_REMOVE:
            if (state.ingredients[action.ingredient] > 0) {
                state = {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredient]: state.ingredients[action.ingredient] - 1,
                    },

                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
                    count: state.count -1,    
                    purchasable: state.count >1,

                };
            }
           
            break;
        default:
    }
    return state;
};



export default reducer;