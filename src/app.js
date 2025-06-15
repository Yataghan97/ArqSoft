import express from "express";
import connectToDatabase from "./config/dbConnect.js"; 
import apiRoutes from "./routers/gameRoutes.js";
import authRoutes from "./routers/authRoutes.js";
import userRoutes from './routers/userRoutes.js';
import cors from 'cors'; 
import axios from "axios";

const app = express();

connectToDatabase().then(() => {
  console.log("Conexão com o banco de dados estabelecida com sucesso.");
}).catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
});

// CORS
app.use(cors()); 

// Middleware para JSON
app.use(express.json());

// Configuração front
app.use(express.static('public'));  

// Configurar as rotas da API
app.use("/api", apiRoutes);      // Rota de jogos
app.use("/auth", authRoutes);    // Rota de autenticação de usuários
app.use("/user", userRoutes);    // Rota de informações do usuário

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: './public' });  
});

export default app;
