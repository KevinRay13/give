import React, { Component } from "react";
import axios from "axios";

const api = "http://localhost:5050";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      hats: []
    };
  }
  componentWillMount() {
    axios
      .get(api + "/inventory/products")
      .then(response => {
        this.setState({
          hats: response.data
        });
      })
      .catch(error => alert(error));
  }

  render() {
    let invlist = this.state.hats ? (
      this.state.hats.map((element, index) => {
        return (
          <div key={index}>
            <img className="caps" src={element.img_url} alt="img here" />
            <br />
            <p> {element.product_name}</p>
            <br />

            <p>
              {" "}
              description: <br />
              {element.description}
            </p>
            <p>
              {" "}
              <b>price: {element.price}</b>
            </p>
          </div>
        );
      })
    ) : (
      <div>Loading...</div>
    );
    return (
      <div>
        <div>Popular Items</div>
        <div className="popitems">{invlist}</div>
      </div>
    );
  }
}
