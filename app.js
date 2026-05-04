const express = require('express');
const Database = require('better-sqlite3');

const app = express();
app.use(express.json());

const db = new Database('contacts.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT
  )
`);

// Seed 10 sample entries
const count = db.prepare('SELECT COUNT(*) as count FROM contacts').get();
if (count.count === 0) {
  const insert = db.prepare('INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)');
  const samples = [
    ['Alice Johnson', 'alice@example.com', '555-0101'],
    ['Bob Smith', 'bob@example.com', '555-0102'],
    ['Carol White', 'carol@example.com', '555-0103'],
    ['David Brown', 'david@example.com', '555-0104'],
    ['Eva Davis', 'eva@example.com', '555-0105'],
    ['Frank Miller', 'frank@example.com', '555-0106'],
    ['Grace Wilson', 'grace@example.com', '555-0107'],
    ['Henry Moore', 'henry@example.com', '555-0108'],
    ['Isla Taylor', 'isla@example.com', '555-0109'],
    ['Jack Anderson', 'jack@example.com', '555-0110'],
  ];
  samples.forEach(s => insert.run(...s));
}

// CRUD routes
app.get('/contacts', (req, res) => {
  res.json(db.prepare('SELECT * FROM contacts').all());
});

app.get('/contacts/:id', (req, res) => {
  const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(req.params.id);
  contact ? res.json(contact) : res.status(404).json({ error: 'Not found' });
});

app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;
  const result = db.prepare('INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)').run(name, email, phone);
  res.status(201).json({ id: result.lastInsertRowid });
});

app.put('/contacts/:id', (req, res) => {
  const { name, email, phone } = req.body;
  db.prepare('UPDATE contacts SET name=?, email=?, phone=? WHERE id=?').run(name, email, phone, req.params.id);
  res.json({ updated: true });
});

app.delete('/contacts/:id', (req, res) => {
  db.prepare('DELETE FROM contacts WHERE id=?').run(req.params.id);
  res.json({ deleted: true });
});

module.exports = app;
