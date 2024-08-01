import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

axios.defaults.withCredentials = true;

export default function AdminPage() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('/api/admin/reservations');
      setReservations(response.data);
      setFilteredReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredReservations(reservations);
    } else {
      const filtered = reservations.filter(reservation =>
        reservation.name.toLowerCase().includes(query.toLowerCase()) ||
        reservation.phone.includes(query) ||
        reservation.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredReservations(filtered);
    }
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      await axios.post('/api/cancel-res-force', { reservationId });
      setReservations(prevReservations => prevReservations.filter(reservation => reservation._id !== reservationId));
      setFilteredReservations(prevFilteredReservations => prevFilteredReservations.filter(reservation => reservation._id !== reservationId));
      alert('Reservation cancelled successfully');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert('Failed to cancel reservation');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <MDBInput 
        label="Search Reservations" 
        value={searchQuery} 
        onChange={handleSearch} 
      />
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Room Type</th>
            <th>Arrival Date</th>
            <th>Departure Date</th>
            <th>Total Cost</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredReservations.map(reservation => (
            <tr key={reservation._id}>
              <td>{reservation.name}</td>
              <td>{reservation.email}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.roomType}</td>
              <td>{reservation.arrivalDate}</td>
              <td>{reservation.departureDate}</td>
              <td>{reservation.totalCost}</td>
              <td>
                <MDBBtn color="danger" size="sm" onClick={() => handleCancelReservation(reservation._id)}>
                  Cancel
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
