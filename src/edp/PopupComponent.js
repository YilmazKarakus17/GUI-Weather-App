import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IconComponent from './IconComponent'
import "./PopupComponent.css"
import happyIcon from '../images/Icons/026-happy-white.png'
import backpackIcon from '../images/Icons/025-backpack-white.png'
import umbrellaIcon from '../images/Icons/008-umbrella-white.png'

// This function is an added feature which selects a random element from an
// array. This function is used to display different messages, to prevent the 
// application from becoming repetative
function randomElement(arr) {
    return (arr[Math.floor(Math.random() * arr.length)]);
}

// This component uses the Icon Component as button which once clicked, activates an animation.
// This animation was implemented using the sweetalert2 framework.
const PopupComponent = ({iconImage, iconFloatDirection, title, text, time, percentage}) => {
    
    //below are the different arrays which contain the messages for the various different popups
    const arrDanger = [
         "The EDP is very high today so please have an umbrella with you at all times to prevent your device from getting damaged.",
         "High EDP value suggest that the chances of your devices getting damaged is very possible so please have an umbrella.",
         "An umbrella is adviced for todays weather to protect your devices from the heavy rainfall.",
    ]

    const arrWarning = [
        "For today, we advice you to bring a suitable way of carryiing your electronics such as a backpack",
        "A backpack would be recommended for today to prevent your devices from getting damaged.",
        "The EDP does not suggest heavy rain fall however, a backpack might come in handy for todays weather.",
    ]


    const arrSuccess = [
        "Based on the weather data and EDP, you are all good to go. Have a good day today!!!",
        "The EDP is very low today so the chances of your devices getting damaged is not likely. Enjoy your day",
        "Todays weather is very unlikely to result in your device getting damaged so please enjoy your day.",
    ]

    const animation = () => {
        const MySwal = withReactContent(Swal)

        /* 
        The image of the popup changes depending on the percentage. This is mapped with the colour of the progress bar. 
        If a percentage prop is not passed in, no picture will render.
        The text also changes with the percentage. Depending on the current percentage, the randomElement fucntion will
        be called to get a random message from the corresponding arryas.
        The time prop is used to determine the colour of the popup. There 3 distinct themes so using the time prop and 
        conditional rendering, we are able to set the different themes. For instance, from 05:00 till 12:00, the buttons,
        background and backdrop will be orange, however, this colour scheme will chance from 12:00 to 18:00 and 18:00 to
        05:00 respectivly.
        Finally, using this framework helped to make the program more responsivie and intuitive because you could now
        click outside the popup window to exit the popup. (Extention) 
        */
        MySwal.fire({
            title: title,
            imageUrl: percentage>75 ? umbrellaIcon : percentage>50 ? backpackIcon: percentage>=0 ? happyIcon : null,
            imageWidth: 150,
            imageHeight: 150,
            text: percentage>75 ? randomElement(arrDanger) : percentage>50 ? randomElement(arrWarning): percentage>=0 ? randomElement(arrSuccess) : text, 
            confirmButtonColor: time >= 5 && time < 12 ? "rgba(234,172,29)" : time >= 12 && time < 18 ? "rgba(29,170,234,)" : "rgba(41,29,191)",
            confirmButtonText: "Ok!",
            textColor:"#FFF",
            width: 600,
            padding: '1em',
            background: time >= 5 && time < 12 ? "rgba(247,87,29)" : time >= 12 && time < 18 ? "rgba(49,88,235)" : "rgba(26,1,129)",
            backdrop: time >= 5 && time < 12 ? "rgba(123,0,0,0.4)" : time >= 12 && time < 18 ? "rgba(0,0,123,0.4)" : "rgba(123,0,123,0.4)"
        })
    }

    //return the icon component but onClick now results in an animation
    return (
        <IconComponent onAnimation={animation} iconImage={iconImage} iconFloatDirection={iconFloatDirection} />
    )
}

// The Popup Component has default props, making the application more robust by ensuring 
// that if the props are left empty by mistake, it will not cause a problem
PopupComponent.defaultProps = {
    title: 'Electronic Damage Percentage',
    time: 0,
    imageloc: 'https://unsplash.it/400/200',
    text: 'Please Insert Text',
}



export default PopupComponent
