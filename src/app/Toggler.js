import Switch from '@material-ui/core/Switch';
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const Toggler = ({toggle, map, title}) => {

    const Togglestyle = {
        float: "left",
        display: "inline"
    }

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
        toggle(!map);
    };

    return (
        <div style={Togglestyle}>
            <GreySwitch
            checked={map}
            onChange={handleChange}
            name={map}
            value={map}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <b>{title}</b>
            {console.log(map)}
        </div>
        
    )
}

export default Toggler
