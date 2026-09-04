import React, { useContext } from "react";
import "./ProductDisplay.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
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
          <AiFillStar className="star-filled" /><AiFillStar className="star-filled" /><AiFillStar className="star-filled" /><AiFillStar className="star-filled" /><AiOutlineStar />
          <p>(122)</p>
        </div>
        <div className="product_display_right_prices">
          <div className="product_display_right_price_old">${product.old_price}</div>
          <div className="product_display_right_price_new">${product.new_price}</div>
        </div>        <div className="product_display_right_description">
        {product.description || `A quality ${product.category} part checked for fitment and reliability. Built to keep your vehicle running safely.`}
        </div>

        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="product_display_right_category"><span>Category :</span> {product.category}</p>
        <p className="product_display_right_category"><span>Tags :</span> Genuine Part, Quality Checked</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
