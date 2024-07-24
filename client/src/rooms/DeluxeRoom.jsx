import deluxeRoomImage from '../images/Hotelpic1.jpeg'; // Adjust the path as necessary

import {Link} from "react-router-dom";

export default function DeluxeRoom() {
    return (
        <div className="deluxe-room">
            <h2>Deluxe Room</h2>
            <img src={deluxeRoomImage} alt="Deluxe Room" className="room-image" />
            <p className="room-description">A spacious room with a beautiful view of the city.</p>
            <p className="room-price">$200 per night</p>
        </div>
    );
}