import React from "react";
import { Switch, Route } from "react-router-dom";
//import Contact from "./components/Contact";
import Shop from "./components/shop/Shop";
import Home from "./components/home/Home";
import Cart from "./components/shoppingcart/ShoppingCart";
import LogReg from "./components/login/LogReg";

export default (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={Cart} exact path="/shoppingcart" />
    <Route component={LogReg} exact path="/login" />
    <Route component={Shop} path="/shop" />
  </Switch>
);
