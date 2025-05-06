import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true }, 
  nota: { type: Number },
  genero: { type: String },
  plataformas: { type: String },
  dataCriacao: { type: Date },
  favorito: { type: Number },
});

const api = mongoose.model("api", apiSchema);

export default api;

