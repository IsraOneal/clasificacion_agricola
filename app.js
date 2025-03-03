require("dotenv").config();
const express = require("express");
const productsRoutes = require("./routes/productsRoutes"); // Cambiar usersRoutes por productsRoutes
const cors = require("cors"); // CSRF

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRoutes); // Modificar la ruta para productos

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
