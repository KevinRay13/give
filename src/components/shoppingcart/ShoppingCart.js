import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromCart, getCart } from "../../ducks/reducer";
import StripeBtn from "../stripe/StripeBtn";
import "./shoppingCart.css";

class Cart extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     shoppingCart: this.props.shoppingCart
  //   };
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     shoppingCart: nextProps.shoppingCart
  //   });
  // }

  componentDidMount() {
    this.props.getCart();
  }
  render() {
    //console.log(this.props.cart[0].img_url);
    let shoppingCartDisplay = this.props.cart ? (
      this.props.cart.map((element, index) => {
        return (
          <div className="productsCart" key={index}>
            <img className="caps" src={element[0].img_url} alt="" />
            <div className="shopping-cart-info">
              <h1>{element[0].product_name}</h1>
              {/* <h2>{element[0].description}</h2> */}
              <h2>${element[0].price}</h2>
              <div className="shopping-cart-button-container">
                <button
                  className="purchaseBtn"
                  onClick={() => this.props.removeFromCart(element)}
                >
                  Remove From Cart
                </button>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div>loading...</div>
    );
    return (
      <div className="shopping-cart-container">
        {shoppingCartDisplay[0] ? (
          <div>
            <div className="cartHeadCont">
              <h3 className="cartHead">Your Cart</h3>
            </div>
            <div className="productsCont">{shoppingCartDisplay}</div>
            <div className="orderSummary">
              <p className="summaryTitle">Order Summary</p>
              <p className="subtotal"> Subtotal: ${this.props.total} </p>
              <StripeBtn />
            </div>
          </div>
        ) : (
          <div className="go-buy-something">
            <h1>Your shopping cart is empty</h1>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    total: state.total
  };
}

export default connect(
  mapStateToProps,
  { removeFromCart, getCart }
)(Cart);
