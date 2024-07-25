import deluxeRoomImage from '../images/Hotelpic1.jpeg'; // Adjust the path as necessary

import {Link} from "react-router-dom";




export default function DeluxeRoom() {
  

    return (
      
      <div>

     
            <header className="p-4 flex justify-between items-center bg-blue-500 text-white">
                <Link to="/" className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span className="font-bold text-white">Hotel Blissful</span>
                </Link>
                <nav className="flex gap-4">
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>



                </nav>
            </header>




        
      
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Deluxe Room</h2>
                    <img src={deluxeRoomImage} alt="Deluxe Room" className="room-image w-full h-64 object-cover rounded-lg mb-4" />
                    <p className="room-description text-gray-700 mb-4">A spacious room with a beautiful view of the city.</p>
                    <p className="room-price text-xl font-semibold text-blue-600 mb-4">$200 per night</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Book Now
                    </button>
                </div>
            </div>
        </div>

    );
}