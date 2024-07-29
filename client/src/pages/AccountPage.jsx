import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../assets/components/AuthContext';
import { MDBInput, MDBBtn, MDBCard } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons';

export default function AccountPage() {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reservationId, setReservationId] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.email) {
      axios.get('/api/user', { params: { email: user.email } })
        .then(response => {
          setUserDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [user]);

  const handleUpdateUsername = () => {
    axios.post('/api/update-name', { email: user.email, newName: newUsername })
      .then(response => {
        alert('Username updated successfully');
        setUserDetails({ ...userDetails, name: newUsername });
      })
      .catch(error => {
        console.error('Error updating username:', error);
      });
  };

  const handleUpdateEmail = () => {
    axios.post('/api/update-email', { oldEmail: user.email, newEmail })
      .then(response => {
        alert('Email updated successfully');
        setUserDetails({ ...userDetails, email: newEmail });
      })
      .catch(error => {
        console.error('Error updating email:', error);
      });
  };

  const handleUpdatePassword = () => {
    axios.post('/api/update-password', { email: user.email, password: newPassword })
      .then(response => {
        alert('Password updated successfully');
      })
      .catch(error => {
        console.error('Error updating password:', error);
      });
  };

  const handleCancelReservation = () => {
    axios.post('/api/cancel-reservation', { reservationId })
      .then(response => {
        alert('Reservation cancelled successfully');
        setUserDetails({
          ...userDetails,
          reservations: userDetails.reservations.filter(id => id !== parseInt(reservationId))
        });
      })
      .catch(error => {
        console.error('Error cancelling reservation:', error);
      });
  };

  if (!user) {
    return (
      <MDBCard className="flex flex-col justify-center items-center p-4 mx-auto mt-40" style={{ maxWidth: '600px', height: '200px' }}>
        <p className="text-center mb-4">Please log in to view your account details.</p>
        <MDBBtn className="flex justify-center items-center p-2 
         text-white rounded-xl transition-all duration-500 bg-gradient-to-t to-white via-black from-green-300 bg-size-200 hover:bg-right-bottom cursor-pointer" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faXmarkSquare} className="fa-2x" />
        </MDBBtn>
      </MDBCard>
    );
  }
  

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 flex-col">
      <div className="container mx-auto p-8">
        <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Account Page</h2>
            <div>
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <p>Name: {userDetails.name}</p>
              <p>Phone: {userDetails.phone}</p>
              <p>Street: {userDetails.address.street_name}</p>
              <p>City: {userDetails.address.city}</p>
              <p>State: {userDetails.address.state}</p>
              <p>Postal Code: {userDetails.address.postal_code}</p>
              <p>Country: {userDetails.address.country}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Username</h3>
              <p>{userDetails.name}</p>
              <MDBInput label="New Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
              <MDBBtn onClick={handleUpdateUsername} className="mt-2">Update Username</MDBBtn>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Email</h3>
              <p>{userDetails.email}</p>
              <MDBInput label="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              <MDBBtn onClick={handleUpdateEmail} className="mt-2">Update Email</MDBBtn>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Change Password</h3>
              <MDBInput label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <MDBBtn onClick={handleUpdatePassword} className="mt-2">Update Password</MDBBtn>
            </div>
            {/* Add reservation list and cancel functionality if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
