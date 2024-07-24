import standardRoomImage from '../images/Hotelpic1.jpeg/'

import {Link} from "react-router-dom";

export default function StandardRoom(){
    return (
        <div className="Standard Room">
            <h2>Standard Room</h2>
            <img src={standardRoomImage} alt="Standard Room" className="room-image" />
            <p className="room-description"> A comfortable room with all the basic amenities.</p>
            <p className="room-price">$100 per night</p>
        </div>
    );
}

