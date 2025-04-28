import express from "express";
import FavoritosController from "../controllers/authorController.js";

const routes = express.Router();

routes.get("/authors", FavoritosController.getAllAuthor);
routes.get("/authors/:id", FavoritosController.getAuthor);
routes.get("/posts/search/:keyword", FavoritosController.findAuthorByKeyword);
routes.post("/authors", FavoritosController.postAuthor);
routes.delete("/authors/:id", AuthorController.authorDelete);
routes.put("/authors/:id", AuthorController.updateAuthor);


export default routes;