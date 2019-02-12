import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/header/NavBar";
//import routes from "./routes";
import Products from "./components/shop/products/Products";
import ShoppingCart from "./components/shoppingcart/ShoppingCart";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import LogReg from "./components/login/LogReg";

class App extends Component {
  constructor() {
    super();

    this.state = {
      shoppingCart: []
    };

    this.addToShoppingCart = this.addToShoppingCart.bind(this);
    this.removeFromShoppingCart = this.removeFromShoppingCart.bind(this);
  }

  addToShoppingCart(product) {
    this.setState({
      shoppingCart: [...this.state.shoppingCart, product]
    });
    console.log(this.state.shoppingCart);
  }

  removeFromShoppingCart(product) {
    let newShoppingCart = this.state.shoppingCart;
    newShoppingCart.splice(newShoppingCart.indexOf(product), 1);
    this.setState({
      shoppingCart: newShoppingCart
    });
    console.log(this.state.shoppingCart);
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={LogReg} exact path="/login" />
          <Route
            path="/shop"
            render={() => {
              return <Products addToShoppingCart={this.addToShoppingCart} />;
            }}
          />
          <Route
            path="/shoppingcart"
            render={() => {
              return (
                <ShoppingCart
                  shoppingCart={this.state.shoppingCart}
                  removeFromShoppingCart={this.removeFromShoppingCart}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
