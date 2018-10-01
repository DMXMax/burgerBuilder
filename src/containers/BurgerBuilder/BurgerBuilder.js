import React, { Component } from "react";
import Aux from "../../hoc/AuxFile";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from "../../axios-orders";


class BurgerBuilder extends Component {
  state = {
   // totalPrice: 4.0,
    purchasing: false,
    loading: false,
    error: false
  };

  componentWillMount= ()=>{
    this.updatePurchaseState(this.props.ings);
  }
  componentDidMount = () => {
    //axios
      /*.get("/ingredients.json")
      .then(res => {
        let ni = [];
        let resData = {};
        for (let x in res.data) {
          let di = {};
          di["name"] = x;
          di["start"] = res.data[x].start;
          di["index"] = res.data[x].index;
          ni.push(di);
        }
        ni.sort((a, b) => a.index > b.index);

        for (let x in ni) resData[ni[x].name] = ni[x].start;

        this.setState({ ingredients: resData });
        this.updatePurchaseState(resData);
      })
      .catch(err => {
        this.setState({ error: true });
      });*/
      //this.updatePurchaseState(this.props.ings);
    this.props.onInitIngredients();
  };

  updatePurchaseState = ingredients => {
    /*console.log(ingredients);
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);
      
    let result = {count:0, price:4};

    const summary = Object.keys(ingredients)
      .map(key => {
        return [key,ingredients[key]];
      })
      .reduce((summary,it)=>{ return {
        count: summary["count"]+it[1], 
        price: summary["price"]+(INGREDIENT_PRICES[it[0]]*it[1])}
      }, result);

//    console.log("MAP ", summary);
    this.setState({ purchasable: summary["count"] > 0, totalPrice:summary["price"] });*/
  };

  addIngredientHandler = type => {
    /*const oldCount = this.props.ings[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.props.ings };
    updatedIngredients[type] = updatedCount;
    //const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients });*/
    //    this.updatePurchaseState(updatedIngredients);
    this.props.onIngredientAdded(type);
    this.updatePurchaseState(this.props.ings);
  };

  removeIngredientHandler = type => {
    /*const oldCount = this.props.ings[type];
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = { ...this.props.ings };
      updatedIngredients[type] = updatedCount;
      const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
    }*/
  };
  purchaseHandler = () => {
    if( this.props.isAuthenticated )
      this.setState({ purchasing: true })
    else
    {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disableInfo = { ...this.props.ings };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = null;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            isAuthenticated = {this.props.isAuthenticated}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            purchasable={this.props.count >0}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
        />
      );
    } else {
      burger = this.props.error ? <p>Death, be not proud.</p> : <Spinner />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapDispatchToProps=dispatch=>{

  return {

    onIngredientAdded: ingredient=>dispatch(actions.addIngredient(ingredient)),   
    onIngredientRemoved: ingredient=>dispatch(actions.removeIngredient(ingredient)),
    onInitIngredients: ()=>dispatch(actions.initIngredients()),
    onInitPurchase: ()=>dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path)),

  };

};

const mapStateToProps = state=>{

  return {
    ings: state.burgerbuilder.ingredients,
    totalPrice: state.burgerbuilder.totalPrice,
    count: state.burgerbuilder.count,
    error: state.burgerbuilder.error,
    isAuthenticated: state.auth.token !== null,
  };

};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
