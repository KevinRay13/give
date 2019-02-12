import React, { Component } from "react";
import "./Home.module.css";
import Carousel from "./Carousel";

class Home extends Component {
  render() {
    return (
      <div className="home-landing">
        <Carousel />
      </div>
    );
  }
}

export default Home;
