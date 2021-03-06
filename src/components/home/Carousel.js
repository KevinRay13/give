import React from "react";
import Slider from "react-slick";
import "./carousel.scss";
import { Link } from "react-router-dom";
import axios from "axios";

//const api = "http://localhost:5050";

export default class SimpleSlider extends React.Component {
  constructor() {
    super();
    this.state = {
      hats: []
    };
  }
  componentWillMount() {
    axios
      .get("/inventory/products")
      .then(response => {
        this.setState({
          hats: response.data
        });
      })
      .catch(error => alert(error));
  }
  render() {
    var settings = {
      arrows: true,
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 9000,
      speed: 900,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    };
    // console.log(this.state.hats)
    let hatlist = this.state.hats ? (
      this.state.hats.map((element, index) => {
        return (
          <div key={index} className="centerme">
            <Link to="/shop" className="">
              <img className="caps" src={element.img_url} alt="img here" />
            </Link>
            <h2> {element.product_name}</h2>
            {/* <h3>description: {element.description}</h3> */}
            <h3 className="carPrice">${element.price}</h3>
          </div>
        );
      })
    ) : (
      <div>Loading...</div>
    );
    return <Slider {...settings}>{hatlist}</Slider>;
  }
}
