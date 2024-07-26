import { Link } from "react-router-dom";
import React, { useState } from "react";
import HotelLogo from "./images/HotelLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faBellConcierge, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./index.css";

export default function Header({ loggedin }) {

  return (
    <div>
      <header className="p-4 flex-col bg-blue-500 text-white">
        <div  className="flex items-center">
            <Link to="/" className="flex items-center gap-1">
            <img src={HotelLogo} alt="Hotel Blissful Logo" className="max-w-[100px] max-h-[100px] bg-transparent" />
            <span className="font-bold text-cl hover:underline">Hotel Blissful</span>
            </Link>
            <div className="container m-auto">
                <div className="flex text-lg justify-center gap-40">
                    <Link to="/amenities" className="flex box-border items-center gap-10 bg-blue-500 hover:scale-110 hover:bg-sky-700 active:border-white">
                    <FontAwesomeIcon icon={faBellConcierge} />
                    <p>Amenities</p>
                    </Link>
                    <Link to="/services" className="flex box-border items-center gap-10 bg-blue-500 hover:scale-110 hover:bg-sky-700 active:border-white">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    <span>Services & Info</span>
                    </Link>
                    <Link to="/reservations" className="flex box-border items-center gap-10 bg-blue-500 hover:scale-110 hover:bg-sky-700 active:border-white">
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    <span>Find Your Reservation</span>
                    </Link>
                </div>
            </div>
            <Link to={loggedin ? '/account' : '/login'} className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 items-center">
            <div className="flex-wrap">
                <FontAwesomeIcon icon={faBars} />
            </div>
            <p className="text-xs">Login/Register</p>
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 p-1 overflow-hidden">
                <FontAwesomeIcon icon={faUser} />
            </div>
            <p className="text-xs">Account</p>
            </Link>
        </div>

        
        
      </header>
    </div>
  );
}
