const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./backend/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. GET /api/clubs -> List all records
app.get('/api/clubs', (req, res) => {
    const query = `SELECT * FROM clubs`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// 2. GET /api/clubs/:id -> Get one record by ID
app.get('/api/clubs/:id', (req, res) => {
    const query = `SELECT * FROM clubs WHERE id = ?`;
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.json({
            message: "success",
            data: row
        });
    });
});

// 3. POST /api/clubs -> Create a record
app.post('/api/clubs', (req, res) => {
    const { name, description, category, president_name, member_count, meeting_day } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Club name is required" });
    }

    const query = `INSERT INTO clubs (name, description, category, president_name, member_count, meeting_day) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [name, description, category, president_name, member_count, meeting_day];

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "success",
            data: { id: this.lastID, ...req.body }
        });
    });
});

// 4. PUT /api/clubs/:id -> Update a record
app.put('/api/clubs/:id', (req, res) => {
    const { name, description, category, president_name, member_count, meeting_day } = req.body;
    const query = `UPDATE clubs SET name = COALESCE(?, name), description = COALESCE(?, description), category = COALESCE(?, category), president_name = COALESCE(?, president_name), member_count = COALESCE(?, member_count), meeting_day = COALESCE(?, meeting_day), updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    const params = [name, description, category, president_name, member_count, meeting_day, req.params.id];

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.json({
            message: "success",
            data: { id: req.params.id, ...req.body }
        });
    });
});

// 5. DELETE /api/clubs/:id -> Delete a record
app.delete('/api/clubs/:id', (req, res) => {
    const query = `DELETE FROM clubs WHERE id = ?`;
    db.run(query, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.json({ message: "deleted", changes: this.changes });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});