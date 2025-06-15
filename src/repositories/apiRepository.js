import Api from "../models/api.js";

class ApiRepository {
  static async findByName(nome) {
    // Busca insensível a maiúsculas/minúsculas
    return await Api.findOne({ nome: new RegExp(`^${nome}$`, 'i') });
  }

  static async create(jogo) {
    const novoJogo = new Api(jogo);
    return await novoJogo.save();
  }
}

export default ApiRepository;
