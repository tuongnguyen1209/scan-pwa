import React from 'react';
import logo from '../../assets/img/color.png';
import ronin from '../../assets/img/ronin.png';
import scanBtn from '../../assets/img/scan.png';
import './SplashScreen.css';


function SplashScreen(props) {
    return (
        <div className='splashScreen'>
            <div className='main-spash-screen'>
                <div className='wrap-logo'>
                    <img className="logo" src={logo} alt="logo" />
                </div>
                <div className='wrap-btn-scan'>
                    <div onClick={() => { props.handlChangePage(2) }} to='scan'>
                        <img className="btn-scan" src={scanBtn} alt="scan" />
                    </div>
                </div>
                <div className='wrap-footer'>
                    <img className="btn-footer" src={ronin} alt="scan" />
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;