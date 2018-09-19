import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from  '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
  state = {
    orders :[],
    loading: true,
  }

  componentDidMount(){
    axios.get('/orders.json')
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
      .finally(()=>this.setState({loading:false}));
  }
  render(){
    if( this.state.loading === true )
      return (<Spinner/>)
    else
      return (
        <div>
        {this.state.orders.map(order=>(<Order key={order.id} 
          price={parseFloat(order.price)} ingredients={order.ingredients}/>))}
        </div>
      );
  }
}

export default withErrorHandler(Orders, axios);
