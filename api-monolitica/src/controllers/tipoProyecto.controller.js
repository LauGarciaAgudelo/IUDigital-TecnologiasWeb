
const TipoProyecto = require("../models/tipoProyecto.model");

// GET - Listar todos los tipos de proyecto
const listarTiposProyecto = async (req, res) => {
  try {
    const tipos = await TipoProyecto.find().sort({
      nombre: 1
    });

    res.status(200).json(tipos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar los tipos de proyecto",
      error: error.message
    });
  }
};

// POST - Crear un tipo de proyecto
const crearTipoProyecto = async (req, res) => {
  try {
    const nuevoTipo = new TipoProyecto({
      nombre: req.body.nombre
    });

    const tipoGuardado = await nuevoTipo.save();

    res.status(201).json({
      mensaje: "Tipo de proyecto creado correctamente",
      tipoProyecto: tipoGuardado
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "Ya existe un tipo de proyecto con ese nombre"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos",
        error: error.message
      });
    }

    res.status(500).json({
      mensaje: "Error al crear el tipo de proyecto",
      error: error.message
    });
  }
};

// PUT - Actualizar un tipo de proyecto
const actualizarTipoProyecto = async (req, res) => {
  try {
    const tipoActualizado =
      await TipoProyecto.findByIdAndUpdate(
        req.params.id,
        { nombre: req.body.nombre },
        {
          new: true,
          runValidators: true
        }
      );

    if (!tipoActualizado) {
      return res.status(404).json({
        mensaje: "Tipo de proyecto no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Tipo de proyecto actualizado correctamente",
      tipoProyecto: tipoActualizado
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        mensaje: "El identificador no es válido"
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "Ya existe un tipo de proyecto con ese nombre"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos",
        error: error.message
      });
    }

    res.status(500).json({
      mensaje: "Error al actualizar el tipo de proyecto",
      error: error.message
    });
  }
};

module.exports = {
  listarTiposProyecto,
  crearTipoProyecto,
  actualizarTipoProyecto
};
