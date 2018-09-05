import React from 'react';
import Aux from '../../../hoc/AuxFile';

const orderSummary = (props)=>{
  const ingredientSummary = Object.keys(props.ingredients)
    .map(key=>{
      return (
        <li>
        <span style={{textTransform:'capitalize'}}>{key}</span >: {props.ingredients[key]}
        </li>
      );
    });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Made fresh for you with the following ingredients:</p>
      <ul>
      {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary
