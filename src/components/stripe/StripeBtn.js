import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

class StripeBtn extends Component {
  onToken = token => {
    const body = {
      amount: 999,
      token: token
    };
    console.log("this is the token", body);
    axios
      .post("/payment", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };
  render() {
    return (
      <div className="checkoutCont">
        <StripeCheckout
          className="stripe-button-el"
          label="Checkout" //Component button text
          name="(give)" //Modal Header
          description="Thanks for giving back!"
          panelLabel="Complete Purchase" //Submit button in modal
          amount={999} //Amount in cents $9.99
          token={this.onToken}
          stripeKey="pk_test_N7WAnnmGoPE9GJmC8XJDuSDN"
          image="" //Pop-in header image
          billingAddress={false}
        />
      </div>
    );
  }
}
export default StripeBtn;
