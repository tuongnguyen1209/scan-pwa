import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/color.png";
import scan from "../../assets/img/scan.png";
import ronin from "../../assets/img/ronin.png";
import "./PlashScreen.css";

const PlashScreen = () => {
  return (
    <div className="app">
      <div className="grid">
        <div className="fixed-content" style={{ marginTop: "10%" }} />
        <div className="row header">
          <div className="col">
            <div className="image-container">
              <img className="logo" src={logo} alt="logo" />
            </div>
          </div>
        </div>
        <div className="row scan">
          <div className="col">
            <div className="image-container">
              <img className="btn-scan" src={scan} alt="scan" />
            </div>
          </div>
        </div>
        <div className="row footer">
          <div className="col">
            <div className="image-container">
              <img className="ronin" src={ronin} alt="ronin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlashScreen;
