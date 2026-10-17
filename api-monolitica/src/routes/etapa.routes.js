
const express = require("express");

const router = express.Router();

const {
  listarEtapas,
  crearEtapa,
  actualizarEtapa
} = require("../controllers/etapa.controller");

router.get("/", listarEtapas);

router.post("/", crearEtapa);

router.put("/:id", actualizarEtapa);

module.exports = router;
