const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta inicial para verificar la API
app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API REST IUDigital funcionando correctamente",
    proyecto: "Tecnologias Web"
  });
});

module.exports = app;