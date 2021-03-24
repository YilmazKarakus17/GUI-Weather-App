import React, { memo } from "react";
import mulk from "mulk";
import $ from 'jquery';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

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
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, ISO_A2} = geo.properties;
                    const countryInfo = mulk(ISO_A2)
                    fetchWeatherData(countryInfo.capital)
                    console.log(countryInfo.capital)
                    setTooltipContent(`${NAME} -  ${Math.round(parseInt(temp)-273.15)}`);
                    console.log(`${NAME}`)
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
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
