import { Router } from 'express'
import { AuthController } from '../controllers/AuthController';

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post('/create', authController.create);
authRoutes.post("/login", authController.login);

export {authRoutes};