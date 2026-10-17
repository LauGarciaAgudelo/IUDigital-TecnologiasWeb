
const mongoose = require("mongoose");
const Universidad = require("../models/universidad.model");

// GET - Listar universidades
const listarUniversidades = async (req, res) => {
  try {
    const universidades = await Universidad.find().sort({
      nombre: 1
    });

    res.status(200).json(universidades);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar las universidades",
      error: error.message
    });
  }
};

// POST - Crear universidad
const crearUniversidad = async (req, res) => {
  try {
    const nuevaUniversidad = new Universidad({
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      telefono: req.body.telefono
    });

    const universidadGuardada = await nuevaUniversidad.save();

    res.status(201).json({
      mensaje: "Universidad creada correctamente",
      universidad: universidadGuardada
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos",
        error: error.message
      });
    }

    res.status(500).json({
      mensaje: "Error al crear la universidad",
      error: error.message
    });
  }
};

// PUT - Actualizar universidad
const actualizarUniversidad = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "El identificador no es válido"
      });
    }

    const datosActualizados = {};

    ["nombre", "direccion", "telefono"].forEach((campo) => {
      if (req.body[campo] !== undefined) {
        datosActualizados[campo] = req.body[campo];
      }
    });

    const universidadActualizada =
      await Universidad.findByIdAndUpdate(
        id,
        { $set: datosActualizados },
        {
          new: true,
          runValidators: true
        }
      );

    if (!universidadActualizada) {
      return res.status(404).json({
        mensaje: "Universidad no encontrada"
      });
    }

    res.status(200).json({
      mensaje: "Universidad actualizada correctamente",
      universidad: universidadActualizada
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos",
        error: error.message
      });
    }

    res.status(500).json({
      mensaje: "Error al actualizar la universidad",
      error: error.message
    });
  }
};

module.exports = {
  listarUniversidades,
  crearUniversidad,
  actualizarUniversidad
};
