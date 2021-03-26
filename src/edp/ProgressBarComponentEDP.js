//Importing react
import React from 'react';

// import jquery for API calls
import $ from 'jquery';

//importing progress bar from bootstrap framework
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// styling for progress bar
const bar = {
    width: "80%",
    maxWidth: "80%",
    margin: "0 auto", 
    paddingTop: "0.5em",
    float: "left"
}

// styling for percentage value to make it inline with progress bar
const value = {
    fontSize: "140%",
    margin: "0 auto",
    paddingLeft: "3%",
    float: "right"
}


export default class ProgressBarComponentEDP extends React.Component {
    // a constructor with initial set states
      constructor(props){
          super(props);
          // temperature state
          this.state = {
              api: props.api,
              main: props.main
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
        //calculating the percentage using values from weather-stats screen
        var mainPercentage = this.state.main==='Clear' ? 10 : this.state.main==='Clouds' ? 15 : this.state.main==='Rain' ? 50 : this.state.main==='Thunderstorm' ? 90 : 25
        console.log(mainPercentage)
        console.log(((this.state.air*20) + (this.state.humidity) + (this.state.precipitation*100) + (this.state.clouds)) % 100)
        var percentage = Math.round((mainPercentage*0.7) + ((((this.state.air*20) + (this.state.humidity) + (this.state.precipitation*100) + (this.state.clouds))%100)*0.3))
        //mainPercentage*0.7
        return (
            <div>
                <div style={bar}>
                    {/* The colour of the bar is determined by the value of the percentage prop.
                    If the value is above 75% it will be red, if it is below 75% but above 50% it will be 
                    yellow, else it will be green.*/}
                    <ProgressBar variant={percentage>75 ? "danger" : percentage>50 ? "warning" : "success"}
                    animated now={percentage} />
                </div>
                <div style={value}>
                    <b>{percentage}%</b>
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