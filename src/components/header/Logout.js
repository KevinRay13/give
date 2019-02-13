import React, { Component } from "react";
import { logout } from "../../ducks/reducer";
import { connect } from "react-redux";
import "./navbar.css";

class Logout extends Component {
  render() {
    return (
      <button className="logout" onClick={() => this.props.logout()}>
        Logout
      </button>
    );
  }
}
const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { logout }
)(Logout);
