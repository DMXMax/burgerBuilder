import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
//import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter } from "react-router-dom";
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import { connect } from 'react-redux';
import * as action from './store/actions/'; //index.js is implied
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth');
});
class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={asyncAuth}/>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" exact component={asyncOrders} /> 
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/logout" component={Logout}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    isAuthenticated : state.auth.token !== null,
  };
}

const mapDispatchToProps =dispatch =>{
  return {
    onTryAutoSignup: () => dispatch(action.authCheckState())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
