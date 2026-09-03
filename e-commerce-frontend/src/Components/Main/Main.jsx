import React from "react";
import "./Main.css";
import hero_image from "../Assets/auto-parts.jpeg";

const Main = () => {
  return (
    <div className="main_page">
      <div className="main_page_content">
        <p className="eyebrow">Quality Parts, Daily</p>
        <h2>Genuine Parts.<br />Trusted Fit.</h2>
        <div className="main_page_btns">
          <a
            href="https://wa.me/8329831919"
            target="_blank"
            rel="noopener noreferrer"
            className="btn_primary"
          >
            WhatsApp Us
          </a>
          <a href="#about" className="btn_link">About Us &gt;</a>
        </div>
      </div>
      <div className="main_page_image">
        <img src={hero_image} alt="Car parts" />
      </div>
    </div>
  );
};

export default Main;
