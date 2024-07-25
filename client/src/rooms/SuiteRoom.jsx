import SuiteImg1 from '../images/SuiteRoom.webp'; 
import SuiteImg2 from '../images/SuiteRoom2.webp'; 
import SuiteImg3 from '../images/SuiteRoom3.webp';
import SuiteImg4 from '../images/SuiteRoom4.webp';
import SuiteImg5 from '../images/SuiteRoom5.webp';

import { Link } from "react-router-dom";

export default function SuiteRoom() {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 flex">
                <div className="w-1/2 pr-4">
                    <div className="grid grid-cols-2 gap-4">
                        <img src={SuiteImg1} alt="Suite Room" className="w-full h-32 object-cover rounded-lg" />
                        <img src={SuiteImg2} alt="Suite Room" className="w-full h-32 object-cover rounded-lg" />
                        <img src={SuiteImg3} alt="Suite Room" className="w-full h-32 object-cover rounded-lg" />
                     
                        <img src={SuiteImg5} alt="Suite Room" className="w-full h-32 object-cover rounded-lg" />
                    </div>
                </div>
                <div className="w-1/2 pl-4 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-center">Suite Room</h2>
                        <p className="room-description text-gray-700 mb-4">A spacious room with a view that is out of this world.</p>
                        <div className="flex items-start justify-start mb-4 flex-col space-y-4">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <span className="ml-2">2 Rooms</span>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                                </svg>
                                <span className="ml-2">Free WiFi</span>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                                <span className="ml-2">Free cancellation two weeks prior</span>
                            </div>
                        </div>
                        <p className="room-price text-xl font-semibold text-blue-600 mb-4">$300 per night</p>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
