import React from "react";
import Slider from "react-slick";
import "./carousel.css";

import axios from "axios";

const api = "http://localhost:5050";

export default class SimpleSlider extends React.Component {
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
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
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
    let hatlist = this.state.hats ? (
      this.state.hats.map((element, index) => {
        return (
          <div key={index} className="centerme">
            <img className="caps" src={element.img_url} alt="img here" />
            <h3> {element.product_name}</h3>
            <h3>description: {element.description}</h3>
            <h3>price: {element.price}</h3>
          </div>
        );
      })
    ) : (
      <div>Loading...</div>
    );
    return <Slider {...settings}>{hatlist}</Slider>;
  }
}
