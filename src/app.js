import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import routes from "./routers/index.js";
import apiRoutes  from "./routers/gameRoutes.js";
import axios from "axios";

const connection = await connectToDatabase();

connection.on("error", (error) => {
  console.error("Erro de conexão:", error);
});

connection.once("open", () => {
  console.log("Conexão com sucesso");
});

const app = express();

app.use(express.json());

app.use("/api", apiRoutes);


// Definir outras rotas
routes(app);


export default app;



// Nova rota para buscar e salvar um jogo
/** 
app.get("/salvar-jogo", async (req, res) => {
  const jogoNome = req.query.nome;  
  
  if (!jogoNome) {
    return res.status(400).send("Você deve fornecer o nome do jogo.");
  }

  try {
    // Buscar o jogo na API RAWG
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.RAWG_API_KEY,  
        page_size: 1,
        search: jogoNome,
      },
    });


    console.log(JSON.stringify(response.data, null, 2))

    const jogo = response.data.results[0];  

    if (!jogo) {
      return res.status(404).send("Jogo não encontrado.");
    }

    const plataformas = jogo.platforms && Array.isArray(jogo.platforms)
      ? jogo.platforms.map(plat => plat.platform.name).join(", ")  // Acessando o nome da plataforma dentro de `platform`
      : "Plataformas não disponíveis";  // Caso o campo platforms esteja vazio ou ausente


    // Criar o objeto com as informações do jogo
    const jogoParaSalvar = new game({
      nome: jogo.name,
      nota: Math.round(jogo.rating),  
      genero: jogo.genres.map(genre => genre.name).join(", "),
      plataformas: jogo.platforms.map(plat => plat.name).join(", "),  
      dataCriacao: new Date(jogo.released),
      favorito: 0,  
    });

    // Salvar o jogo no MongoDB
    const jogoSalvo = await jogoParaSalvar.save();

    // Exibir as informações do jogo salvo
    res.json({
      mensagem: `Jogo ${jogoSalvo.nome} salvo com sucesso!`,
      jogo: {
        nome: jogoSalvo.nome,
        nota: jogoSalvo.nota,
        genero: jogoSalvo.genero,
        plataformas: jogoSalvo.plataformas, 
        dataCriacao: jogoSalvo.dataCriacao,
        favorito: jogoSalvo.favorito,
      }
    });

  } catch (error) {
    console.error("Erro ao buscar ou salvar o jogo:", error);
    res.status(500).send("Erro ao processar sua solicitação.");
  }
    
});

*/
  
