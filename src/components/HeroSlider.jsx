import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "../styles/hero-slider.css";

const settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,


};

const HeroSlider = ({ cars }) => {
  



  console.log("carssss",cars);
  return (
    <div>
      <div className="shade"/>

      <Slider {...settings} className="hero__slider">
        {cars?.map((car) => (
          <div className="slider__item slider__item-01 mt0 relative "
            key={car.id}
          >

            <div className="slider__content  ">
              <h4 className="text-light mb-3">Get Promo Right Now {car.car_name}</h4>
              <h1 className="text-light mb-4">Buy Now and Get 50% Off</h1>

              <button className="p-4 bg-blue-950 hover:bg-blue-600">
                <Link to={`/car/${car.id}`} >Buy Now</Link>
              </button>
            </div>
            <div
              className="relative  w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${car?.car_picture})` }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
