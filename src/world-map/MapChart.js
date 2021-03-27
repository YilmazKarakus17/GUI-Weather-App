import React, { memo } from "react";
import mulk from "mulk";
import $ from 'jquery';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

 /*This json file contains all the information of the different countries including names and alpha 2 names */
 /*The alpha 2 names are used in conjunction with another frame work to get the capital city of the country */
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


  
const MapChart = ({apiKey, setTooltipContent }) => {
  let temp = ""
  function fetchWeatherData(capital){
		// setting up the api key value and the longitude and latitude of the devices current location to be used in the API request
		let rqst = "https://api.openweathermap.org/data/2.5/weather?q=" +capital.toString() + "&appid=6ef9d69333030364ba9d9f06fb2b67d7";
        console.log(rqst);
		$.ajax({
			url: rqst,
			dataType: "jsonp",
			success : parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
    //return temp
	}
      //Parsing the API response 
  const parseResponse = (parsed_json) =>  {
    let temp_c = parsed_json['main']['temp'];
    temp = temp_c.toString()
  }


  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 150 }}>
        <ZoomableGroup> {/* This componet is retrieved from the framework which allows us to zoom into the map */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => { /*The following function happens when the use presses a counrty on the map */
                    const { NAME, ISO_A2} = geo.properties;
                    const countryInfo = mulk(ISO_A2) //using aplha names to get capital city of a country which will be used with the API to get the weather
                    fetchWeatherData(countryInfo.capital)
                    console.log(countryInfo.capital)
                    setTooltipContent(`${NAME} -  ${Math.round(parseInt(temp)-273.15)}°C`); //changing to celcius and pasting the result
                    console.log(`${NAME}`)
                  }}
                  onMouseLeave={() => { //on mouse leave, map returns back to default
                    setTooltipContent("");
                  }}
                  style={{ //styling for the world map using css
                    default: {
                      fill: "white",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
