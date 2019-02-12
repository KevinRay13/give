import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, addToCart } from "../../ducks/reducer";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoppingCart: this.props.shoppingCart
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shoppingCart: nextProps.shoppingCart
    });
  }
  render() {
    let shoppingCartDisplay = this.state.shoppingCart.map((element, index) => {
      return (
        <div className="shopping-cart-container" key={index}>
          <img src={element.img_url} alt="" />
          <div className="shopping-cart-info">
            <h2>{element.product_name}</h2>
            <h2>{element.description}</h2>
            <h2>{element.price}</h2>
            <div className="shopping-cart-button-container">
              <button
                className="shopping-cart-button"
                onClick={() => this.props.removeFromShoppingCart(element)}
              >
                Remove From Shopping Cart
              </button>
            </div>
          </div>
        </div>
      );
    });
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

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { getCart, addToCart }
)(Cart);
