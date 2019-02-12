import React, { Component } from "react";
import "./Home.module.css";
import Carousel from "./Carousel";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";

class Home extends Component {
  componentDidMount() {
    //this.props.getUser();
    if (!this.props.user.isUser) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.isUser !== this.props.user.isUser) {
      this.props.getUser();
      console.log("test");
    }
  }
  render() {
    return (
      <div className="home-landing">
        <div>Welcome, {this.props.user.username}</div>
        <Carousel />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { getUser }
)(Home);
