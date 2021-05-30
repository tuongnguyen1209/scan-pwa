import React, { useEffect, useState } from "react";
import cart from "../../assets/img/cart.png";
import close from "../../assets/img/close.png";
import ChangeColorText from "../../hooks/use_changeColorText";
import "./ColorInformation.css";

function ColorInformation(props) {
  const { colorinfo, errSearch, isSearch, handCancle } = props;
  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  });

  const handlTouchStart = (even) => {
    setTouch({ ...touch, start: even.changedTouches[0].clientY });
  };
  const handlTouchEnd = (even) => {
    setTouch({ ...touch, end: even.changedTouches[0].clientY });
  };

  useEffect(() => {
    console.log(touch);
    if (
      touch.start > touch.end &&
      touch.end > 0 &&
      touch.start - touch.end > 300
    ) {
      // console.log("voday");
      handCancle();
    }
  }, [touch.end]);

  return (
    <div
      className="colorinfomation"
      onTouchStart={handlTouchStart}
      onTouchEnd={handlTouchEnd}
    >
      <div
        className="content-top"
        style={{
          backgroundColor: `${colorinfo.hexCode}`,
        }}
      >
        <div className="image-container-close">
          <div to="scan" onClick={handCancle}>
            <img className="btn-close" src={close} alt="cart" />
          </div>
        </div>
        <div className="grid">
          <div className="row">
            <div className="col ">
              <h1 style={{ color: ChangeColorText(colorinfo.hexCode) }}>
                {isSearch
                  ? "Loadding"
                  : errSearch !== ""
                  ? `${errSearch}`
                  : `The color ${colorinfo.name} is displayed on the header background.`}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="content-bottom">
        <div className="grid">
          <div className="row">
            <div className="col ">
              <h1>{colorinfo.desc}</h1>
            </div>
          </div>
        </div>
        {errSearch === "" && (
          <div className="image-container">
            <img className="btn-cart" src={cart} alt="cart" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ColorInformation;
