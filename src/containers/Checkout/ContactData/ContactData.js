import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button.js';
import classes from  './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
  state={
    name : '',
    email : '',
    address: {
      street: '',
      postalCode: ''
    },
    loading:false,
  };

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

    if(this.state.loading === true)
      form = <Spinner/>
    else
      form = (
        <form>
        <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
        <input className={classes.Input} type='text' name='email' placeholder='Your E-mail' />
        <input className={classes.Input} type='text' name='street' placeholder='Street' />
        <input className={classes.Input} type='text' name='postalCode' placeholder='Zip Code' />
        <Button clicked={this.orderHandler} btnType="Success">MAKE IT SO</Button>
        <Button btnType="Danger">NO, I REFUSE</Button>
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
