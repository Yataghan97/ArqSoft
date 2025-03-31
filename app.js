import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
import "dotenv/config";  // Importando o dotenv para usar variáveis de ambiente

const app = express();

app.use(express.json());

// Função para conectar ao MongoDB usando a variável de ambiente DB_CONNECTION_STRING
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
}

// Conectar ao banco de dados ao iniciar o servidor
connectToDatabase();

// Definindo o modelo de Jogo
const jogoSchema = new mongoose.Schema({
    nome: String,
    nota: { type: Number, default: null },  // Mudado para garantir que "nota" seja numérico ou null
    genero: String,
    plataformas: String,
    dataCriacao: { type: Date, default: Date.now },
});

const Jogo = mongoose.model('Jogo', jogoSchema); // Modelo para os jogos

// Sua chave da API RAWG
const RAWG_API_KEY = 'b4b0d641dec04a9699e927148e54dc62'; // Chave da sua API
const RAWG_BASE_URL = 'https://api.rawg.io/api/games';

// Função para buscar detalhes do jogo na RAWG API
async function buscarDetalhesJogo(jogoNome) {
    try {
        const response = await axios.get(RAWG_BASE_URL, {
            params: {
                key: RAWG_API_KEY, // Passando a chave da API no parâmetro
                page_size: 5, // Limita a 5 resultados
                search: jogoNome, // Nome do jogo que o usuário quer pesquisar
            },
        });

        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar detalhes do jogo:", error);
        throw new Error('Erro ao buscar detalhes do jogo');
    }
}

// Rota para buscar detalhes de um jogo e adicionar ao MongoDB
app.get('/detalhes-jogo/:nome', async (req, res) => {
    const nomeJogo = req.params.nome;

    try {
        const resultados = await buscarDetalhesJogo(nomeJogo);

        if (resultados.length === 0) {
            return res.status(404).json({ mensagem: 'Jogo não encontrado.' });
        }

        // Resposta com os detalhes do jogo
        const resposta = resultados.map(jogo => {
            // Garantindo que a 'nota' seja um número ou null
            const nota = jogo.metacritic ? jogo.metacritic : null;  // Se não houver nota, define como null
            const genero = jogo.genres && jogo.genres.length > 0 ? jogo.genres.map(genre => genre.name).join(', ') : 'Gênero não disponível';
            const plataformas = jogo.platforms && jogo.platforms.length > 0 
                ? jogo.platforms.map(platform => platform.platform.name).join(', ') 
                : 'Plataformas não disponíveis';

            return {
                nome: jogo.name,
                nota: nota,
                genero: genero,
                plataformas: plataformas,
            };
        });

        // Adicionar os resultados ao banco de dados MongoDB
        const jogos = resposta.map(jogo => {
            const novoJogo = new Jogo({
                nome: jogo.nome,
                nota: jogo.nota,  // Agora "nota" é um número ou null
                genero: jogo.genero,
                plataformas: jogo.plataformas,
            });

            return novoJogo.save();
        });

        await Promise.all(jogos); // Salva todos os jogos ao mesmo tempo

        // Retorna a resposta
        res.json(resposta);
    } catch (err) {
        res.status(500).json({ mensagem: err.message });
    }
});

// Configuração da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
