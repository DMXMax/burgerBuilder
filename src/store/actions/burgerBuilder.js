import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

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

export const fetchIngredientsFailed=()=>{
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }

}
export const setIngredients = (ingredients)=>{
  return {
      type:actionTypes.INGREDIENTS_SET,
      ingredients,
  };
};

export const initIngredients = ()=>{
  return dispatch =>{
      axios    
      .get("/ingredients.json")
      .then(res => {
        let ni = [];
        let resData = {};
        for (let x in res.data) {
          let di = {};
          di["name"] = x;
          di["start"] = res.data[x].start;
          di["index"] = res.data[x].index;
          ni.push(di);
        }
        ni.sort((a, b) => a.index > b.index);

        for (let x in ni) resData[ni[x].name] = ni[x].start;

        return dispatch(setIngredients(resData));
      })
      .catch(err => {
        console.log(err);
        return dispatch(fetchIngredientsFailed());        //this.setState({ error: true });
      });
  };
};
