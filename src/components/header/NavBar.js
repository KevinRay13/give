import React, { Component } from "react";
import "./navbar.css";

import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="navbar-container">
          <div className="navbar-links-container">
            <img
              src="http://cdn.onlinewebfonts.com/svg/img_523163.png"
              alt=""
              className="burger"
            />
            <ul className="navbar-links">
              <li className="link">
                <Link to="/" className="link">
                  Home
                </Link>
              </li>
              <li className="link">
                <Link to="/shop" className="link">
                  Shop
                </Link>
              </li>
              <li className="link">
                <Link to="/shoppingcart" className="link">
                  Shopping Cart
                </Link>
              </li>
              <li className="link">
                <Link to="/login" className="link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div className="logo-container">
            <Link to="/" className="linkmain">
              <h2 className="linkmain">(give)</h2>
            </Link>
          </div>
          <div className="cart-container">
            <Link to="/shoppingcart" className="linkmain">
              <img
                className="cart"
                src="https://www.freeiconspng.com/uploads/red-simple-shopping-cart-icon-12.png"
                alt="shopping cart"
              />
            </Link>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default NavBar;
