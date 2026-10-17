
const mongoose = require("mongoose");

const etapaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la etapa es obligatorio"],
      trim: true,
      unique: true
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
  "Etapa",
  etapaSchema,
  "etapas"
);
