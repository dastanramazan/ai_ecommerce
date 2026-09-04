import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="description_box">
      <div className="description_box_navigator">
        <div className="description_box_nav_box">Description</div>
        <div className="description_box_nav_box fade">Reviews (122)</div>
      </div>
      <div className="description_box_description">        <p>          Welcome to Alpha Wolf Parts, your trusted source for genuine brake, engine, and
          fluid components. We hunt down parts from reputable brands like Brembo, Duralast,
          and Mobil 1 so your vehicle keeps running safely and reliably.
        </p>
        <p>
          Every part in our catalog is checked for fitment and quality before it's listed, so
          you can order with confidence. Our team - and our AI Parts Helper - are on hand to
          help you find the right part for your make and model, whether it's a routine
          service item or a critical repair.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
