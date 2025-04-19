import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./Signup.css"

const Signup = () => {
  const [form, setForm] = useState({
    email: '', phone: '', password: '', confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords don't match!");

    try {
      await axios.post('http://localhost:5000/api/signup', form);
      alert("Signup successful!");
      navigate('/');
    } catch (err) {
      alert("Signup failed: " + err.response?.data?.error);
    }
  };

  return (
    <div className='signup-container'>
        <h2 className='signup-title'>Sign Up</h2>
        <form className='signup-form' onSubmit={handleSubmit}>
            <input
            className='signup-input'
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            />
            <input
            className='signup-input'
            name="phone"
            type="text"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            />
            <input
            className='signup-input'
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            />
            <input
            className='signup-input'
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            />
            <button className='signup-button' type="submit">Register</button>
            <p className='signup-login-text'>
            Already have an account? <Link to="/" className='signup-login-link'>Login</Link>
            </p>
        </form>
        </div>

  );
};

export default Signup;
