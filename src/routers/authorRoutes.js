import express from "express";
import AuthorController from "../controllers/authorController.js";

const routes = express.Router();

routes.get("/authors", AuthorController.getAllAuthor);
routes.get("/authors/:id", AuthorController.getAuthor);
routes.get("/posts/search/:keyword", AuthorController.findAuthorByKeyword);
routes.post("/authors", AuthorController.postAuthor);
routes.delete("/authors/:id", AuthorController.authorDelete);
routes.put("/authors/:id", AuthorController.updateAuthor);


export default routes;