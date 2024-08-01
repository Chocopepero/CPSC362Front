import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const [detailedUser, setDetailedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get('/api/user', { params: { email: user.email } });
          setDetailedUser(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or any loading indicator
  }

  if (!detailedUser) {
    return <Navigate to="/login" replace />;
  }

  console.log('Detailed user in ProtectedRoute:', detailedUser);

  if (allowedRoles && !allowedRoles.includes(detailedUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
