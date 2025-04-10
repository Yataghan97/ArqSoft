import express from "express";
import GameController from "../controllers/gameController.js";

const routes = express.Router();

routes.get("/game", GameController.getAllgame);
routes.get("/game/:id", GameController.postGame);
routes.get("/game/search/:keyword", GameController.findGameByKeyword);
routes.get("/game/:id", GameController.getGame);
routes.post("/game", GameController.postGame);
routes.delete("/game/:id", GameController.gameDelete);
routes.put("/game/:id", GameController.updateGame);


export default routes;