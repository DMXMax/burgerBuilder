import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

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
  count: 0,
  ingredients: null,
  error: false,
};

const reducer = (state = initialState, action) => {
  let updatedIngredient, ingredients;
  switch (action.type) {
    case actionType.INGREDIENT_ADD:
      updatedIngredient = { [action.ingredient]: state.ingredients[action.ingredient] + 1 }
      ingredients = updateObject(state.ingredients, updatedIngredient);
      state = updateObject(state, { ingredients, ...updatePurchaseState(ingredients) });
      break;
    case actionType.INGREDIENT_REMOVE:
      updatedIngredient = { [action.ingredient]: Math.max(0, state.ingredients[action.ingredient] - 1) }
      ingredients = updateObject(state.ingredients, updatedIngredient);
      state = updateObject(state, { ingredients, ...updatePurchaseState(ingredients) });
      break;
    case actionType.INGREDIENTS_SET:
      state = {
        ...state,
        ingredients: action.ingredients,
        ...updatePurchaseState(action.ingredients),
        error: false,
      };
      break;
    case actionType.FETCH_INGREDIENTS_FAILED:
      state = { ...state, error: true };
      break;
    default:
  }
  return state;
};


const updatePurchaseState = ingredients => {

  let result = { count: 0, price: basePrice };

  const summary = Object.keys(ingredients)
    .map(key => {
      return [key, ingredients[key]];
    })
    .reduce((summary, it) => {
      return {
        count: summary["count"] + it[1],
        price: summary["price"] + (INGREDIENT_PRICES[it[0]] * it[1])
      }
    }, result);

  return ({ count: summary["count"], totalPrice: summary["price"] });
};

export default reducer;
