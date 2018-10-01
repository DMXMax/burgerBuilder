import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from  '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/'; //index.js is implied

class Orders extends Component{
  state = {
    orders :[],
    loading: true,
  }

  componentDidMount(){
    this.props.onFetchOrders(this.props.authToken, this.props.userId);
  }
  render(){
    return this.props.loading === true ? (<Spinner/>) :
      (
        <div>
        {this.props.orders.map(order=>(<Order key={order.id} 
          price={parseFloat(order.price)} ingredients={order.ingredients}/>))}
        </div>
      );
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      onFetchOrders : (authToken, userId)=> dispatch(actions.fetchOrders(authToken,userId))
  };
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    authToken : state.auth.token,
    userId : state.auth.userId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
