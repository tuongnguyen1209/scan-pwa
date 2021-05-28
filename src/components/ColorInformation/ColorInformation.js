import React from 'react';
import cart from "../../assets/img/cart.png";
import close from "../../assets/img/close.png";
import './ColorInformation.css';




function ColorInformation(props) {


    const { colorinfo, errSearch, isSearch, handCancle } = props

    return (
        <React.Fragment>
            <div className="colorinfomation">
                <div
                    className="content-top"
                    style={{
                        backgroundColor: `${colorinfo.hexCode}`
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
                                <h1>
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
                                <h1>
                                    {colorinfo.desc}
                                </h1>
                            </div>
                        </div>
                    </div>
                    {errSearch === '' &&
                        <div className="image-container">
                            <img className="btn-cart" src={cart} alt="cart" />
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default ColorInformation;