import React from "react";
import "./Offers.css";
import offer_image from "../Assets/banners/People-packing.jpg";
import FadeIn from "../FadeIn/FadeIn";

const Offers = () => {
  return (
    <FadeIn className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for You</h1>

        <button>Check now</button>
      </div>
      <div className="offers-right">
        <img src={offer_image} alt="" />
      </div>
    </FadeIn>
  );
};

export default Offers;
