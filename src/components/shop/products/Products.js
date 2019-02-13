import React, { Component } from "react";
//import axios from "axios";
import "./Products.css";
//import Auth from "../../login/Auth";
import { addToCart, getAllProducts } from "../../../ducks/reducer";
import { connect } from "react-redux";
//const api = "http://localhost:5050";

class Products extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     hats: [],
  //     isAdmin: false,
  //     user: {},
  //     shoppingCart: []
  //   };
  //this.updateUser = this.updateUser.bind(this);
  // this.addToShoppingCart = this.addToShoppingCart.bind(this);
  // this.removeFromShoppingCart = this.removeFromShoppingCart.bind(this);
  //}
  componentDidMount() {
    this.props.getAllProducts();
  }
  // componentWillMount() {
  //   axios
  //     .get(api + "/inventory/products")
  //     .then(response => {
  //       this.setState({
  //         hats: response.data
  //       });
  //     })
  //     .catch(error => alert(error));
  //   console.log(this.state.user);
  // }
  // updateUser(user) {
  //   this.setState({
  //     user
  //   });
  // }

  // getUser() {
  //   axios
  //     .get("/auth/user")
  //     .then(giver => {
  //       this.setState({
  //         isAdmin: {
  //           isAdmin: giver.is_admin.data
  //         }
  //       });
  //     })
  //     .catch(error => alert(error.response.request.response));
  // }
  // handleDelete = id => {
  //   axios.delete(`http://localhost:5050/admin/inventory/${id}`).then(res => {
  //     this.setState({ hats: res.data });
  //     console.log(res.data);
  //   });
  // };

  // authorization(element) {
  //   if (this.state.isAdmin === true) {
  //     return (
  //       <button onClick={() => this.handleDelete(element.id)}>Delete</button>
  //     );
  //   }
  //   console.log(this.state.isAdmin);
  // }
  // addToShoppingCart(product) {
  //   this.setState({
  //     shoppingCart: [...this.state.shoppingCart, product]
  //   });
  //   console.log(this.state.shoppingCart);
  // }

  // removeFromShoppingCart(product) {
  //   let newShoppingCart = this.state.shoppingCart;
  //   newShoppingCart.splice(newShoppingCart.indexOf(product), 1);
  //   this.setState({
  //     shoppingCart: newShoppingCart
  //   });
  //   console.log(this.state.shoppingCart);
  // }

  render() {
    //const { user } = this.state;
    console.log(this.props);
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
            </p>
            <button onClick={id => this.props.addToCart(element.id)}>
              Purchase!
            </button>
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

function mapStateToProps(state) {
  return {
    products: state.products,
    loading: state.loading
  };
}

export default connect(
  mapStateToProps,
  { addToCart, getAllProducts }
)(Products);
