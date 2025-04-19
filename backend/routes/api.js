const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const SECRET = "secretkey";

// SIGNUP
router.post('/signup', async (req, res) => {
  const { email, phone, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.run(`INSERT INTO users (email, phone, password) VALUES (?, ?, ?)`,
    [email, phone, hashed], err => {
      if (err) return res.status(400).json({ error: "User already exists" });
      res.json({ success: true });
    });
});

// LOGIN
router.post('/login', (req, res) => {
  const { identifier, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ? OR phone = ?`, [identifier, identifier], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '2h' });
    
    res.json({
        token,
        user: {
          email: user.email,
          phone: user.phone,
        },
      });
  });
});

// MIDDLEWARE
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
}

// CRUD APIs
router.get('/startups', verifyToken, (req, res) => {
  db.all(`SELECT * FROM startups WHERE userId = ?`, [req.userId], (err, rows) => {
    res.json(rows);
  });
});

router.post('/startups', verifyToken, (req, res) => {
  const s = req.body;
  db.run(`INSERT INTO startups (name, incorporationDate, address, city, state, email, phone, founder, industry, sector, idea, userId)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [s.name, s.incorporationDate, s.address, s.city, s.state, s.email, s.phone, s.founder, s.industry, s.sector, s.idea, req.userId],
    err => res.json({ success: !err }));
});

router.put('/startups/:id', verifyToken, (req, res) => {
  const s = req.body;
  db.run(`UPDATE startups SET name=?, incorporationDate=?, address=?, city=?, state=?, email=?, phone=?, founder=?, industry=?, sector=?, idea=? WHERE id=? AND userId=?`,
    [s.name, s.incorporationDate, s.address, s.city, s.state, s.email, s.phone, s.founder, s.industry, s.sector, s.idea, req.params.id, req.userId],
    err => res.json({ success: !err }));
});

router.delete('/startups/:id', verifyToken, (req, res) => {
  db.run(`DELETE FROM startups WHERE id=? AND userId=?`, [req.params.id, req.userId],
    err => res.json({ success: !err }));
});

module.exports = router;
