
import game from "../models/game.js";

class GameRepository {
  static async findAll() {
    return await game.find({});
  }

  static async findById(id) {
    return await game.findById(id);
  }

  static async create(gameData) {
    const newGame = new game(gameData);
    return await newGame.save();
  }

  static async update(id, gameData) {
    return await game.findByIdAndUpdate(id, gameData, { new: true });
  }

  static async delete(id) {
    return await game.findByIdAndDelete(id);
  }

  static async findWithFilters(filtro) {
    return await game.find(filtro);
  }
}

export default GameRepository;
