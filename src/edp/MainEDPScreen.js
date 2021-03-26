// src/App.js
//importing all components, images and css files
import React from 'react';
import laptopPic from '../images/Icons/018-laptop-white.png'
import infoIcon from '../images/Icons/019-information-white.png'
import tipIcon from "../images/Icons/028-new-lamp-white.png"
//import './fonts/FjallaOne-Regular.ttf'
import PopupComponent from "./PopupComponent"
import InfoPopupComponent from "./InfoPopupComponent"
import ProgressBarComponentEDP from "./ProgressBarComponentEDP"
//Importing styling
import './MainEDPScreen.css';

//importing bootstrap framework
import 'bootstrap/dist/css/bootstrap.min.css';

//styling for main picture
const stylePic = {
  maxWidth: "50%",
  height: "auto",
  padding: "3%"
}

//get the hours of the current time (used for changing theme)
const hours = new Date().getHours();

const MainEDPScreen = ({description, apiKey, main}) => {
    return (
        <div className="container" id="EDPContainer">
		    <div className="header">
                <h2 id="title">Electronic Percentage Damage</h2>
                <div>
                    {/* This icon is used to format the information icon for more help */}
                    <InfoPopupComponent iconImage={infoIcon} iconFloatDirection="left" time={hours}/>
                    <img src={laptopPic} style={stylePic} alt="laptopPic" />
                    {/* This icon is used to give the daily advice*/}
                    <PopupComponent iconImage={tipIcon} iconFloatDirection="right" 
                    title="Daily Advice For Todays Weather" time={hours} main={main} description={description} />
                </div>
                {/* percentage prop passed through to render progress bar */}
                <ProgressBarComponentEDP api={apiKey} main={main}/>
			</div>
		</div>
    )
}

export default MainEDPScreen
