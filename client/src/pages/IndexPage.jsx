import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "../images/Hotelpic1.jpeg/"
import img2 from "../images/DeluxeRoom.webp/"
import img3 from "../images/Hotelpic3.webp/";

export default function IndexPage() {
    // room data
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
    return (
        <div className="container m-auto p-8">
            <h1 className="text-4xl font-bold mb-4">Welcome, Guest</h1>
            <p className="text-lg mb-8">Enjoy your luxurious stay and peaceful getaway at the Blissful Hotel</p>

            <h2 className="text-3xl font-bold mb-4">Our Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {rooms.map(room => (
                    <div key={room.id} className="border rounded-lg overflow-hidden shadow-lg hover:scale-105">
                        <img src={room.imageUrl} alt={room.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold">{room.name}</h3>
                            <p className="mt-2 text-gray-600">{room.description}</p>
                            <p className="mt-2 font-bold">{room.price}</p>
                            <Link to={room.link} className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                                View More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}