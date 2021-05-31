import React, { useEffect, useState } from "react";
import ChangeColorText from "../../hooks/use_changeColorText";
import cart from "../../assets/img/cart.png";
import close from "../../assets/img/close.png";
import loading from "../../assets/img/loading.gif";
import "./ColorInformation.css";
import { motion } from "framer-motion";
import { animateSlideToTop } from "../../Animation/Animation";

function ColorInformation(props) {
  const { colorinfo, errSearch, isSearch, handCancle } = props;
  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  });
  const handlTouchStart = (event) => {
    console.log(event);
    if (event.target.nodeName !== "p") {
      setTouch({ ...touch, start: event.changedTouches[0].clientY });
    }
  };
  const handlTouchEnd = (event) => {
    setTouch({ ...touch, end: event.changedTouches[0].clientY });
  };

  useEffect(() => {
    if (
      touch.start > touch.end &&
      touch.start > 0 &&
      touch.end > 0 &&
      touch.start - touch.end > 250
    ) {
      console.log(touch);
      handCancle();
    }
  }, [touch.end, handCancle, touch.start, touch]);

  return (
    <React.Fragment>
      {isSearch && (
        <div className="loading">
          <img src={loading} alt="Loading" />
        </div>
      )}
      {!isSearch && (
        <motion.div
          initial="out"
          animate="in"
          exit="exit"
          variants={animateSlideToTop}
        >
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
                    <p>{colorinfo.desc}</p>
                  </div>
                </div>
              </div>
            </div>
            {errSearch === "" && (
              <div className="image-container1">
                <img className="btn-cart" src={cart} alt="cart" />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </React.Fragment>
  );
}

export default ColorInformation;
