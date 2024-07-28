import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from './assets/components/AuthContext';
import HotelLogo from "./images/HotelLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket, faBars, faBellConcierge, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./index.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <header className="p-4 flex-col bg-gradient-to-t from-[#f6f1f1] to-[#FFDFDF] text-black">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-1">
            <img src={HotelLogo} alt="Hotel Blissful Logo" className="max-w-[100px] max-h-[100px] bg-transparent hover:scale-125 ease-in-out" />
            <span className="font-bold font-mono italic text-2xl text-amber-800 hover:underline">Hotel Blissful</span>
          </Link>
          <div className="container m-auto">
            <div className="flex text-lg justify-center text-center gap-40">
              <Link to="/amenities" className="flex box-border items-center gap-10 pt-1 hover:scale-110 active:border-white">
                <FontAwesomeIcon icon={faBellConcierge} />
                <p className="pt-2">Amenities</p>
              </Link>
              <Link to="/services" className="flex box-border items-center gap-10 hover:scale-110 active:border-white">
                <FontAwesomeIcon icon={faCircleInfo} />
                <span>Services & Info</span>
              </Link>
              <Link to="/reservations" className="flex box-border items-center gap-10 hover:scale-110 active:border-white">
                <FontAwesomeIcon icon={faCalendarCheck} />
                <span>Find Your Reservation</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {user ? (
              <>
                <p className="text-center mb-2">Hi, {user.name}</p>
                <div className="flex gap-4">
                  <Link to={{ pathname: '/account', state: { email: user.email } }} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
                    <div className="flex flex-col items-center bg-gray-500 text-white rounded-full border border-gray-500 p-1 overflow-hidden">
                      <FontAwesomeIcon icon={faBars} />
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-xs pt-3">Account</p>
                      <p className="text-xs pt-3">{user.email}</p>
                    </div>
                  </Link>
                  <button onClick={logout} className="flex items-center gap-2 border border-gray-300 rounded-full bg-transparent py-2 px-4">
                    <div className="flex flex-col items-center bg-gray-500 text-white rounded-full border border-gray-500 p-1 overflow-hidden">
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-xs pt-3">Logout</p>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <Link to='/login' className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
                <div className="flex flex-col items-center bg-gray-500 text-white rounded-full border border-gray-500 p-1 overflow-hidden">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xs pt-3">Login/Register</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
