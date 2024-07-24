import suiteRoomImage from '../images/Hotelpic3.webp/'

import { Link } from "react-router-dom"

export default function SuiteRoom(){
return(

<div className="Suite Room">
    <h2> Suite Room</h2>
    <img src= {suiteRoomImage} alt="Suite Room" className= "room-image" />
    <p className="room-description">A luxurious suite with a separate living area </p>
    <p className="room-price">$300 per night</p>
</div>




)

}