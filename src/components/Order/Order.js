import React from 'react';
import classes from './Order.css';
import ld from 'lodash'

const Order = (props)=>{

  let ingredientList = [];
  for(let ingredient in props.ingredients){
    let val= null;
    if( props.ingredients[ingredient] > 0)
      val = ingredient 
     if( props.ingredients[ingredient]>1)
      val= ingredient + " x " + props.ingredients[ingredient];
    if( val )
      ingredientList.push(<span style={{
        display: 'inline-block', 
          margin:'0 8px',padding:'.25em 1em .25em 1em', boxShadow: '2px 6px 3px #ccc', 
          border:'1px solid #ccc'}}key={ingredient}>{ld.capitalize(val)+" "}</span>)
  }

  return (
    <div className={classes.Order}>
      <p><strong>Ingredients</strong></p>
      {ingredientList}
      <p style={{fontSize: '1.3em'}}>Price: <strong>{props.price.toFixed(2)}</strong></p>
    </div>
  );

}

export default Order
