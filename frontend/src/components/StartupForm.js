import React, { useState, useEffect } from 'react';
import "./StartupForm.css"

const industries = ["IT services", "agriculture", "biotechnologies", "Design", "Fashion", "Green Technologies", "Marketing", "Others"];
const sectors = ["IT consultancy", "IT management", "IT services", "agri tech", "agriculture chemicals", "organic agriculture", "web design", "fashion technologies", "Others"];

const StartupForm = ({ token, onClose, existing }) => {
  const [form, setForm] = useState({
    name: '', incorporationDate: '', address: '', city: '', state: '',
    email: '', phone: '', founder: '', industry: '', sector: '', idea: ''
  });

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = existing
      ? `http://localhost:5000/api/startups/${existing.id}`
      : `http://localhost:5000/api/startups`;

    const method = existing ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    onClose();
  };

  return (
    <div className="startup-modal">
        <form className="startup-form-grid" onSubmit={handleSubmit}>
            <h3 className="startup-form-title">{existing ? 'Edit Startup' : 'Add Startup'}</h3>
            
            <input className="startup-input" name="name" placeholder="Startup Name" value={form.name} onChange={handleChange} required />
            <input className="startup-input" type="date" name="incorporationDate" value={form.incorporationDate} onChange={handleChange} />
            <input className="startup-input" name="address" placeholder="Startup Address" value={form.address} onChange={handleChange} />
            <input className="startup-input" name="city" placeholder="City" value={form.city} onChange={handleChange} />
            <input className="startup-input" name="state" placeholder="State" value={form.state} onChange={handleChange} />
            <input className="startup-input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input className="startup-input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            <input className="startup-input" name="founder" placeholder="Founder Name" value={form.founder} onChange={handleChange} />
            
            <select className="startup-select" name="industry" value={form.industry} onChange={handleChange}>
            <option value="">Select Industry</option>
            {industries.map(i => <option key={i}>{i}</option>)}
            </select>

            <select className="startup-select" name="sector" value={form.sector} onChange={handleChange}>
            <option value="">Select Sector</option>
            {sectors.map(s => <option key={s}>{s}</option>)}
            </select>

            <textarea className="startup-textarea" name="idea" placeholder="Business Idea" value={form.idea} onChange={handleChange}></textarea>
            
            <div className="startup-form-actions">
            <button className="startup-submit-btn" type="submit">Submit</button>
            <button className="startup-close-btn" type="button" onClick={onClose}>Close</button>
            </div>
        </form>
    </div>

  );
};

export default StartupForm;
