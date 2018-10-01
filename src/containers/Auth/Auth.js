import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';


class Auth extends Component{

        state = {
            controls:{
                email:{
                    elementType: 'input',
                    elementConfig: {
                      type: 'email',
                      placeholder: 'Your Email',
                    },
                    value: '',
                    validation: { 
                      required:true,
                      isemail:true,
                      minLength: 5,
                      maxLength: 40,

                    },
                    valid:false,
                    touched: false,
                  },
                  password:{
                    elementType: 'input',
                    elementConfig: {
                      type: 'password',
                      placeholder: 'Password',
                    },
                    value: '',
                    validation: { 
                      required:true,
                      minLength: 6,
                      maxLength: 40,

                    },
                    valid:false,
                    touched: false,
                  },
            },
            isSignup: true,
        };

        componentDidMount(){
            if(!this.props.burgerInProgress && this.props.authRedirectPath !== '/'){
                this.props.onSetAuthRedirectPath();
            }
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
        inputChangedHandler(event, controlName){
          const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,
                    this.state.controls[controlName].validation),
                touched: true,
                
                }
            }
            this.setState({controls:updatedControls})
        };
      
        submitHandler=(event)=>{
            event.preventDefault();
            this.props.onAuth(this.state.controls.email.value, 
                this.state.controls.password.value,
                this.state.isSignup);
        }
        switchAuthModeHandler=(event)=>{
            this.setState(prevState=>{
                return {isSignup: !prevState.isSignup};
            });
        }

        render(){
            if(this.props.isAuthenticated)
                return <Redirect to={this.props.authRedirectPath}/>
            const formElementsArray = [];
            for( let key in this.state.controls){
              formElementsArray.push({
                id: key,
                config: this.state.controls[key],
              })
            };
            let form = formElementsArray.map(formElement=>(
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
            )
            
            );
            form = this.props.loading ? <Spinner/>: form;

            const errorMessage = this.props.error ? (<p><strong>{this.props.error.message}</strong></p>) : null;
            return (
                <div className={classes.Auth}>
                    <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignup ? 'SIGN-UP': 'SIGN-IN'}</Button>
                    </form>
                    <Button clicked={this.switchAuthModeHandler} 
                        btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN-IN': 'SIGN-UP'}</Button>
                        {errorMessage}
                </div>
            );

        };

};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error : state.auth.error,
        isAuthenticated: state.auth.token !== null,
        burgerInProgress: state.burgerbuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps =dispatch => {
    return {
        onAuth: (email, password, isSignup)=>dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: ()=>dispatch(actions.setAuthRedirectPath('/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)( Auth);