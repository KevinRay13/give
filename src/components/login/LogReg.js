import React, { Component } from "react";
import Auth from "./Auth";

class LogReg extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(user) {
    this.setState({
      user
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <div className="LogReg">
          <Auth user={user} updateUser={this.updateUser} />
        </div>
      </div>
    );
  }
}

export default LogReg;
