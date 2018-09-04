import React, {Component} from 'react';
import Aux from '../../hoc/AuxFile';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.00,
    cheese: .75,
    meat: 2,
    bacon: 1.25,
    sauce: .25
}

class BurgerBuilder extends Component{
    state={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0, 
            sauce: 0
        },
        totalPrice :4.00,
    }

    addIngredientHandler = (type)=>{

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
    }

    removeIngredientHandler = (type)=>{
        
        const oldCount = this.state.ingredients[type];
        if( oldCount >0)
        {
            const updatedCount = oldCount-1;
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type]=updatedCount;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        }
    }

    render(){
        const disableInfo = { ...this.state.ingredients };
        for( let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0;
        }
        return (<Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disableInfo}
                price = {this.state.totalPrice}/>
            
        </Aux>);
    }
}

export default BurgerBuilder;

