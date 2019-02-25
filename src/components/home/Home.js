import React, { Component } from "react";
import "./Home.scss";
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
        <div className="banner">
          <img
            src="https://cdn.shopify.com/s/files/1/1863/0841/files/rsz__mg_1198-compressor_1024x1024.jpg?v=1501186091"
            alt=""
            className="banner"
          />
        </div>
        <Carousel />
        <div className="aboutcont">
          <div className="chickContainer">
            <img
              src="https://missmuslim.nyc/store/wp-content/uploads/2018/12/hat-2.jpg"
              alt="hats"
              className="chick"
            />
          </div>
          <div className="givemessage">
            <div className="message">
              <img
                src="https://cdn.shopify.com/s/files/1/0445/0437/t/195/assets/50icon.png?9019808226547638753"
                alt=""
                className="messageimg"
              />
              <h2>50% of Profit Given</h2>
              <h5>
                Fifty percent (50%) of net profit from the sale of all (give)
                products is given to the (give) Fund to support our nonprofit
                partners in the fight against pediatric cancer, create
                therapeutic experiences and fund charitable programming
                initiatives for children and families battling cancer.
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { getUser }
)(Home);
