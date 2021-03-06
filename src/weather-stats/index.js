//Importing react
import React from 'react';

// import jquery for API calls
import $ from 'jquery';

//Importing components
import ProgressBarComponent from "./ProgressBarComponent";

//Importing styling
import './style.css';

export default class WeatherStats extends React.Component {
  // a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state = {
			api: props.api
		};
	}

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

	// a call to fetch weather data via wunderground
	fetchWeatherData = (lat,lon) => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var api = this.state.api;
		var unit = 'metric';

		// This api call gets the precipitation, humidity and cloud coverage
		var url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&units=${unit}&appid=${api}`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseStats, // This is the function that ius used to parse the json file that the api returns
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		// This api call gets the air pollution data
		url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api}`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseAir, // This is the function that ius used to parse the json file that the api returns
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	// the main render method for the iphone component
	render() {
		return (
			<div className="container">
				<div className="row p-3"></div>
				<div className="row p-2">
				<div className="col-3 title">Pollution</div>
				<div className="col-9">
					<ProgressBarComponent  percentage={this.state.air*20}/>
				</div>
				</div>
				<div className="row p-2">
				<div className="col-3 title">Humidity</div>
				<div className="col-9">
					<ProgressBarComponent percentage={this.state.humidity}/>
				</div>
				</div>
				<div className="row p-2">
				<div className="col-3 title">Precip</div>
				<div className="col-9">
					<ProgressBarComponent percentage={this.state.precipitation*100}/>
				</div>
				</div>
				<div className="row p-2">
				<div className="col-3 title">Clouds</div>
				<div className="col-9" id="asdfasd">
					<ProgressBarComponent percentage={this.state.clouds}/>
				</div>
				</div>
			</div>
		);
	}

	parseStats = (parsed_json) => {
		var humidity_c = parsed_json['current']['humidity'];
		var precipitation_c = parsed_json['hourly'][0]['pop'];
		var clouds_c = parsed_json['current']['clouds'];

		this.setState({
			humidity: humidity_c,
			precipitation: precipitation_c,
			clouds: clouds_c
		});
	}

	parseAir = (parsed_json) => {
		var air_p = parsed_json['list'][0]['main']['aqi'];

		this.setState({
			air: air_p
		});
	}
}
