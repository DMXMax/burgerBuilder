import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess=(orderId,orderData)=>{
  return {
    type:actionType.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData,
  };
};

export const purchaseBurgerFail=(error)=>{
  return {
    type:actionType.PURCHASE_BURGER_FAIL,
    error,
  };
};

export const purchaseBurgerStart=()=>{
  return {
    type:actionType.PURCHASE_BURGER_START,
  }
}

export const purchaseBurger= (orderData, token)=>{
  return dispatch=>{
    const queryParams = '?auth='+token;
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json'+queryParams,orderData)
    .then(response => {
      dispatch(purchaseBurgerSuccess(response.data.name,orderData));
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

export const purchaseInit = ()=>
{
  return {
    type:actionType.PURCHASE_INIT,
  }
}

export const fetchOrderSuccess=(orders)=>{
  return {
    type:actionType.FETCH_ORDER_SUCCESS,
     orders,
  };
};

export const fetchOrderFail=(error)=>{
  return {
    type:actionType.FETCH_ORDER_FAIL,
    error,
  };
};

export const fetchOrderStart=()=>{
  return {
    type:actionType.FETCH_ORDER_START,
  }
}

export const fetchOrders= (token, userId)=>{

  return dispatch=>{
    const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
    dispatch(fetchOrderStart());
    axios.get('/orders.json'+queryParams)
    .then(res => {
      let orders = [];
      for(let key in res.data)
      {
        orders.push({...res.data[key], id:key});
      }
      dispatch(fetchOrderSuccess(orders));
    })
    .catch(err => {
      dispatch(fetchOrderFail(err));
    }); 
  };
};
