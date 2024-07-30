import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import img1 from "../images/Hotelpic1.jpeg";
import img2 from "../images/DeluxeRoom.webp";
import img3 from "../images/Hotelpic3.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faBed, faCircleXmark, faPerson } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Select from 'react-select';
import AuthContext from '../assets/components/AuthContext';

export default function IndexPage() {
    const { user } = useContext(AuthContext);
    const rooms = [
        {
            id: 1,
            name: 'Deluxe Room',
            description: 'A spacious room with a beautiful view of the city.',
            price: '$200 per night',
            imageUrl: img2,
            link: '/DeluxeRoom'
        },
        {
            id: 2,
            name: 'Standard Room',
            description: 'A comfortable room with all the basic amenities.',
            price: '$100 per night',
            imageUrl: img1,
            link: '/StandardRoom'
        },
        {
            id: 3,
            name: 'Suite',
            description: 'A luxurious suite with a separate living area.',
            price: '$300 per night',
            imageUrl: img3,
            link: '/SuiteRoom'
        }
    ];

    const options = rooms.map(room => ({
        value: room.id,
        label: room.name,
    }));

    const [RoomType, setRoomType] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [searchPref, setPreferenceSearch] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;
    const [showMessage, setShowMessage] = useState(true);

    const dateRangeRef = useRef(null);
    const optionsRef = useRef(null);

    const handleOption = (name, operation) => {
        setPreferenceSearch((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? searchPref[name] + 1 : searchPref[name] - 1,
            };
        });
    };

    const handleSearch = () => {
        navigate("/confirmation", { state: { RoomType, date, searchPref } });
    };

    const handleClickOutside = (event) => {
        if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
            setOpenDate(false);
        }
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setOpenOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="p-4 flex-col">
            {message && showMessage && (
                <div className="container mx-auto p-8">
                    <div className="max-w-md mx-auto p-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <button
                            onClick={() => setShowMessage(false)}
                            className="absolute top-0 right-0 px-4 py-3"
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <span className="block sm:inline">{message}</span>
                    </div>
                </div>
            )}
            <div className="reserve_bar flex justify-center mb-5">
                <div className="container max-w-4xl bg-white border-3 border-solid border-x-blue-700 border-y-blue-400 flex items-center justify-between px-0 py-2 mx-auto rounded-2xl">
                    <div className="flex items-center gap-2 text-xs">
                        <FontAwesomeIcon icon={faBed} className="text-gray-400 pl-2" />
                        <Select
                            options={options}
                            onChange={(selectedOption) => setRoomType(selectedOption ? selectedOption.label : "")}
                            isSearchable
                            isClearable
                            placeholder="Pick a room :)"
                            classNamePrefix="react-select"
                            className="w-48"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendarDays} className="text-gray-400" />
                        <span
                            onClick={() => setOpenDate(!openDate)}
                            className="text-gray-400 cursor-pointer"
                        >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                        {openDate && (
                            <div ref={dateRangeRef} className="absolute top-40 z-40">
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className="date"
                                    minDate={new Date()}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faPerson} className="text-gray-400" />
                        <span
                            onClick={() => setOpenOptions(!openOptions)}
                            className="text-gray-400 cursor-pointer"
                        >{`${searchPref.adult} adult · ${searchPref.children} children · ${searchPref.room} room`}</span>
                        {openOptions && (
                            <div ref={optionsRef} className="absolute top-40 z-40 bg-white text-gray-400 rounded-lg shadow-lg p-2">
                                <div className="flex justify-between m-2">
                                    <span className="optionText">Adult</span>
                                    <div className="flex items-center gap-2 text-black">
                                        <button
                                            disabled={searchPref.adult <= 1}
                                            className="w-8 h-8 border border-solid border-blue-500 text-blue-500 shadow-lg rounded-full cursor-pointer bg-white"
                                            onClick={() => handleOption("adult", "d")}
                                        >
                                            -
                                        </button>
                                        <span className="optionCounterNumber">{searchPref.adult}</span>
                                        <button
                                            className="w-8 h-8 border border-solid border-blue-500 text-blue-500 shadow-lg rounded-full cursor-pointer bg-white"
                                            onClick={() => handleOption("adult", "i")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between m-2">
                                    <span className="optionText">Children</span>
                                    <div className="flex items-center gap-2 text-black">
                                        <button
                                            disabled={searchPref.children <= 0}
                                            className="w-8 h-8 border border-solid border-blue-500 text-blue-500 shadow-lg rounded-full cursor-pointer bg-white"
                                            onClick={() => handleOption("children", "d")}
                                        >
                                            -
                                        </button>
                                        <span className="optionCounterNumber">{searchPref.children}</span>
                                        <button
                                            className="w-8 h-8 border border-solid border-blue-500 text-blue-500 shadow-lg rounded-full cursor-pointer bg-white"
                                            onClick={() => handleOption("children", "i")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between m-2">
                                    <span className="optionText">Room</span>
                                    <div className="flex items-center gap-2 text-black">
                                        <button
                                            disabled={searchPref.room <= 1}
                                            className="w-8 h-8 border border-solid border-blue-500 text-blue-500 shadow-lg rounded-full cursor-pointer bg-white"
                                            onClick={() => handleOption("room", "d")}
                                        >
                                            -
                                        </button>
                                        <span className="optionCounterNumber">{searchPref.room}</span>
                                        <button
                                            className="w-8 h-8 border border-solid border-blue-500 text-blue-500 shadow-lg rounded-full cursor-pointer bg-white"
                                            onClick={() => handleOption("room", "i")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2 pr-2">
                        <button className="bg-blue-500 text-white py-2 px-5 border-white cursor-pointer hover:bg-cyan-700 rounded-full" onClick={handleSearch}>
                            Reserve Room
                        </button>
                    </div>
                </div>
            </div>

            <div className="container m-auto p-8">
                <h1 className="text-4xl font-bold mb-4 px-20">Welcome, {user ? user.name : "Guest"}</h1>
                <p className="text-lg mb-8 px-20">Enjoy your luxurious stay and peaceful getaway at the Blissful Hotel</p>

                <h2 className="text-3xl font-bold justify-between mb-4 px-20">Our Rooms</h2>
                <div className="w-full px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-stretch">
                        {rooms.map(room => (
                            <div key={room.id} className="border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                                <img src={room.imageUrl} alt={room.name} className="w-full h-48 object-cover" />
                                <div className="p-4 gap-4">
                                    <h3 className="text-xl font-bold">{room.name}</h3>
                                    <p className="mt-2 text-gray-600">{room.description}</p>
                                    <p className="mt-2 font-bold">{room.price}</p>
                                    <Link to={room.link} className="relative bottom-0 left-0 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                                        View More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
