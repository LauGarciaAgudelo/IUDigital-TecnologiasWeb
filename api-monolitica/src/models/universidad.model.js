
const mongoose = require("mongoose");

const universidadSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true
    },
    direccion: {
      type: String,
      required: [true, "La dirección es obligatoria"],
      trim: true
    },
    telefono: {
      type: String,
      required: [true, "El teléfono es obligatorio"],
      trim: true
    }
  },
  {
    timestamps: {
      createdAt: "fechaCreacion",
      updatedAt: "fechaActualizacion"
    },
    versionKey: false
  }
);

module.exports = mongoose.model(
  "Universidad",
  universidadSchema,
  "universidades"
);
