
const express = require("express");

const router = express.Router();

const {
  listarUniversidades,
  crearUniversidad,
  actualizarUniversidad
} = require("../controllers/universidad.controller");

router.get("/", listarUniversidades);

router.post("/", crearUniversidad);

router.put("/:id", actualizarUniversidad);

module.exports = router;
