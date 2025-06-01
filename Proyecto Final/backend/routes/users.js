const express = require("express");
const db = require("../db");
const router = express.Router();


// GET todos los usuarios
router.get("/", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST nuevo usuario
router.post("/", (req, res) => {
  const { name, email, password, phone, nickname } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nombre y correo son requeridos" });
  }

  db.run(
    "INSERT INTO users (name, email, password, phone, nickname) VALUES (?, ?, ?, ?, ?)",
    [name, email, password, phone, nickname],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, email, phone, nickname });
    }
  );
});

module.exports = router;