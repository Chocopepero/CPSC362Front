import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/authenticate');
        if (response.data.loggedIn) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error checking authentication', error);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.status === 200) {
        setUser(response.data);
        return response.data; // Return user data on successful login
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('/api/logout');
      if (response.status === 200) {
        setUser(null);
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
