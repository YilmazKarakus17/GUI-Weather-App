import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

//import "./styles.css";

import MapChart from "./MapChart";


// creating world map component that will allow user to select 
// a country on the map and get its weather info
const WorldMap = (apiKey) => {
    const [content, setContent] = useState("");
    return (
    <div>
       {/*Calling MapChart Component which deals with the map*/}
      <MapChart apiKey={apiKey} setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
    )
}

export default WorldMap