//styling for icon images to make them fit
const iconStyle = {
    maxWidth: "45%",
    minWidth: "45%",
    maxHieght: "auto"
}

// This component gives an image the same functionality as a button by 
// layering an image over the button.
const IconComponent = ({iconImage, iconFloatDirection, onAnimation}) => {

    /* styling for the button to make the icon clickable*/
    const buttonStyle = {
        maxWidth: "20%",
        minWidth: "20%",
        maxHieght: "auto",
        backgroundColor: "Transparent",
        backgroundRepeat: "no-repeat",
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        outline: "none",
        position: "relative",
        top: "10px",
        float: iconFloatDirection,
        right: iconFloatDirection === "left" ? "-35px" : "35px"
    }


    return (
        // returning button with image icon
        // onAnimation is a function that occurs when the button is clicked
        // eslint-disable-next-line
        <button onClick={onAnimation} style={buttonStyle}><img style={iconStyle} src={iconImage} alt="image"/></button>
    )
}

export default IconComponent
