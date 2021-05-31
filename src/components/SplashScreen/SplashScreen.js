import React from "react";
import PWAPrompt from "react-ios-pwa-prompt";
import logo from "../../assets/img/color.png";
import ronin from "../../assets/img/ronin.png";
import scanBtn from "../../assets/img/scan.png";
import "./SplashScreen.css";

function SplashScreen(props) {
  return (
    <div className="splashScreen">
      <div className="main-spash-screen">
        <div className="wrap-logo">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="wrap-btn-scan">
          <div
            onClick={() => {
              props.handlChangePage(2);
            }}
            to="scan"
          >
            <img className="btn-scan" src={scanBtn} alt="scan" />
          </div>
        </div>
        <div className="wrap-footer">
          <img className="btn-footer" src={ronin} alt="footer" />
        </div>
      </div>
      <PWAPrompt
        promptOnVisit={3}
        timesToShow={1}
        copyClosePrompt="Close"
        copyBody="This website has app functionality. Add it to your home screen to use it in fullscreen."
        permanentlyHideOnDismiss={false}
      />
    </div>
  );
}

export default SplashScreen;
