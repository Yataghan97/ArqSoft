import ApiService from "../services/apiService.js";

class apiController {
  static salvarApi = async (req, res) => {
    try {
      const jogoNome = req.query.nome;
      const jogos = await ApiService.salvarApi(jogoNome);

      res.json({
        mensagem: `${jogos.length} jogos retornados com sucesso!`,
        jogos: jogos.map(jogo => ({
          nome: jogo.nome,
          nota: jogo.nota,
          genero: jogo.genero,
          plataformas: jogo.plataformas,
          dataCriacao: jogo.dataCriacao,
          favorito: jogo.favorito,
          imagem: jogo.imagem || "" // <-- imagem adicionada aqui
        }))
      });

    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  };
}

export default apiController;
