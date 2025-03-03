const express = require("express");
const router = express.Router();

// Ejemplo de una ruta
router.get("/", (req, res) => {
  res.send("Lista de productos");
});

module.exports = router;
