import React, { useState } from "react";
import "./ColorData.css";
import cart from "../img/cart.png";
import close from "../img/close.png";
import { Link } from "react-router-dom";

function Colordata() {
  return (
    <div className="color-data">
      <div className="content-top">
        <div className="image-container-close">
          <Link to="camera">
            <img className="btn-close" src={close} alt="cart" />
          </Link>
        </div>
        <div className="grid">
          <div className="row">
            <div className="col ">
              <h1></h1>
            </div>
          </div>
        </div>
      </div>
      <div className="content-bottom">
        <div className="grid">
          <div className="row">
            <div className="col ">
              <h1></h1>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img className="btn-cart" src={cart} alt="cart" />
        </div>
      </div>
    </div>
  );
}
export default Colordata;
