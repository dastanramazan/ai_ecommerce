import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {

  const {product} = props;
  const {addToCart} = useContext(ShopContext);

  return (
    <div className="product_display">
      <div className="product_display_left">
       
        <div className="product_display_img">
          <img className="product_display_main_img" src={product.image} alt="img" />
        </div>
      </div>
      <div className="product_display_right">
        <h1>{product.name}</h1>
        <div className="product_display_right_stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="product_display_right_prices">
          <div className="product_display_right_price_old">${product.old_price}</div>
          <div className="product_display_right_price_new">${product.new_price}</div>
        </div>
        <div className="product_display_right_description">
        These premium brake pads are designed to provide superior stopping power and fade resistance for [car type, e.g., sports cars, performance vehicles].
         They are typically installed on the wheels and clamp down on the rotors to slow down the car.
        </div>
       
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="product_display_right_category"><span>Category :</span> Fluids, Break Pads, Ceramic</p>
        <p className="product_display_right_category"><span>Tags :</span> New, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
