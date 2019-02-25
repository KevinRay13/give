import React, { Component } from "react";
import { login } from "../../ducks/reducer";
import { connect } from "react-redux";
import "./navbar.scss";

class LoginButton extends Component {
  render() {
    return (
      <div>
        {/* <Link to="/login" className="login"> */}
        <button className="logout">Login</button>
        {/* </Link> */}
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { login }
)(LoginButton);
