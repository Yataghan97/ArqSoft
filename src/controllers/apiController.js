import axios from "axios";
import api from "../models/api.js";  

class apiController {
  static salvarApi = async (req, res) => {
    const jogoNome = req.query.nome;  // Exemplo: /addjogo?nome=minecraft

    if (!jogoNome) {
      return res.status(400).send("Você deve fornecer o nome do jogo.");
    }

    try {
      // Verificar se o jogo já existe no banco de dados
      const jogoExistente = await api.findOne({ nome: jogoNome });

      if (jogoExistente) {
        return res.status(400).send("Jogo já existe no banco de dados.");
      }

      // Se o jogo não existir, fazer a requisição para a API
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: process.env.RAWG_API_KEY,
          page_size: 5,  // quantia de jogos por pesquisa
          search: jogoNome,
        },
      });

      const jogos = response.data.results; 

      if (jogos.length === 0) {
        return res.status(404).send("Nenhum jogo encontrado.");
      }

      // Para cada jogo retornado, crie e salve um objeto
      const jogosSalvos = [];
      for (const jogo of jogos) {
        // Trate a plataforma para garantir que o campo não seja nulo ou indefinido
        const plataformas = jogo.platforms && jogo.platforms.length > 0
          ? jogo.platforms.map(plat => plat.platform.name).join(", ")
          : "Plataforma não definida";  // Caso não tenha plataformas, definir um valor padrão

        const jogoParaSalvar = new api({
          nome: jogo.name,
          nota: Math.round(jogo.rating),  
          genero: jogo.genres.map(genre => genre.name).join(", "),
          plataformas: plataformas,  // Salva as plataformas corretamente
          dataCriacao: new Date(jogo.released),
          favorito: 0,  
        });

        const jogoSalvo = await jogoParaSalvar.save();
        jogosSalvos.push(jogoSalvo);
      }

      res.json({
        mensagem: `${jogosSalvos.length} jogos salvos com sucesso!`,
        jogos: jogosSalvos.map(jogo => ({
          nome: jogo.nome,
          nota: jogo.nota,
          genero: jogo.genero,
          plataformas: jogo.plataformas,
          dataCriacao: jogo.dataCriacao,
          favorito: jogo.favorito,
        }))
      });

    } catch (error) {
      console.error("Erro ao buscar ou salvar os jogos:", error);
      res.status(500).send("teste.");
    }
  };

}

export default apiController;
