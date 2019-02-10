import React, { Component } from "react";

import "./App.css";

import SimpleSlider from "./components/home/Carousel";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Popular Items</h2>
        <SimpleSlider />
      </div>
    );
  }
}

export default App;
