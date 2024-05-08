import React from "react";
import "./Main.css";
import hero_image from "../Assets/auto-parts.jpeg";
// import hero_image from "../Assets/Movie_1.mov";
// import hand_icon from "../Assets/hand_icon.png";
// import arrow_icon from "../Assets/arrow.png";

const Main = () => {
  return (
    
    <div className="main_page">
     
           
      

      <div className="main_page_left">
        <h2>GENUINE PARTS ONLY</h2>
        <p>Find the parts</p>
        {/* <p>parts for your car</p> */}
        <p>that you need</p>
            <div className="main_page_btn">
                <div>CONTACT US 832 983 19 19</div>
                
            </div>
      </div>
            <div className="image_right">
              <img src={hero_image} alt="hero" /> 
            </div> 
            
           
            

    </div>
  );
};

export default Main;
