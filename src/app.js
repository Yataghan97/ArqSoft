import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import game from "./models/game.js"
import routes from "./routers/index.js";

const connection = await connectToDatabase();

connection.on("error", (error) => {
    console.error("erro de conexao", error);
});

connection.once("open", () => {
    console.log("conexao com sucesso")
});


const app = express();
routes(app);

export default app;