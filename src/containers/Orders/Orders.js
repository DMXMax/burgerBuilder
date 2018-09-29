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
    this.props.onFetchOrders();
   /* axios.get('/orders.json')
      .then(res => {
        console.log("Orders", res.data);
        let fetchOrders = [];
        for(let key in res.data)
        {
          fetchOrders.push({...res.data[key], id:key});
        }

        this.setState({orders: fetchOrders});
      })
      .catch(err => {
        console.log(err);
      })
      .finally(()=>this.setState({loading:false}));*/
  }
  render(){
    if( this.props.loading === true )
      return (<Spinner/>)
    else
      return (
        <div>
        {this.props.orders.map(order=>(<Order key={order.id} 
          price={parseFloat(order.price)} ingredients={order.ingredients}/>))}
        </div>
      );
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      onFetchOrders : ()=> dispatch(actions.fetchOrders())
  };
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
