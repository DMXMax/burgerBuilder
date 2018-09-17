import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Your made-to-order Burger!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        No! I refuse!
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        I am worthy!
      </Button>
    </div>
  );
};

export default checkoutSummary;
