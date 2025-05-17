import React from "react";
import "./Main.css";
import hero_image from "../Assets/auto-parts.jpeg";
import OrderForm from "../OrderForm/OrderForm";

const Main = () => {
  return (
    <div className="main_page">
      <div className="main_page_left">
        <div className="main_page_content">
          <h2>FRESHLY BAKED DAILY</h2>
          <p>Indulge in</p>
          <p>Sweet Moments</p>
          <div className="main_page_btns">
            <a
              href="https://wa.me/8329831919"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp_btn"
            >
              WhatsApp Us
            </a>
            <a href="#about" className="aboutus_btn">About Us</a>
          </div>
        </div>
      </div>
      <div className="main_page_right">
        <OrderForm />
      </div>
    </div>
  );
};

export default Main;
