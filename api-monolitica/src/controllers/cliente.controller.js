
const mongoose = require("mongoose");
const Cliente = require("../models/cliente.model");

// GET - Consultar todos los clientes
const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({
      nombre: 1
    });

    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar los clientes",
      error: error.message
    });
  }
};

// POST - Registrar un cliente
const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente({
      nombre: req.body.nombre,
      email: req.body.email
    });

    const clienteGuardado = await nuevoCliente.save();

    res.status(201).json({
      mensaje: "Cliente creado correctamente",
      cliente: clienteGuardado
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos",
        error: error.message
      });
    }

    res.status(500).json({
      mensaje: "Error al crear el cliente",
      error: error.message
    });
  }
};

// PUT - Actualizar un cliente
const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "El identificador del cliente no es válido"
      });
    }

    const datosActualizados = {};

    if (req.body.nombre !== undefined) {
      datosActualizados.nombre = req.body.nombre;
    }

    if (req.body.email !== undefined) {
      datosActualizados.email = req.body.email;
    }

    const clienteActualizado =
      await Cliente.findByIdAndUpdate(
        id,
        { $set: datosActualizados },
        {
          new: true,
          runValidators: true
        }
      );

    if (!clienteActualizado) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Cliente actualizado correctamente",
      cliente: clienteActualizado
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos",
        error: error.message
      });
    }

    res.status(500).json({
      mensaje: "Error al actualizar el cliente",
      error: error.message
    });
  }
};

module.exports = {
  listarClientes,
  crearCliente,
  actualizarCliente
};
