import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props)=>(
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt='No Logo for you!'/>
  </div>
);

export default logo;




