
const express = require("express");

const router = express.Router();

const {
  listarTiposProyecto,
  crearTipoProyecto,
  actualizarTipoProyecto
} = require("../controllers/tipoProyecto.controller");

router.get("/", listarTiposProyecto);

router.post("/", crearTipoProyecto);

router.put("/:id", actualizarTipoProyecto);

module.exports = router;
