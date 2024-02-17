import DigitalClock from './digitalClock';
import AnalogClock from './analogClock';
const Body = () => {
    return(
        <div>
            <AnalogClock backgroundImage="https://upload.wikimedia.org/wikipedia/commons/e/ef/Clock_clipart_nohands.png" />
            <DigitalClock />
        </div>
    );}

export default Body;