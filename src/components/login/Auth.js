import React, { Component } from "react";
import { connect } from "react-redux";
import { login, register, logout } from "../../ducks/reducer";
import { Redirect } from "react-router-dom";
import "./Auth.css";

//import axios from "axios";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isAdmin: false,
      newUser: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e, username, password) => {
    e.preventDefault();
    if (this.state.newUser) {
      //register method
      this.props.register(username, password);
    } else {
      //login method
      this.props.login(username, password);
    }
    this.setState({ username: "", password: "" });
  };
  render() {
    console.log(this.props.user.username);
    if (this.props.user.username) {
      return <Redirect push to="/" />;
    }
    const { username, password, newUser } = this.state;
    return (
      <div className="page">
        <div className="logTitle">{newUser ? "Become A Member" : "Login"}</div>
        <div className="logBox">
          <div className="centerMe">
            <form
              action=""
              onSubmit={e => this.handleSubmit(e, username, password)}
            >
              <div className="username">
                {/* <label htmlFor="">username:</label> */}

                <input
                  className="usernameInput"
                  type="text"
                  required
                  value={this.state.username}
                  placeholder="username"
                  name="username"
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="password">
                {/* <label htmlFor="">password:</label> */}
                <input
                  className="passwordInput"
                  type="password"
                  required
                  value={this.state.password}
                  placeholder="password"
                  name="password"
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="submitCont">
                <input type="submit" className="btn" />
              </div>
              <h4 onClick={() => this.setState({ newUser: !newUser })}>
                Click here to {newUser ? "Login" : "Become A Member"}
              </h4>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { login, register, logout }
)(Auth);
