import * as actionTypes from './actionTypes';

export const addIngredient = (ingredient)=>{
  return {
    type: actionTypes.INGREDIENT_ADD,
    ingredient
  }
}

export const removeIngredient = (ingredient)=>{
  return {
    type: actionTypes.INGREDIENT_REMOVE,
    ingredient
  }
}
