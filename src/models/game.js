import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O título é obrigatório"],
    trim: true,
    unique: true     
  },
  nota: {
    type: Number,
    min: [0, "A nota mínima é 0"],
    max: [100, "A nota máxima é 100"],
    validate: {
      validator: Number.isInteger,
      message: "A nota deve ser um número inteiro"
    }
  },
  genero: {
    type: String,
    required: [true, "Deve ser inserido o gênero do jogo"],
    trim: true
  },
  dataCriacao: { type: Date },
  v: {
    type: Boolean,
    default: false
  },
  favoritos: {
    type: [String],
    default: []
  }
}, {
  versionKey: false,
  timestamps: true
});

const game = mongoose.model("apis", gameSchema);

export default game;