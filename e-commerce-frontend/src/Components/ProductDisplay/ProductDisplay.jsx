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
        </div>        <div className="product_display_right_description">
        Our delicious {product.category} are made fresh daily with premium ingredients. Perfect for any celebration or special moment.
        Each item is crafted with care to ensure the perfect taste and presentation.
        </div>
       
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="product_display_right_category"><span>Category :</span> {product.category}</p>
        <p className="product_display_right_category"><span>Tags :</span> Fresh Baked, Homemade</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
