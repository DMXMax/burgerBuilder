import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button.js';
import classes from  './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address',
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value: 'fastest', displayValue: 'Fast'},
            {value: 'cheapest', displayValue: 'Cheap'}
          ]
        },
        value: '',
      },
    },
    loading:false,
  }

  orderHandler = (event) =>{
    event.preventDefault();
    this.setState({loading:true});
      const data = {
        ingredients: this.props.ingredients,
        price: this.props.price,
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
        .finally(()=>{
          this.setState({loading:false});
          this.props.history.push('/');
        }); 
        
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
    if(this.state.loading === true)
      form = <Spinner/>
    else
      form = (
        <form>
        {formElementsArray.map(formElement=>(
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />
        ))}
        {/*<Input elementType="..." elementConfig ="..." value="...">
        <Input inputtype="input" type='email' name='email' placeholder='Your E-mail' />
        <Input inputtype="input" type='text' name='street' placeholder='Street' />
        <Input inputtype="input" type='text' name='postalCode' placeholder='Zip Code' />*/}
        <Button clicked={this.orderHandler} btnType="Success">MAKE IT SO</Button>
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

export default ContactData;
