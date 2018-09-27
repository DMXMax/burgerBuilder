import * as actionType from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
};

const reducer =(state=initialState,action)=>{
  switch(action.type){
    case actionType.PURCHASE_BURGER.START:
      state = {
        ...state,
        loading:true,
      }
    break;
    case actionType.PURCHASE_BURGER.SUCCESS:
      const newOrder = {
        ...action.orderData, 
        id: action.orderId
      }
      state = {...state,
      loading:false,
      orders: orders.concat(newOrder),
      };
      break;
    case actionType.PURCHASE_BURGER_FAIL:
      state = {
        ...state,
      loading:false,
      };
      break;
    default:
  };
  return state;
};

export default reducer;
