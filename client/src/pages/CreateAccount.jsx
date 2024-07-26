import React, { useState } from 'react';
import axios from 'axios';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    axios.post('/api/createaccount', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        setError('An error occurred. Please try again.');
        console.error(error);
      });
  };

  return (
    <div className="create-account-container">
      <h2>Create account</h2>
      {error && <p className="error">{error}</p>}
      <form className="create-account-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="input-label">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
        /><br /><br />
        <label htmlFor="email" className="input-label">Your Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br /><br />
        <label htmlFor="password" className="input-label">Password</label>
        <input
          type="password"
          name="password"
          placeholder="At least 6 characters"
          value={formData.password}
          onChange={handleChange}
          required
        /><br /><br />
        <label htmlFor="password-confirmation" className="input-label">Re-enter Password</label>
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Re-enter"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Continue</button>
      </form>
      <hr className="form-divider" />
      <a href="/signin">
        <button className="create-account-button">Already have an account?</button>
      </a>
    </div>
  );
};

export default CreateAccount;
