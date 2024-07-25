import Calendar from "react-calendar";
import React, {useState} from "react";

const ReactCalendar = () =>{
    const[date,setReservationDate] = useState(new Date());

    const onChange = () =>{
        setReservationDate(date);
    }
    return(
        <div>
            <Calendar onChange={onChange} value={date}/>
        </div>
    );
 };
export default ReactCalendar;