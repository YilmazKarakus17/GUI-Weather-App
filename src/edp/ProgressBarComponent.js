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

// This component takes in a value as a prop and displays a progress bar
const ProgressBarComponent = ({percentage}) => {
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
    )
}


export default ProgressBarComponent
