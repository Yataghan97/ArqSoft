import express from 'express'; 
import authController from '../controllers/authController.js';

const routes = express.Router();

// Register Route
routes.post("/register", authController.register);

// Login Route
routes.post("/login", authController.login);

export default routes;  
