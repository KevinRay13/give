import React, { Component } from "react";
import axios from "axios";
import "./AdminDashboard.scss";

// const api = "http://localhost:5050";

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
  }
  componentDidMount() {
    axios
      .get("/admin/orders")
      .then(response => {
        //console.log(response.data);
        this.setState({
          orders: response.data
        });
      })
      .catch(error => alert(error));
  }

  render() {
    console.log("something", this.state.orders);
    let orders = this.state.orders ? (
      this.state.orders.map((element, index) => {
        //console.log(element.id);
        return (
          <div key={index} className="gradient-border">
            <p className="info">{element.username}</p>
            <br />
            <p className="info"> Date Ordered: {element.date}</p>
            <br />
            <p className="info"> Product ID:{element.products_ordered}</p>
            <br />
            <p className="info"> Total:{element.total}</p>
          </div>
        );
      })
    ) : (
      <p />
    );
    return (
      <div>
        <div className="adminTitle">Admin Dashboard</div>
        <div className="AdminCont">{orders}</div>
      </div>
    );
  }
}
export default AdminDashboard;
