import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function FetchReservation() {
  const [reservationID, setReservationID] = useState('');
  const [fullName, setFullName] = useState('');
  const [reservationDetails, setReservationDetails] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async (e) => {
    e.preventDefault();
    // Reset previous error and details
    setError('');
    setReservationDetails(null);

    // Simulate API call
    try {
      // Mock API response
      const reservationInq = {
        id: reservationID,
        name: fullName,
        roomNumber: 101,
        checkIn: '2024-08-01',
        checkOut: '2024-08-05'
      };

      if (reservationID === '12345' && fullName === 'John Doe') {
        setReservationDetails(reservationInq);
      } else {
        setError('Reservation not found. Please check your details.');
      }
    } catch (err) {
      setError('An error occurred while fetching the reservation details.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100 p-8">
      <header className="bg-blue-800 text-white p-4 text-center rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-4xl font-bold">Blissful Hotel Reservation</h1>
      </header>
      <main className="mt-8 bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Find Reservation Details</h2>
        <form onSubmit={handleFetch} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="reservationID" className="text-gray-700 font-medium">Reservation ID</label>
            <input
              type="text"
              id="reservationID"
              value={reservationID}
              onChange={(e) => setReservationID(e.target.value)}
              required
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your reservation ID"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <button type="submit" className="flex items-center justify-center font-bold bg-green-500 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 w-full">
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            Find My Reservation
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {reservationDetails && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Reservation Details</h3>
            <p><strong>ID:</strong> {reservationDetails.id}</p>
            <p><strong>Name:</strong> {reservationDetails.name}</p>
            <p><strong>Room Number:</strong> {reservationDetails.roomNumber}</p>
            <p><strong>Check-In:</strong> {reservationDetails.checkIn}</p>
            <p><strong>Check-Out:</strong> {reservationDetails.checkOut}</p>
          </div>
        )}
      </main>
    </div>
  );
}
