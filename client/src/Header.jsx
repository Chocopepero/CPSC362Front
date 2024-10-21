import { Link } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from './assets/components/Authenticate'; 
import HotelLogo from "./images/HotelLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faBellConcierge, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./index.css";

export default function Header() {
  const { user } = useContext(AuthContext); 

  return (
    <div>
      <header className="p-4 bg-gradient-to-t from-[#f6f1f1] to-[#FFDFDF] text-black">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <img src={HotelLogo} alt="Hotel Blissful Logo" className="max-w-[80px] max-h-[80px] bg-transparent" />
            <span className="font-bold font-mono italic text-xl text-amber-800 hover:underline">Hotel Blissful</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <FontAwesomeIcon icon={faBars} className="text-2xl cursor-pointer" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex container justify-center gap-16">
            <Link to="/amenities" className="flex items-center gap-2 hover:scale-105">
              <FontAwesomeIcon icon={faBellConcierge} />
              <span>Amenities</span>
            </Link>
            <Link to="/services" className="flex items-center gap-2 hover:scale-105">
              <FontAwesomeIcon icon={faCircleInfo} />
              <span>Services & Info</span>
            </Link>
            <Link to="/reservations" className="flex items-center gap-2 hover:scale-105">
              <FontAwesomeIcon icon={faCalendarCheck} />
              <span>Reservations</span>
            </Link>
          </div>

          {/* User Account Section */}
          <div className="flex items-center gap-4">
            {user && (
              <p className="hidden md:block text-sm">Hi, {user.name}</p>
            )}
            <Link
              to={user ? '/account' : '/login'}
              className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-3 text-sm"
            >
              <FontAwesomeIcon icon={faUser} />
              <span>{user ? "Account" : "Login/Register"}</span>
            </Link>
          </div>
        </div>

        {/* Mobile Nav Links (Visible on smaller screens) */}
        <div className="flex md:hidden justify-center mt-4 gap-8">
          <Link to="/amenities" className="flex items-center gap-2 hover:scale-105">
            <FontAwesomeIcon icon={faBellConcierge} />
            <span>Amenities</span>
          </Link>
          <Link to="/services" className="flex items-center gap-2 hover:scale-105">
            <FontAwesomeIcon icon={faCircleInfo} />
            <span>Services</span>
          </Link>
          <Link to="/reservations" className="flex items-center gap-2 hover:scale-105">
            <FontAwesomeIcon icon={faCalendarCheck} />
            <span>Reservations</span>
          </Link>
        </div>
      </header>
    </div>
  );
}
