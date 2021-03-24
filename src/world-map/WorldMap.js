import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

//import "./styles.css";

import MapChart from "./MapChart";


const WorldMap = (apiKey) => {
    const [content, setContent] = useState("");
    return (
    <div>
      <MapChart apiKey={apiKey} setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
    )
}

export default WorldMap