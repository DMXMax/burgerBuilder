import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>(
  <ul className={classes.NavigationItems}>
  {props.isAuthenticated ? <NavigationItem link="/logout" >Logout</NavigationItem> : <NavigationItem link="/auth" >Login</NavigationItem>}
    <NavigationItem link="/" >Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders" >Orders</NavigationItem> : null }
  </ul>
);


export default navigationItems;
