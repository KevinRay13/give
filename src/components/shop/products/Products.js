import React, { Component } from "react";
import axios from "axios";
import "./Products.css";
//import Auth from "../../login/Auth";
import {
  addToCart,
  getAllProducts,
  getUser,
  deleteProduct
} from "../../../ducks/reducer";
import { connect } from "react-redux";
//const api = "http://localhost:5050";

class Products extends Component {
  constructor() {
    super();

    this.state = {
      img_url: "",
      product_name: "",
      price: "",
      newPrice: "",

      description: "",
      products: []
    };
  }
  componentDidMount() {
    this.props.getAllProducts();
    this.props.getUser();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.products.length !== this.props.products.length) {
      this.props.getAllProducts();
      //console.log("fire");
    }
    //console.log("fire");
  }
  handleImgInputChange(value) {
    this.setState({ img_url: value });
  }
  handleProductInputChange(value) {
    this.setState({ product_name: value });
  }
  handlePriceInputChange(value) {
    this.setState({ price: value });
  }
  handleDescriptionInputChange(value) {
    this.setState({ description: value });
  }
  handleNewPriceChange(value) {
    this.setState({ newPrice: value });
  }
  createProduct() {
    axios
      .post("http://localhost:5050/admin/inventory", {
        img_url: this.state.img_url,
        product_name: this.state.product_name,
        price: this.state.price,

        description: this.state.description
      })

      .then(results => {
        //console.log(results.data);
        this.props.getAllProducts(); //HACK
        this.setState({
          img_url: "",
          product_name: "",
          price: "",
          description: ""
        });
      });
  }
  editPrice(id) {
    axios
      .put(`http://localhost:5050/admin/inventory/${id}`, {
        price: this.state.newPrice
      })

      .then(() => {
        //console.log(results.data);
        this.props.getAllProducts(); //HACK
        this.setState({
          newPrice: ""
        });
      });
  }

  render() {
    //const { user } = this.state;
    //console.log("this.props", this.props.products);
    let invlist = this.props.products ? (
      this.props.products.map((element, index) => {
        //console.log(element.id);
        return (
          <div key={index} className="products">
            <img className="caps" src={element.img_url} alt="img here" />
            <br />
            <p> {element.product_name}</p>
            <br />

            <p>
              description: <br />
              {element.description}
            </p>
            <p>
              <b>price: {element.price}</b>
              {this.props.user.isAdmin ? (
                <input
                  className="inputs"
                  type="text"
                  placeholder="New Price"
                  value={this.state.newPrice}
                  onChange={e => this.handleNewPriceChange(e.target.value)}
                />
              ) : (
                <p />
              )}
            </p>
            <button
              className="purchaseBtn"
              onClick={id => this.props.addToCart(element.id)}
            >
              Add To Cart
            </button>
            <div className="delete">
              {this.props.user.isAdmin ? (
                <div>
                  <div className="btnBox">
                    <button
                      className="deleteBtn"
                      onClick={id => this.props.deleteProduct(element.id)}
                    >
                      delete
                    </button>

                    <button
                      className="deleteBtn"
                      onClick={id => this.editPrice(element.id)}
                    >
                      edit
                    </button>
                  </div>
                </div>
              ) : (
                <p />
              )}
            </div>
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
        <div>
          {this.props.user.isAdmin ? (
            <div className="addProduct">
              <div className="addProductBox">
                <div className="addTitle">
                  <label className="addTitle" htmlFor="">
                    Add A Product
                  </label>
                </div>
                <input
                  className="inputs"
                  type="text"
                  placeholder="img url"
                  value={this.state.img_url}
                  onChange={e => this.handleImgInputChange(e.target.value)}
                />
                {/* <p>{this.state.img_url}</p> */}
                <input
                  className="inputs"
                  type="text"
                  placeholder="Product Name"
                  value={this.state.product_name}
                  onChange={e => this.handleProductInputChange(e.target.value)}
                />
                {/* <p>{this.state.product_name}</p> */}
                <input
                  className="inputs"
                  type="text"
                  placeholder="Price"
                  value={this.state.price}
                  onChange={e => this.handlePriceInputChange(e.target.value)}
                />
                {/* <p>{this.state.price}</p> */}
                <input
                  className="inputs"
                  type="text"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={e =>
                    this.handleDescriptionInputChange(e.target.value)
                  }
                />
                {/* <p>{this.state.description}</p> */}

                <button
                  className="addToInventory"
                  onClick={() => this.createProduct()}
                >
                  Add to Inventory
                </button>
              </div>
            </div>
          ) : (
            <p />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log("state.prods", state.products);
  return {
    products: state.products,
    loading: state.loading,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { addToCart, getAllProducts, getUser, deleteProduct }
)(Products);
