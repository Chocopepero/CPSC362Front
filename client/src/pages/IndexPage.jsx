import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPerson, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { format, differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import img1 from "../images/Hotelpic1.jpeg";
import img2 from "../images/DeluxeRoom.webp";
import img3 from "../images/Hotelpic3.webp";

export default function IndexPage() {
    const navigate = useNavigate();

    const rooms = [
        {
            id: 1,
            name: 'Deluxe Room',
            description: 'A spacious room with a beautiful view of the city.',
            price: 200,
            imageUrl: img2,
            link: '/DeluxeRoom'
        },
        {
            id: 2,
            name: 'Standard Room',
            description: 'A comfortable room with all the basic amenities.',
            price: 100,
            imageUrl: img1,
            link: '/StandardRoom'
        },
        {
            id: 3,
            name: 'Suite',
            description: 'A luxurious suite with a separate living area.',
            price: 300,
            imageUrl: img3,
            link: '/SuiteRoom'
        }
    ];

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
        adult: 2,
        children: 0,
        room: 1,
    });
    const [openRoomType, setOpenRoomType] = useState(false);
    const [selectedRoomType, setSelectedRoomType] = useState("Select Room Type");

    const dateRangeRef = useRef(null);
    const optionsRef = useRef(null);
    const roomTypeRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
            setOpenDate(false);
        }
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setOpenOptions(false);
        }
        if (roomTypeRef.current && !roomTypeRef.current.contains(event.target)) {
            setOpenRoomType(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFindRooms = () => {
        const selectedRoom = rooms.find(room => room.name === selectedRoomType);

        if (!selectedRoom) {
            alert("Please select a room type.");
            return;
        }

        const nights = differenceInDays(date[0].endDate, date[0].startDate) || 1;
        const totalPrice = selectedRoom.price * nights * searchPref.room;

        navigate("/confirmation", {
            state: {
                RoomType: selectedRoomType,
                date,
                searchPref,
                totalPrice,
            },
        });
    };

    return (
        <section data-testid="homepage-booking-module-wrapper" className="p-4 max-w-screen-lg mx-auto">
            <div data-testid="homepage-booking-module-glow-container" className="bg-gradient-to-b from-blue-100 to-blue-200 h-2 rounded-md mb-4"></div>
            
            <div data-testid="homepage-booking-module-grid-container" className="bg-white p-6 rounded-lg shadow-md">
                <div data-testid="homepage-booking-module" className="flex flex-col md:flex-row items-center gap-4">

                    {/* Room Type Button */}
                    <div className="relative w-full md:w-1/4" ref={roomTypeRef}>
                        <button 
                            className="booking-module-field w-full px-4 py-3 rounded-md border border-gray-300 text-left text-lg cursor-pointer focus:outline-none flex justify-between items-center"
                            onClick={() => setOpenRoomType(!openRoomType)}
                            data-testid="homepage-booking-module-roomtype-selector-button"
                        >
                            <div>
                                <p className="text-gray-500">Room Type</p>
                                <span className="text-black font-medium">{selectedRoomType}</span>
                            </div>
                            <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
                        </button>

                        {openRoomType && (
                            <div className="absolute top-16 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-40">
                                {rooms.map((room) => (
                                    <button 
                                        key={room.id}
                                        onClick={() => {
                                            setSelectedRoomType(room.name);
                                            setOpenRoomType(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        {room.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block border-l border-gray-300 h-8"></div>

                    {/* Stay Dates Button */}
                    <div className="w-full md:w-1/4">
                        <button 
                            className="booking-module-field w-full px-4 py-3 rounded-md border border-gray-300 text-left text-lg cursor-pointer focus:outline-none"
                            name="Stay dates"
                            aria-label={`Stay dates: ${format(date[0].startDate, "MMM dd")} to ${format(date[0].endDate, "MMM dd")}`}
                            onClick={() => setOpenDate(!openDate)}
                            data-testid="homepage-booking-module-date-selector-button"
                        >
                            <p className="text-gray-500">Stay dates</p>
                            <span className="text-black font-medium">{`${format(date[0].startDate, "MMM dd")} - ${format(date[0].endDate, "MMM dd")}`}</span>
                        </button>

                        {openDate && (
                            <div ref={dateRangeRef} className="absolute top-24 z-40">
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

                    {/* Divider */}
                    <div className="hidden md:block border-l border-gray-300 h-8"></div>

                    {/* Guests Button */}
                    <div className="w-full md:w-1/4">
                        <button
                            className="booking-module-field w-full px-4 py-3 rounded-md border border-gray-300 text-left text-lg cursor-pointer focus:outline-none"
                            name="Guests"
                            onClick={() => setOpenOptions(!openOptions)}
                            data-testid="homepage-booking-module-guest-selector-button"
                        >
                            <p className="text-gray-500">Guests</p>
                            <span className="text-black font-medium">{`${searchPref.adult + searchPref.children} Guests`}</span>
                        </button>

                        {openOptions && (
                            <div ref={optionsRef} className="absolute top-24 z-40 bg-white p-4 shadow-lg rounded-md">
                                {['adult', 'children', 'room'].map((option, index) => (
                                    <div className="w-48 flex justify-between items-center my-2" key={index}>
                                        <span className="capitalize text-lg">{option}</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                disabled={searchPref[option] <= (option === 'adult' ? 1 : 0)}
                                                className="w-8 h-8 border border-solid border-blue-600 text-blue-600 rounded-lg cursor-pointer"
                                                onClick={() =>
                                                    setPreferenceSearch((prev) => ({
                                                        ...prev,
                                                        [option]: prev[option] - 1,
                                                    }))
                                                }
                                            >
                                                -
                                            </button>
                                            <span className="text-lg">{searchPref[option]}</span>
                                            <button
                                                className="w-8 h-8 border border-solid border-blue-600 text-blue-600 rounded-lg cursor-pointer"
                                                onClick={() =>
                                                    setPreferenceSearch((prev) => ({
                                                        ...prev,
                                                        [option]: prev[option] + 1,
                                                    }))
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Find Rooms Button */}
                    <div className="w-full md:w-auto flex-grow">
                        <button 
                            data-testid="homepage-booking-module-cta"
                            className="w-full px-6 py-3 mt-0 md:mt-0 bg-blue-600 text-white font-bold rounded-md cursor-pointer hover:bg-blue-700 focus:outline-none"
                            onClick={handleFindRooms}
                        >
                            Find rooms
                        </button>
                    </div>
                </div>
            </div>

            {/* Rooms Preview Section */}
            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold mb-4 px-4">Our Rooms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map(room => (
                        <div key={room.id} className="border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                            <img src={room.imageUrl} alt={room.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">{room.name}</h3>
                                <p className="mt-2 text-gray-600">{room.description}</p>
                                <p className="mt-2 font-bold">{`$${room.price} per night`}</p>
                                <Link to={room.link} className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                                    View More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
