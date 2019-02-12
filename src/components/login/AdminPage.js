import React, { Component } from "react";
import axios from "axios";
import "../shop/products/Products.css";

const api = "http://localhost:5050";

export default class Products extends Component {
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
          <div key={index} className="products">
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
            <button>Add To Cart</button>
          </div>
        );
      })
    ) : (
      <div>Loading...</div>
    );
    return (
      <div>
        <div>Merch</div>
        <div className="popitems">{invlist}</div>
      </div>
    );
  }
}
