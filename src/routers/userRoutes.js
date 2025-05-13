import express from 'express';
import userController from '../controllers/userController.js';  
import checkToken from "../middleware/middleware.js" 

const routes = express.Router();

routes.get("/:id", checkToken, userController.getUser);

export default routes;  
