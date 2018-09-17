import React, { Component } from "react";
import Aux from "../../hoc/AuxFile";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.0,
  cheese: 0.75,
  meat: 2,
  bacon: 1.25,
  sauce: 0.25
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null /*{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0, 
            sauce: 0
        }*/,
    totalPrice: 4.0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount = () => {
    axios
      .get("/ingredients.json")
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
      });
  };

  updatePurchaseState = ingredients => {
    console.log(ingredients);
    /*const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);*/
      
    let result = {count:0, price:4};

    const summary = Object.keys(ingredients)
      .map(key => {
        return [key,ingredients[key]];
      })
      .reduce((summary,it)=>{ return {
        count: summary["count"]+it[1], 
        price: summary["price"]+(INGREDIENT_PRICES[it[0]]*it[1])}
      }, result);

    console.log("MAP ", summary);
    this.setState({ purchasable: summary["count"] > 0, totalPrice:summary["price"] });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    //const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ /*totalPrice: newPrice,*/ ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = updatedCount;
      const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
    }
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //alert("Burger for You!");
    /*this.setState({loading:true});
      const data = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
          name: 'Mr. G',
          address: {
            street: 'Quaint For Mobile App',
            city: 'Whocares',
            zip: '92122'
          },
          email: 'Test@whodunit.com',
        },
        storeid: 87121,
      }
       axios.post('/orders.json',data)
        .then(response => console.log(response))
        .catch(error=> console.log("Error: ", error))
        .finally(()=>this.setState({loading:false,purchasing:false})); 
        */
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    this.props.history.push({
      pathname: "/checkout",
      search: '?'+queryParams.join('&'),
    });
  };

  render() {
    const disableInfo = { ...this.state.ingredients };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = null;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
        />
      );
    } else {
      burger = this.state.error ? <p>Death, be not proud.</p> : <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);
