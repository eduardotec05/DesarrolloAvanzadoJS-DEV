const express = require('express');
const db = require("../db");
const router = express.Router();

/* Crear un todo */
router.post('/', (req, res) => {
    const { task, dueDate } = req.body;
    if (!task || !dueDate)
        return res.status(400).json({ error: 'Faltan datos obligatorios' });

    db.run(`INSERT INTO todos (task, dueDate) VALUES (?, ?)`,
        [task, dueDate],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, task, dueDate, done: 0 });
        }
    );
});

/* Obtener todos los todos */
router.get('/', (req, res) => {
    db.all(`SELECT * FROM todos`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

/* Obtener un todo por ID */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM todos WHERE id = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(row);
    });
});

/* Editar un todo por ID */
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { task, dueDate, done } = req.body;
    if (!task || !dueDate || typeof done !== "number")
        return res.status(400).json({ error: 'Faltan datos o tipo incorrecto' });

    db.run(`UPDATE todos SET task = ?, dueDate = ?, done = ? WHERE id = ?`,
        [task, dueDate, done, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0)
                return res.status(404).json({ error: 'Tarea no encontrada' });
            res.json({ message: 'Tarea actualizada' });
        });
});

/* Marcar como completado */
router.patch('/:id/done', (req, res) => {
    const id = req.params.id;
    db.run(`UPDATE todos SET done = 1 WHERE id = ?`,
        [id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0)
                return res.status(404).json({ error: 'Tarea no encontrada' });
            res.json({ message: 'Tarea marcada como completada' });
        });
});

/* Eliminar un todo */
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM todos WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0)
            return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json({ message: 'Tarea eliminada' });
    });
});

module.exports = router;
