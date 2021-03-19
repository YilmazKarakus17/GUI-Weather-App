// src/App.js
//importing all components, images and css files
import React from 'react';
import laptopPic from '../images/Icons/018-laptop-white.png'
import infoIcon from '../images/Icons/019-information-white.png'
import tipIcon from "../images/Icons/028-new-lamp-white.png"
//import './fonts/FjallaOne-Regular.ttf'
import ProgressBarComponent from "./ProgressBarComponent" 
import PopupComponent from "./PopupComponent"

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

//testing - percentage prop of ProgressBarComponent
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/*<<<<<<<<<<<<<<<<<<<<<<TO DO STILL>>>??????>>>>>>>>>>>>>>>>
Still need to create function to determine the EDP percentage
  <<<<<<<<<<<<<<<<<<<<<<TO DO STILL>>>??????>>>>>>>>>>>>>>>>*/

const EDPpercentage = getRandomInt(100)

//get the hours of the current time (used for changing theme)
const hours = new Date().getHours();

const MainEDPScreen = () => {
    return (
        <div className="container" id="EDPContainer">
		    <div className="header">
                <h2 id="title">Electronic Percentage Damage</h2>
                <div>
                    {/* This icon is used to format the information icon for more help */}
                    <PopupComponent iconImage={infoIcon} iconFloatDirection="left" 
                    title="Electronic Damage Percentage" 
                    text="The Electronic Damage Percentage or EDP is calculated using various data from the weather forecast.
                    It calculates the chances of your device being damaged due to heavy rainfall and bad weather. 
                    The lower the percentage, the less likely you are to damage you device" time={hours}/>
                    <img src={laptopPic} style={stylePic} alt="laptopPic" />
                    {/* This icon is used to give the daily advice*/}
                    <PopupComponent iconImage={tipIcon} iconFloatDirection="right" 
                    title="Daily Advice" time={hours} percentage={EDPpercentage} />
                </div>
                {/* percentage prop passed through to render progress bar */}
                <ProgressBarComponent percentage={EDPpercentage}/>
			</div>
		</div>
    )
}

export default MainEDPScreen
