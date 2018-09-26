import * as actionType from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.0,
    cheese: 0.75,
    meat: 2,
    bacon: 1.25,
    sauce: 0.25
};

const basePrice = 4.00;

const initialState = {
    totalPrice: basePrice,
    count:0,
    ingredients: null,
    error: false,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.INGREDIENT_ADD:
        let ingredients = {...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient]+1};

        let purchVals = updatePurchaseState(ingredients);

            state = {
                ...state,
                ingredients,
                totalPrice: purchVals.totalPrice,
                count: purchVals.count,
            };

            console.log(state);
            break;
        case actionType.INGREDIENT_REMOVE:
          ingredients = {...state.ingredients,
          [action.ingredient]: Math.max(state.ingredients[action.ingredient]-1,0)};
          purchVals = updatePurchaseState(ingredients);

          state = {
              ...state,
              ingredients,

              totalPrice:purchVals.totalPrice, 
              count: purchVals.count,    

          };
            
           
            break;
      case actionType.INGREDIENTS_SET:
        purchVals = updatePurchaseState(action.ingredients);
        state = {
          ...state, 
          ingredients:action.ingredients,
          totalPrice:purchVals.totalPrice,
          count: purchVals.count,
          error:false,
        };
        console.log("STATEYSTATE", state);
        break;
      case actionType.FETCH_INGREDIENTS_FAILED:
        state = {...state, error:true};
        break;
      default:
    }
    return state;
};


const  updatePurchaseState = ingredients => {
    /*const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);*/
      
    let result = {count:0, price:basePrice};

    const summary = Object.keys(ingredients)
      .map(key => {
        return [key,ingredients[key]];
      })
      .reduce((summary,it)=>{ return {
        count: summary["count"]+it[1], 
        price: summary["price"]+(INGREDIENT_PRICES[it[0]]*it[1])}
      }, result);

    return ({ count: summary["count"], totalPrice:summary["price"] });
  };

export default reducer;
