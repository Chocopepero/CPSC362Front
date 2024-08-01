import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../assets/components/AuthContext';
import {
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBSpinner,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCardText,
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons';

export default function AccountPage() {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
      .then(() => {
        alert('Username updated successfully');
        setUserDetails({ ...userDetails, name: newUsername });
      })
      .catch(error => {
        console.error('Error updating username:', error);
      });
  };

  const handleUpdateEmail = () => {
    axios.post('/api/update-email', { oldEmail: user.email, newEmail })
      .then(() => {
        alert('Email updated successfully');
        setUserDetails({ ...userDetails, email: newEmail });
      })
      .catch(error => {
        console.error('Error updating email:', error);
      });
  };

  const handleUpdatePassword = () => {
    axios.post('/api/update-password', { email: user.email, password: newPassword })
      .then(() => {
        alert('Password updated successfully');
      })
      .catch(error => {
        console.error('Error updating password:', error);
      });
  };

  const handleCancelReservation = (id) => {
    axios.post('/api/cancel-reservation', { reservationId: id, email: user.email })
      .then(() => {
        alert('Reservation cancelled successfully');
        setUserDetails({
          ...userDetails,
          reservations: userDetails.reservations.filter(reservation => reservation._id !== id)
        });
      })
      .catch(error => {
        console.error('Error cancelling reservation:', error);
      });
  };

  if (!user) {
    return (
      <MDBCard className="text-center mx-auto my-5" style={{ maxWidth: '600px' }}>
        <MDBCardBody>
          <p>Please log in to view your account details.</p>
          <MDBBtn color="primary" onClick={() => navigate('/login')}>
            <FontAwesomeIcon icon={faUser} /> Go to Login
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    );
  }

  if (!userDetails) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <MDBSpinner role="status">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    );
  }

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <Link to='/'>Home</Link>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <Link to="/login">User</Link>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Account Page</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4 text-xl">
              <MDBCardBody className="text-center">
                <MDBCardText>Name: {userDetails.name}</MDBCardText>
                <MDBCardText>Email: {userDetails.email}</MDBCardText>
                <MDBCardText>Phone: {userDetails.phone}</MDBCardText>
                <MDBCardText>Address: {`${userDetails.address.street_name}, ${userDetails.address.city}, ${userDetails.address.state}, ${userDetails.address.postal_code}, ${userDetails.address.country}`}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
            {userDetails.role === 'admin' && (
              <Link to="/admin">
                <MDBBtn color="info" className="w-100">Go to Admin Page</MDBBtn>
              </Link>
            )}
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput value={newUsername} onChange={(e) => setNewUsername(e.target.value)} label="New Username" />
                    <MDBBtn color="success" className="mt-2 my-2" onClick={handleUpdateUsername}>Update Username</MDBBtn>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput value={newEmail} onChange={(e) => setNewEmail(e.target.value)} 
                    className="my-2" label="New Email" />
                    <MDBBtn color="success" className="mt-2 my-2" onClick={handleUpdateEmail}>Update Email</MDBBtn>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Change Password</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} 
                    className="my-2" label="New Password" />
                    <MDBBtn color="success" className="my-2 my-2" onClick={handleUpdatePassword}>Update Password</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <MDBCard className="mb-4">
              <MDBCardBody>
                <h5 className="mb-4 text-2xl">Reservations</h5>
                {userDetails.reservations.map(reservation => (
                  <MDBCard key={reservation._id} className="mb-3">
                    <MDBCardBody>
                      <MDBCardText><strong>Reservation ID:</strong> {reservation._id}</MDBCardText>
                      <MDBCardText><strong>Name:</strong> {reservation.name}</MDBCardText>
                      <MDBCardText><strong>Phone:</strong> {reservation.phone}</MDBCardText>
                      <MDBCardText><strong>Number of Adults:</strong> {reservation.numAdults}</MDBCardText>
                      <MDBCardText><strong>Number of Children:</strong> {reservation.numChildren}</MDBCardText>
                      <MDBCardText><strong>Number of Rooms:</strong> {reservation.numberRooms}</MDBCardText>
                      <MDBCardText><strong>Room Type:</strong> {reservation.roomType}</MDBCardText>
                      <MDBCardText><strong>Arrival Date:</strong> {reservation.arrivalDate}</MDBCardText>
                      <MDBCardText><strong>Departure Date:</strong> {reservation.departureDate}</MDBCardText>
                      <MDBCardText><strong>Total Cost:</strong> {reservation.totalCost}</MDBCardText>
                      <MDBBtn color="danger" onClick={() => handleCancelReservation(reservation._id)}>
                        <FontAwesomeIcon icon={faTrashAlt} /> Cancel Reservation
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
