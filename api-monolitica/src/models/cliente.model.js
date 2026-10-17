
const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del cliente es obligatorio"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "El correo electrónico no tiene un formato válido"
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
  "Cliente",
  clienteSchema,
  "clientes"
);
