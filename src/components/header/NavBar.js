import React, { Component } from "react";
import "./navbar.scss";
import { connect } from "react-redux";
import { logout } from "../../ducks/reducer";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import LoginButton from "./LoginButton";

class NavBar extends Component {
  render() {
    let loggedIn = this.props.loggedIn;
    let isAdmin = this.props.user.isAdmin;
    //console.log(this.props.user);
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
              <li className="">
                <Link to="/" className="link">
                  Home
                </Link>
              </li>
              <li className="">
                <Link to="/shop" className="link">
                  Shop
                </Link>
              </li>
              <li className="">
                <Link to="/give" className="link">
                  Give
                </Link>
              </li>
              {isAdmin ? (
                <li className="link">
                  <Link to="/adminDash" className="link">
                    Admin Dashboard
                  </Link>
                </li>
              ) : (
                <p />
              )}

              {/* <li className="link">
                <Link to="/login" className="link">
                  Login
                </Link>
              </li> */}
            </ul>
          </div>
          <p className="par">(</p>
          <div className="heart">
            <img
              src="http://logok.org/wp-content/uploads/2015/08/CVS-Health-logo.png"
              alt=""
              className="heartImg"
            />
          </div>

          <p className="par">)</p>
          <div className="logo-container">
            <Link to="/" className="linkmain">
              <h2 className="linkmain">(give)</h2>
            </Link>
          </div>
          <div className="cart-container">
            <div className="loggedCont">
              <div to="/login" className="login" id="log">
                <div>
                  {loggedIn ? (
                    <Logout />
                  ) : (
                    <Link to="/login" className="login">
                      <LoginButton />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="loggedCont">
              <Link to="/shoppingcart" className="">
                <img
                  className="cart"
                  src="https://www.freeiconspng.com/uploads/red-simple-shopping-cart-icon-12.png"
                  alt="shopping cart"
                />
              </Link>
            </div>
          </div>
          <div className="welcome">
            {loggedIn ? (
              <div className="linear-wipe">
                <p className="bak">Welcome {this.props.user.username}</p>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
        {/* <hr /> */}
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
