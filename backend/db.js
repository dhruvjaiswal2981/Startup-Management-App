const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./startups.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    phone TEXT,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS startups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    incorporationDate TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    email TEXT,
    phone TEXT,
    founder TEXT,
    industry TEXT,
    sector TEXT,
    idea TEXT,
    userId INTEGER
  )`);
});

module.exports = db;
