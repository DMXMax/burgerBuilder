import * as actionType from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer =(state=initialState,action)=>{
  switch(action.type){
    case actionType.PURCHASE_INIT:
      console.log("INIT!");
      state={
        ...state,
        purchased:false,
      };
      break;
    case actionType.PURCHASE_BURGER_START:
      state = {
        ...state,
        loading:true,
      }
    break;
    case actionType.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData, 
        id: action.orderId,
      }
      state = {...state,
      loading:false,
      orders: state.orders.concat(newOrder),
      purchased : true,
      };
      break;
    case actionType.PURCHASE_BURGER_FAIL:
      state = {
        ...state,
      loading:false,
      };
      break;
      case actionType.FETCH_ORDER_START:
      state = {
        ...state,
        loading:true,
      }
    break;
    case actionType.FETCH_ORDER_SUCCESS:
      state = {...state,
        orders: action.orders,
        loading:false,
      };
      break;
    case actionType.FETCH_ORDER_FAIL:
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
