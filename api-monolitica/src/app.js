
const express = require("express");
const cors = require("cors");

const tipoProyectoRoutes = require("./routes/tipoProyecto.routes");
const clienteRoutes = require("./routes/cliente.routes");
const universidadRoutes = require("./routes/universidad.routes");
const etapaRoutes = require("./routes/etapa.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API REST IUDigital funcionando correctamente",
    proyecto: "Tecnologias Web"
  });
});

// Rutas de los módulos
app.use("/api/tipos-proyecto", tipoProyectoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/universidades", universidadRoutes);
app.use("/api/etapas", etapaRoutes);

module.exports = app;
