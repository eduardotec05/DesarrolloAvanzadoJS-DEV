const express = require("express");
const cors = require("cors");

const users = require("./routes/users");
const todos = require("./routes/todos");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", users); // ← Usamos /api/users (plural y consistente)
app.use("/api/todos", todos);

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
