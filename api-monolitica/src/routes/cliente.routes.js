
const express = require("express");

const router = express.Router();

const {
  listarClientes,
  crearCliente,
  actualizarCliente
} = require("../controllers/cliente.controller");

router.get("/", listarClientes);

router.post("/", crearCliente);

router.put("/:id", actualizarCliente);

module.exports = router;
