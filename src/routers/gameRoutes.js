import express from "express";
import GameController from "../controllers/gameController.js";
import apiController from "../controllers/apiController.js";

const routes = express.Router();

routes.get("/game", GameController.getAllgame);
routes.get("/game/search", GameController.findGameByKeyword); // <-- esta linha vai ANTES
routes.get("/game/:id", GameController.getGame);
routes.post("/game", GameController.postGame);
routes.delete("/game/:id", GameController.gameDelete);
routes.put("/game/:id", GameController.updateGame);


//Rota API
routes.get("/addjogo", apiController.salvarApi);


export default routes;