import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../assets/components/AuthContext';
import { MDBInput, MDBBtn, MDBCard } from 'mdb-react-ui-kit';

export default function AccountPage() {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reservationId, setReservationId] = useState('');
  const userID = user._id;
  const email = user.email;

  console.log("Email passed was?", email); // Debug statement

  useEffect(() => {
    console.log('Email from state:', email);  // Debugging statement
    if (email) {
      axios.get('/api/user', { params: { email } })
        .then(response => {
          console.log('User details fetched:', response.data);  // Debugging statement
          setUserDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    } else {
      console.error('Email not found from user from AuthContext');
    }
  }, [email]);

  const handleUpdateUsername = () => {
    axios.post('/api/update-name', { email, newName: newUsername })
      .then(response => {
        alert('Username updated successfully');
        setUserDetails({ ...userDetails, name: newUsername });
      })
      .catch(error => {
        console.error('Error updating username:', error);
      });
  };

  const handleUpdateEmail = () => {
    axios.post('/api/update-email', { oldEmail: email, newEmail })
      .then(response => {
        alert('Email updated successfully');
        setUserDetails({ ...userDetails, email: newEmail });
      })
      .catch(error => {
        console.error('Error updating email:', error);
      });
  };

  const handleUpdatePassword = () => {
    axios.post('/api/update-password', { email, password: newPassword })
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
    return <MDBCard className='flex flex-col items-center'>Please log in to view your account details.</MDBCard>;
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
