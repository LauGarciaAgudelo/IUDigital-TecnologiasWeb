
const mongoose = require("mongoose");
const Etapa = require("../models/etapa.model");

// GET - Listar etapas
const listarEtapas = async (req, res) => {
  try {
    const etapas = await Etapa.find().sort({
      nombre: 1
    });

    res.status(200).json(etapas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar las etapas",
      error: error.message
    });
  }
};

// POST - Crear una etapa
const crearEtapa = async (req, res) => {
  try {
    const nuevaEtapa = new Etapa({
      nombre: req.body.nombre
    });

    const etapaGuardada = await nuevaEtapa.save();

    res.status(201).json({
      mensaje: "Etapa creada correctamente",
      etapa: etapaGuardada
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "Ya existe una etapa con ese nombre"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos",
        error: error.message
      });
    }

    res.status(500).json({
      mensaje: "Error al crear la etapa",
      error: error.message
    });
  }
};

// PUT - Actualizar una etapa
const actualizarEtapa = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "El identificador no es válido"
      });
    }

    const etapaActualizada = await Etapa.findByIdAndUpdate(
      id,
      { nombre: req.body.nombre },
      {
        new: true,
        runValidators: true
      }
    );

    if (!etapaActualizada) {
      return res.status(404).json({
        mensaje: "Etapa no encontrada"
      });
    }

    res.status(200).json({
      mensaje: "Etapa actualizada correctamente",
      etapa: etapaActualizada
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "Ya existe una etapa con ese nombre"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos",
        error: error.message
      });
    }

    res.status(500).json({
      mensaje: "Error al actualizar la etapa",
      error: error.message
    });
  }
};

module.exports = {
  listarEtapas,
  crearEtapa,
  actualizarEtapa
};
