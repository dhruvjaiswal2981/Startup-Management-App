import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css"

const Login = () => {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user)); 
      navigate('/dashboard');
    } catch (err) {
      alert("Login failed: " + err.response?.data?.error);
    }
  };

  return (
    <div className='login-container'>
        <h2 className='login-title'>Login</h2>
        <form className='login-form' onSubmit={handleSubmit}>
            <input
            className='login-input'
            name="identifier"
            type="text"
            placeholder="Email or Phone"
            onChange={handleChange}
            required
            />
            <input
            className='login-input'
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            />
            <button className='login-button' type="submit">Login</button>
            <p className='login-register-text'>
            Don't have an account? <Link to="/signup" className='login-register-link'>Register</Link>
            </p>
        </form>
        </div>

  );
};

export default Login;
