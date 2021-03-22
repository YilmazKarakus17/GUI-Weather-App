import React, { Component } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';

export default class Weatherfetch extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

    /* Doing the API calls before the app renders */
    componentWillMount(){
      this.fetchGeographicLocation();
  }

	fetchGeographicLocation() {
		//First check if the browser supports geo locations
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(
				/*anonymous method passed as the first argument used by the getCurrentPosition
				  method when it was successful, else it calls the error function */
				(position) => {
					//creating a variable to store the coordinates
					let crds = position.coords;
					this.fetchWeatherData(crds.latitude, crds.longitude);
				},
				//the method that gets called when an error occurs
				() => {
					window.alert("Error has occurred");
				}
			);
		}
	}

  fetchWeatherData(lat,lon){
		// setting up the api key value and the longitude and latitude of the devices current location to be used in the API request
		let apiKey = "7e36cf22a0239d331c9e9675dd3938ae";
		let rqst = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat.toString() + "&lon=" + lon.toString() + "&appid=" + apiKey;
		$.ajax({
			url: rqst,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

  parseResponse = (parsed_json) => {
    this.setState({
      data: [parsed_json]
    });
  } 

  checkTempImg = (icon) => {
    const icons = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    return <img className="weatherIcons col sn-6" src={icons} alt="" />;
  };

  K2C(temp){
    const kelvinConversion = -273.15
    return Math.round(temp + kelvinConversion)
  }
  
  render() {
    return (
      <div className="container">
        {this.state.data.map((item, index) => (
          <div className="allTime" key={index}>
            <div className="row">
              <h2 className="footerText col sn-5">Morning: </h2>
              <h4 className="footerText col sn-1">
                {this.K2C(item.daily[0].temp.morn)}°
              </h4>
                {this.checkTempImg(item.daily[0].weather[0].icon)}{" "}
            </div>

            <div className="row">
              <h2 className="footerText col sn-5">Afternoon: </h2>
              <h4 className="footerText col sn-1">
                {this.K2C(item.daily[0].temp.eve)}°{" "}
              </h4>
                {this.checkTempImg(item.daily[0].weather[0].icon)}{" "}
            </div>

            <div className="row">
              <h2 className="footerText col sn-5">Evening: </h2>
              <h4 className="footerText col sn-1">
                {this.K2C(item.daily[0].temp.night)}°{" "}
              </h4>
                {this.checkTempImg(item.daily[0].weather[0].icon)}{" "}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
