import React, { Component } from "react";
import "./Home.module.css";
import Carousel from "./Carousel";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
    if (!this.props.user.username) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.username !== this.props.user.username) {
      this.props.getUser();
      console.log("test");
    }
  }
  render() {
    return (
      <div className="home-landing">
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
