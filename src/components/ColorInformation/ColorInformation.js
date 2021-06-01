import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { animateSlideToTop, transition } from "../../Animation/Animation";
import cart from "../../assets/img/cart.png";
import close from "../../assets/img/close.png";
import loading from "../../assets/img/loading.gif";
import ChangeColorText from "../../hooks/use_changeColorText";
import Notify from "../Notify/Notify";
import "./ColorInformation.css";

function ColorInformation(props) {
  const { colorinfo, errCode, handCancle, text } = props;

  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const errorText = {
    notResult: "Aucune correspondance trouvée",
    notTex: "Nous n’avons pas pu lire votre référence. Merci de recommencer.",
  };
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

  useEffect(() => console.log(colorinfo, errCode), [colorinfo, errCode]);

  return (
    <React.Fragment>
      {cartIsShown && <Notify onClose={hideCartHandler} />}

      {errCode === -1 && (
        <div className="loading">
          <img src={loading} alt="Loading" />
        </div>
      )}
      {errCode !== -1 && (
        <motion.div
          initial="out"
          animate="in"
          exit="exit"
          transition={transition}
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
                backgroundColor: `${
                  errCode === 0
                    ? colorinfo.hexCode
                    : errCode === 1
                    ? "#ff7f00"
                    : "#fed000"
                }`,
              }}
            >
              <div className="image-container-close">
                <div to="scan" onClick={handCancle}>
                  <img
                    className="btn-close"
                    src={close}
                    alt="cart"
                    style={{
                      background: `${
                        ChangeColorText(colorinfo.hexCode) === "black"
                          ? "black"
                          : ""
                      }`,
                    }}
                  />
                </div>
              </div>
              <div className="grid">
                <div className="row">
                  <div className="col ">
                    <h1 style={{ color: ChangeColorText(colorinfo.hexCode) }}>
                      {errCode === 0
                        ? `${colorinfo.name}`
                        : errCode === 1
                        ? `${errorText.notTex}`
                        : errCode === 2
                        ? `${errorText.notResult}`
                        : ""}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-bottom">
              <div className="grid">
                <div className="row">
                  <div className="col ">
                    {errCode === 0 && <p> {colorinfo.desc} </p>}
                    {errCode === 1 && (
                      <p>
                        Pour une reconnaissance optimale du texte, veuillez:
                        <br />
                        -Stabiliser votre appareil photo <br />
                        -Vous assurer d’un éclairage suffisant <br />
                        -Cadrer la photo de face si possible. <br />
                      </p>
                    )}
                    {errCode === 2 && (
                      <p>
                        L’application a détecté la référence suivante : ${text}
                        mais n’a trouvé aucune correspondance dans sa base de
                        données. Une des raisons peut être la suivante : <br />
                        -La base de données ne contient pas cette référence à ce
                        stade du projet. <br />
                        -La référence scannée comporte trop ou pas assez de
                        texte afin d’être reconnue par notre application. <br />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {errCode === 0 && (
              <div className="image-container1">
                <img
                  className="btn-cart"
                  src={cart}
                  alt="cart"
                  onClick={showCartHandler}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </React.Fragment>
  );
}

export default ColorInformation;
