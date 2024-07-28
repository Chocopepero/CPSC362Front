import React, { useEffect, useState, useContext } from 'react';
import AuthContext from './AuthContext.jsx';

const Authenticate = ({ email }) => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user?email=${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email, setUser]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data</p>;

  return (
    <div>
      <p>Welcome, {user.name}</p>
    </div>
  );
};

export default Authenticate;
