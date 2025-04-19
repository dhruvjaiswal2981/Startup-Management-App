import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StartupForm from './StartupForm';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";

const Dashboard = () => {
  const [startups, setStartups] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userEmail = user?.email || "User Email";




  const fetchStartups = async () => {
    if (!token) {
      navigate('/');
      return;
    }
    try {
      const res = await axios.get('http://localhost:5000/api/startups', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStartups(res.data);
    } catch (error) {
      console.error('Error fetching startups:', error);
      if (error.response?.status === 401) {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetchStartups();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/startups/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStartups();
    } catch (error) {
      console.error('Error deleting startup:', error);
    }
  };

  const handleEdit = (startup) => {
    setSelectedStartup(startup);
    setShowPopup(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const filteredStartups = startups.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='dashboard-container'>
        {/* Top Header */}
        <div className="dashboard-header">
            <div className="logo">Logo</div>
            <div className='user'>User :- <span className='user-profile'>{userEmail}</span></div>
        </div>

        {/* Search and Add Section */}
        <div className='dashboard-actions'>
            <div className="search-container">
            <input
                type="text"
                placeholder="Search Start-Up Name..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">
                <svg viewBox="0 0 24 24" fill="currentColor" className="search-icon">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
            </button>
            </div>
            <div className="action-buttons">
            <button
                className='dashboard-button add-button'
                onClick={() => {
                setShowPopup(true);
                setSelectedStartup(null);
                }}
            >
                + Add Start-Up
            </button>
            <button className='dashboard-button logout-button' onClick={handleLogout}>
                Logout
            </button>
            </div>
        </div>

        {/* Popup for Form */}
        {showPopup && (
            <div className="popup-overlay">
            <StartupForm
                token={token}
                onClose={() => {
                setShowPopup(false);
                fetchStartups();
                }}
                existing={selectedStartup}
            />
            </div>
        )}

        {/* Content Display */}
        <div className='dashboard-content'>
            <h1 className="content-title">Start-Up List</h1>
            {filteredStartups.length === 0 ? (
            <div className="no-data-container">
                <span className="sad-face">☹️</span>
                <p className="no-data-text">No Data Found.</p>
            </div>
            ) : (
            <div className="table-responsive">
                <table className='data-table'>
                <tbody>
                    {filteredStartups.map(s => (
                    <tr key={s.id}>
                        <td data-label="Startup Name">{s.name}</td>
                        <td data-label="City">{s.city}</td>
                        <td data-label="State">{s.state}</td>
                        <td data-label="Email">{s.email}</td>
                        <td data-label="Phone">{s.phone}</td>
                        <td data-label="Founder">{s.founder}</td>
                        <td data-label="Actions" className='table-actions'>
                        <button className='action-button edit-button' onClick={() => handleEdit(s)}>
                            Edit
                        </button>
                        <button className='action-button delete-button' onClick={() => handleDelete(s.id)}>
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
  );
};

export default Dashboard;
