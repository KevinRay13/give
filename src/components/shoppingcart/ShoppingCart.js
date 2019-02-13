import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromCart, getCart } from "../../ducks/reducer";

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
        console.log("index", index);
        console.log("props", this.props);
        return (
          <div className="shopping-cart-container" key={index}>
            <img src={element[0].img_url} alt="" />
            <div className="shopping-cart-info">
              <h2>{element[0].product_name}</h2>
              <h2>{element[0].description}</h2>
              <h2>{element[0].price}</h2>
              <div className="shopping-cart-button-container">
                <button
                  className="shopping-cart-button"
                  onClick={() => this.props.removeFromCart(element)}
                >
                  Remove From Shopping Cart
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
          shoppingCartDisplay
        ) : (
          <div className="go-buy-something">
            <h1>Your shopping cart is empty! Go buy something!</h1>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("kevin", state);
  return {
    cart: state.cart
  };
}

export default connect(
  mapStateToProps,
  { removeFromCart, getCart }
)(Cart);