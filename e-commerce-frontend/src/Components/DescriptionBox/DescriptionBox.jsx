import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="description_box">
      <div className="description_box_navigator">
        <div className="description_box_nav_box">Description</div>
        <div className="description_box_nav_box fade">Reviews (122)</div>
      </div>
      <div className="description_box_description">        <p>          Welcome to as, and Sweet Delights, your premier destination for celebration essentials. 
          Our bakery specializes in creating stunning cakes, unique pinatstom sugar prints 
          that make every celebration unforgettable. Each creation is handcrafted with passion and 
          attention to detail, ensuring your special moments are truly magical.
        </p>
        <p>
          We offer a delightful range of products perfect for any celebration - from stunning 
          birthday cakes to colorful pinatas filled with surprises, and custom sugar prints 
          that add a personal touch to your desserts. Our artisans combine traditional craftsmanship 
          with modern creativity to bring your celebration visions to life.
          with relevant information.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
