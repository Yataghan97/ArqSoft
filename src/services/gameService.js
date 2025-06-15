
import game from "../models/game.js";

class GameService {
  static async getAllGames() {
    return await game.find({});
  }

  static async getGameById(id) {
    return await game.findById(id);
  }

  static async createGame(gameData) {
    const newGame = new game(gameData);
    return await newGame.save();
  }

  static async updateGame(id, gameData) {
    return await game.findByIdAndUpdate(id, gameData, { new: true });
  }

  static async deleteGame(id) {
    return await game.findByIdAndDelete(id);
  }

  static async findGamesByFilters({ nome, genero, notaMin, notaMax }) {
    const filtro = {};

    if (nome && typeof nome === "string") {
      filtro.nome = { $regex: nome, $options: "i" };
    }
    if (genero && typeof genero === "string") {
      filtro.genero = { $regex: genero, $options: "i" };
    }

    if (notaMin || notaMax) {
      filtro.nota = {};
      if (notaMin) filtro.nota.$gte = parseInt(notaMin);
      if (notaMax) filtro.nota.$lte = parseInt(notaMax);
    }

    return await game.find(filtro);
  }
}

export default GameService;
