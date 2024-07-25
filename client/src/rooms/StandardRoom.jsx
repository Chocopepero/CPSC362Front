import standardRoomImage from '../images/Hotelpic1.jpeg/'
import ReactCalendar from 'react-calendar';

export default function StandardRoom(){
    return (
        <div className="Standard Room">
            {/* <h2>Standard Room</h2>
            <img src={standardRoomImage} alt="Standard Room" className="room-image" />
            <p className="room-description"> A comfortable room with all the basic amenities.</p>
            <p className="room-price">$100 per night</p> */}
            <div className="max-w-4xl mx-auto p-6 flex">
                <div className="bg-white shadow-lg rounded-lg p-6 w-3/4">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Standard Room</h2>
                    <img src={standardRoomImage} alt="Deluxe Room" className="room-image w-full h-64 object-cover rounded-lg mb-4" />
                    <p className="room-description text-gray-700 mb-4">A comfortable room with all the basic amenities.</p>
                    <p className="room-price text-xl font-semibold text-blue-600 mb-4">$100 per night</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Book Now
                    </button>
                </div>
                <div className="w-1/4 ml-4">
                    <ReactCalendar />
                </div>
            </div>
        </div>
    );
}
