const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// MySQL connection
const db = mysql.createConnection({
    host: 'Jhonas', // Your MySQL host
    user: 'root', // Your MySQL username
    password: 'Jhonas_963258', // Your MySQL password
    database: 'your_database_name' // Your MySQL database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected');
});

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// Get all books
app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching books' });
        }
        res.json(results);
    });
});

// Add a new book
app.post('/api/books', (req, res) => {
    const { title, author } = req.body;
    db.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (err, results) => {
        if (err) {
            return res.status(400).json({ message: 'Error adding book' });
        }
        res.status(201).json({ id: results.insertId, title, author });
    });
});

// Update a book
app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    db.query('UPDATE books SET title = ?, author = ? WHERE id = ?', [title, author, id], (err, results) => {
        if (err) {
            return res.status(400).json({ message: 'Error updating book' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Book not found');
        }
        res.json({ id, title, author });
    });
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM books WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting book' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Book not found');
        }
        res.status(204).send();
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});