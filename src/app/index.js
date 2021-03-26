//Importing react and its modules
import React from 'react';

//Importing jquery for API calls
import $ from 'jquery';

//Importing images
import MorningImage from '../images/backgrounds/Morning.png';
import AfternoonImage from '../images/backgrounds/Afternoon.png';
import EveningImage from '../images/backgrounds/Evening.png';

//Importing app components
 // eslint-disable-next-line
import MainWeatherInfo from '../main-weather-info/';
 // eslint-disable-next-line
import MainEDPScreen from '../edp/MainEDPScreen';
 // eslint-disable-next-line
import Weatherfetch from '../weatherfetch';
 // eslint-disable-next-line
import WeatherStats from '../weather-stats';
import WorldMap from "../world-map/WorldMap"
//import Toggler from "./Toggler"


//Importing Swiper
import Swiper from './Swiper.js'
import Pagination from './Pagination'
import SwipeableViews from 'react-swipeable-views';

//Importing styling
import './App.css';

//imports for Toggler
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            city: "",
            temp: "",
            weatherMain: "",
            weatherDesc: "",
            weatherIcon:"",
            apiKey: "6ef9d69333030364ba9d9f06fb2b67d7",
            map: false,
            index: 0
        }
    }

    /* Doing the API calls before the app renders */
    componentWillMount(){
        this.fetchGeographicLocation();
    }

    /* Once the render method is executed the app does periodic checks */
    componentDidMount(){
        let crntTime;
        //updates the app clock every minute
		setInterval(() => {
            crntTime = this.getCurrentTime();
            document.getElementById('crntTime').innerHTML = this.getCurrentTime();
        }, 1000)

        //checks sets the background every 5 mins
        setInterval(() => {
            this.setBackground(crntTime)
        }, 300000)
	}

    /*==================================================== Class Methods ========================================= */
      /* fetchGeographicLocation() is used to retrieve the current longitude and latitude
		 coordinates of the device to set the instance variables lon and lat to the respective values*/
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

    /* fetchWeatherData is a function that uses jquery to request weather information from the openweather API */
	fetchWeatherData(lat,lon){
		// setting up the api key value and the longitude and latitude of the devices current location to be used in the API request
		let rqst = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat.toString() + "&lon=" + lon.toString() + "&appid=" + this.state.apiKey;
        console.log("Making API Request ...");
		$.ajax({
			url: rqst,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

    //Parsing the API response
    parseResponse = (parsed_json) => {
        var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var mainWeather = parsed_json['weather']['0']['main'];
        var weatherDesc = parsed_json['weather']['0']['description'];
        var icon = parsed_json['weather']['0']['icon'];

		// set states for fields so they could be rendered later on
		this.setState({
            city: location,
            temp: temp_c,
            weatherMain: mainWeather,
            weatherDesc: weatherDesc,
            weatherIcon: icon
		});
	}

	//returns a string representation of the current time
	getCurrentTime(){
        //Declaring & initialising variables
		let crnt = new Date();
		let hr = "";
		let min = "";

		//checking if the hours are sub 10 if so concatenate a 0 before the single digit
		if (crnt.getHours() < 10){
			hr = "0" + crnt.getHours();
		}
		else{
			hr = crnt.getHours();
		}

		//checking if mins are sub 10 if so concatenate a 0 before the single digit
		if (crnt.getMinutes() < 10){
			min = "0" + crnt.getMinutes()
			return hr + ":" + min
		}
		else{
			min = crnt.getMinutes();
			return hr + ":" + min
		}
	}
    function
    //Sets the apps background image to be representative of the current time
    setBackground(crntTime){
        //parsing the string argument crntTime to get the numeric representation of the current hour
        let hr = parseInt(crntTime[0] + crntTime[1])

        if (hr >= 5 && hr < 12){
            //If the current time is between 5am - 12am display the morning background
            document.body.style["backgroundImage"] = `url(${MorningImage})`
        }
        else if (hr >=12 && hr < 18) {
            //If the current time is between 12pm - 6pm display the afternoon background
            document.body.style["backgroundImage"] = `url(${AfternoonImage})`
        }
        else if (hr >= 18 || hr < 5){
            //If the current time is between 6pm - 5am display the evening background
            document.body.style["backgroundImage"] = `url(${EveningImage})`
        }

    }


    handleChangeIndex = index => {
      this.setState({
        index,
      });
    };

    render(){
      const { index } = this.state;

      //Getting the current time
      let crntTime = this.getCurrentTime();
      //callin the setter method to set the background of the whole page
      this.setBackground(crntTime);

      let comArr = [<MainWeatherInfo temperature={parseInt(this.state.temp)} main={this.state.weatherMain.toString()} desc={this.state.weatherDesc.toString()} icon={this.state.weatherIcon.toString()} />, <MainEDPScreen />, <WeatherStats api={this.state.apiKey}/>]
      let compArrFooterFalse = [<Weatherfetch />, <MainEDPScreen />]
      let compArrFooterTrue = [<WorldMap apiKey={this.state.apiKey}/>, <MainEDPScreen />]
      const Togglestyle = {
          float: "left",
          display: "inline"}

      const GreySwitch = withStyles({
          switchBase: {
              color: grey[400],
              '&$checked': {
                  color: grey[50],
              },
              '&$checked + $track': {
                  backgroundColor: grey[50],
              },
          },
      checked: {},
      track: {},
      })(Switch);


      const handleChange = (event) => {
          this.setState({
              map: !this.state.map,
          });

      };

      return(
          <div className="container" id="app">
              <header className="row" style={{textAlign:'center',color:'white'}}>
                  <div className="container">
                      <div style={Togglestyle}>
                          <GreySwitch
                          checked={this.state.map}
                          onChange={handleChange}
                          name={this.state.map}
                          value={this.state.map}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                          <b>World Map Toggle</b>
                          {console.log(this.state.map)}
                      </div>
                      <section className='row headerSection'>
                          <h1 className='col sn-12' id='crntTime'>{crntTime}</h1>
                      </section>
                      <section className='row headerSection'>
                          <h2 className='col sn-12' id="city">{this.state.city}</h2>
                      </section>
                  </div>
              </header>
              <hr className="SectionDividers"/>
              <div className="row" id="middleContent">
                  <SwipeableViews enableMouseEvents index={index} onChangeIndex={this.handleChangeIndex}>
                    <MainWeatherInfo temperature={parseInt(this.state.temp)} main={this.state.weatherMain.toString()} desc={this.state.weatherDesc.toString()} icon={this.state.weatherIcon.toString()} />
                    <MainEDPScreen />
                    <WeatherStats api={this.state.apiKey}/>
                  </SwipeableViews>
                  <Pagination dots={3} index={index} onChangeIndex={this.handleChangeIndex} />
              </div>
              <hr className="SectionDividers"/>
              <footer className="row">
                  {this.state.map ?  <Swiper compArr={compArrFooterTrue} /> : <Swiper compArr={compArrFooterFalse} />}
              </footer>
          </div>
      );
    }
}
