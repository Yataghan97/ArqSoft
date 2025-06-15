import axios from "axios";
import ApiRepository from "../repositories/apiRepository.js";

class ApiService {
  static async salvarApi(jogoNome) {
    if (!jogoNome) {
      throw new Error("Você deve fornecer o nome do jogo.");
    }

    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.RAWG_API_KEY,
        page_size: 5,
        search: jogoNome,
      },
    });

    const jogos = response.data.results;

    if (!jogos.length) {
      throw new Error("Nenhum jogo encontrado.");
    }

    const jogosRetorno = [];

    for (const jogo of jogos) {
      const plataformas = jogo.platforms && jogo.platforms.length > 0
        ? jogo.platforms.map(plat => plat.platform.name).join(", ")
        : "Plataforma não definida";

      const jogoParaRetorno = {
        nome: jogo.name,
        nota: Math.round(jogo.rating),
        genero: jogo.genres.map(genre => genre.name).join(", "),
        plataformas,
        dataCriacao: new Date(jogo.released),
        favorito: 0,
        imagem: jogo.background_image || "",
      };

      const existente = await ApiRepository.findByName(jogo.name);
      if (!existente) {
        const jogoParaSalvar = { ...jogoParaRetorno };
        delete jogoParaSalvar.imagem;
        await ApiRepository.create(jogoParaSalvar);
      }

      jogosRetorno.push(jogoParaRetorno);
    }

    return jogosRetorno;
  }
}

export default ApiService;
