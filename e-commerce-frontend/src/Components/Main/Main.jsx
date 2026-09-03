import React from "react";
import "./Main.css";
import hero_image from "../Assets/auto-parts.jpeg";

const Main = () => {
  return (
    <div className="main_page">
      <div className="main_page_left">
        <div className="main_page_content">
          <h2>QUALITY PARTS, DAILY</h2>
          <p>Genuine Parts,</p>
          <p>Trusted Fit</p>
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
      <div className="main_page_right image_right">
        <img src={hero_image} alt="Car parts" />
      </div>
    </div>
  );
};

export default Main;
