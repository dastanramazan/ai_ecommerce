import React, { useContext } from "react";
import "./CartItems.css";
import { FiX } from "react-icons/fi";
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
  const {products} = useContext(ShopContext);
  const {cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext);

  return (
    <div className="cart_items">
      <div className="cart_items_format_main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e)=>{

        if(cartItems[e.id]>0)
        {
          return  <div key={e.id}>
                    <div className="cart_items_format_main cart_items_format">
                      <img className="cart_items_product_icon" src={e.image} alt="" />
                      <p className="cartitems-product-title">{e.name}</p>
                      <p>${e.new_price}</p>
                      <button className="cart_items_quantity">{cartItems[e.id]}</button>
                      <p>${e.new_price*cartItems[e.id]}</p>
                      <FiX onClick={()=>{removeFromCart(e.id)}} className="cart_items_remove_icon" />
                    </div>
                     <hr />
                  </div>;
        }
        return null;
      })}

      <div className="cart_items_down">
        <div className="cart_items_total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cart_items_total_item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart_items_total_item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart_items_total_item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart_items_promocode">
          <p>Enter a promo code here</p>
          <div className="cart_items_promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
