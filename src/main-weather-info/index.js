//Importing react and its modules
import React from 'react';

//Importing styling
import './style.css';

export default class MainWeatherInfo extends React.Component{

    //This function converts the temperature prop argument given in Kelvin into Celsuis and returns the string result
    K2C(temp){
        const kelvinConversion = -273.15
        return Math.round(temp + kelvinConversion)
    }

    getWeatherIcon(icon, main, desc){
        let alt = main + ":" + desc
        const icons = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
        return <img id="weatherIcon" src={icons} alt={alt} />;
    };

    render() {
        //Declaring and initialising variable to be used in the HTML output
        let temp = this.K2C(this.props.temperature).toString() + "°";
        let wthrMain = this.props.main;
        let wthrDesc = this.props.desc;
        let wthrIcon = this.props.icon;

        //Following conditions are based of the open weather API documentation found here: https://openweathermap.org/weather-conditions
        return(
            <section id="weatherInfo" className="col sn-12" style={{color:'white', textAlign:'center', minHeight:'100%'}}>
                <span>{ temp }</span>
                {this.getWeatherIcon(wthrIcon,wthrMain,wthrDesc)}
            </section>
        );
    }

}
