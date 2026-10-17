
const mongoose = require("mongoose");

const tipoProyectoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      unique: true,
      enum: [
        "Ensayo",
        "Artículo",
        "Monografía",
        "Trabajo final de pregrado",
        "Trabajo final de especialización"
      ]
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
  "TipoProyecto",
  tipoProyectoSchema
);
