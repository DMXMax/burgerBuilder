import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button.js';
import classes from  './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
  state={
    orderForm:{
      name:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: { 
          required:true,
          minLength: 3,
          maxLength: 30,
        },
        valid:false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: { 
          required:true,
        },
        valid:false,
        touched: false,
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        validation: { 
          required:true,
          minLength:5,
          maxLength:5,
        },
        valid:false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: { 
          required:true,
        },
        valid:false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address',
        },
        value: '',
        validation: { 
          required:true,
        },
        valid:false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value: 'fast', displayValue: 'Fast'},
            {value: 'cheap', displayValue: 'Cheap'}
          ],
          placeholder:'Pick your Delivery Method',
        },
        value: 'fast',
        valid: true,
      },
    },
    formIsValid: false,
  }

  orderHandler = (event) =>{
    event.preventDefault();
    this.setState({loading:true});
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
    }

      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData,
        userId: this.props.userId,
      }

    this.props.orderBurger(order,this.props.token, this.props.userId);
/*       axios.post('/orders.json',data)
        .then(response => console.log(response))
        .catch(error=> console.log("Error: ", error))
        .finally(()=>{
          this.setState({loading:false});
          this.props.history.push('/');
        });
*/
        
  }
  checkValidity(value, rules)
  {
    let isValid = true;
    if(rules)
    {
      if(rules.required){
        isValid = isValid && (value.trim() !== '');
      }
      if( rules.minLength){
        isValid = isValid && (value.trim().length >= rules.minLength);
      }
      if( rules.maxLength){
        isValid = isValid && (value.trim().length <= rules.maxLength);
      }
    }
    return isValid;

  }
  inputChangedHandler(event, id){
    const updateFormData = {
      ...this.state.orderForm
    };

    const updatedItemData = {
      ...updateFormData[id]
    };
  
    updatedItemData.value = event.target.value;
    updatedItemData.valid = this.checkValidity(updatedItemData.value, 
      updatedItemData.validation);
    updatedItemData.touched = true;
    updateFormData[id] = updatedItemData;
    
    let formIsValid = true;
    for(let item in updateFormData){
      formIsValid = updateFormData[item].valid && formIsValid;
    }
    this.setState({orderForm:updateFormData, formIsValid});
  }

  render(){
    let form  = (null);
    const formElementsArray = [];
    for( let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      })
    };
    if(this.props.loading === true)
      form = <Spinner/>
    else
      form = (
        <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement=>(
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event)=>this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        {/*<Input elementType="..." elementConfig ="..." value="...">
        <Input inputtype="input" type='email' name='email' placeholder='Your E-mail' />
        <Input inputtype="input" type='text' name='street' placeholder='Street' />
        <Input inputtype="input" type='text' name='postalCode' placeholder='Zip Code' />*/}
        <Button disabled={!this.state.formIsValid} btnType="Success">MAKE IT SO</Button>
        {/*<Button btnType="Danger">NO, I REFUSE</Button>*/}
      </form>
      );
    return (
      <div className={classes.ContactData}>
        <h4>Tell Us About Yourself </h4>
      {form}
      </div>
    );
  }

}

const mapStateToProps=state =>{
  return {
    ingredients: state.burgerbuilder.ingredients,
    price: state.burgerbuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
};

const mapDispatchToProps= dispatch =>{
  return {
    orderBurger:(orderData,token, userId)=>dispatch(actions.purchaseBurger(orderData,token,userId)) 
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
