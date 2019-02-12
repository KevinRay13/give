import React, { Component } from "react";
import Products from "./products/Products";
import "./Shop.module.scss";

class Shop extends Component {
  render() {
    return (
      <div className="App">
        <div className="products">
          <Products />
        </div>
        {/* TODO add more to the shop page */}
      </div>
    );
  }
}

export default Shop;
