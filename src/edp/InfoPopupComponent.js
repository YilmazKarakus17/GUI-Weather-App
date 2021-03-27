import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IconComponent from './IconComponent'
import "./PopupComponent.css"


// This component uses the Icon Component as button which once clicked, activates an animation.
// This animation was implemented using the sweetalert2 framework.
const InfoPopupComponent = ({iconImage, iconFloatDirection, time}) => {
    const animation = () => {
        const MySwal = withReactContent(Swal)
        /*Using sweet alert 2 frame work to create animation*/
        MySwal.fire({
            title: 'Electronic Damage Percentage',
            imageUrl: null,
            imageWidth: 150,
            imageHeight: 150,
            text: 'The Electronic Damage Percentage or EDP is calculated using various data from the weather forecast.It calculates the chances of your device being damaged due to heavy rainfall and bad weather. The lower the percentage, the less likely you are to damage you device',
            /*Colour and theme depends on time of day (condtional rendering used)*/
            confirmButtonColor: time >= 5 && time < 12 ? "rgba(234,172,29)" : time >= 12 && time < 18 ? "rgba(29,170,234,)" : "rgba(41,29,191)",
            confirmButtonText: "Ok!",
            textColor:"#FFF",
            width: 600,
            padding: '1em',
             /*Colour and theme depends on time of day (condtional rendering used)*/
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
InfoPopupComponent.defaultProps = {
    title: 'Electronic Damage Percentage',
    time: 0,
    imageloc: 'https://unsplash.it/400/200',
    text: 'The Electronic Damage Percentage or EDP is calculated using various data from the weather forecast.It calculates the chances of your device being damaged due to heavy rainfall and bad weather. The lower the percentage, the less likely you are to damage you device',
    imageUrl: null
}



export default InfoPopupComponent