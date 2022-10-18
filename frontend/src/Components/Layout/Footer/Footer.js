import React from "react";
import appStore1 from "../../../Images/AppStore1.png";
import playStore1 from "../../../Images/GooglePlay.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={appStore1} alt="Appstore" />
        <img src={playStore1} alt="playstore" />
        
       
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE...</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2022 &copy; Farjana Developer</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.linkedin.com/in/farjana-fateh-mohd-17a8441a0/">Linkedin</a>
        <a href="https://github.com/Farjana1khan">GitHub</a>
      
      </div>
    </footer>
  );
};

export default Footer;
