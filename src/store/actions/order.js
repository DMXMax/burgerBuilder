import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess=(orderId,orderData)=>{
  return {
    type:actionType.PURCHASE_ORDER_SUCCESS,
    orderId,
    orderData,
  };
};

export const purchaseBurgerFail=(error)=>{
  return {
    type:actionType.PURCHASE_ORDER_FAILED,
    error,
  };
};

export const purchaseBurgerStart=()=>{
  return {
    type:actionType.PURCHASE_BURGER_START,
  }
}

export const purchaseBurger= (orderData)=>{
  return dispatch=>{
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json',orderData)
    .then(response => {
      console.log(response.data);
      dispatch(purchaseBurgerSuccess(response.data,orderData));
    })
    .catch(error=> {
      dispatch(purchaseBurgerFail(error));
    })
    .finally(()=>{
     // this.setState({loading:false});
     // this.props.history.push('/');
    }); 
  }
};
