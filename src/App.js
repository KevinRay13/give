import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/header/NavBar";
//import routes from "./routes";
import Products from "./components/shop/products/Products";
import ShoppingCart from "./components/shoppingcart/ShoppingCart";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import LogReg from "./components/login/LogReg";
import AdminDashboard from "./components/login/AdminDashboard";
import Give from "./components/give/Give";

class App extends Component {
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
              return <Products />;
            }}
          />
          <Route
            path="/shoppingcart"
            render={() => {
              return <ShoppingCart />;
            }}
          />
          <Route
            path="/adminDash"
            render={() => {
              return <AdminDashboard />;
            }}
          />
          <Route
            path="/give"
            render={() => {
              return <Give />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
