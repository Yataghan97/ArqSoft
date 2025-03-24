import express from "express";
import PostController from "../controllers/postcontroller.js";

const routes = express.Router();

routes.get("/posts", PostController.getAllPosts);
routes.get("/posts", PostController.postPost);
routes.get("/posts", PostController.getPost);


export default routes;
