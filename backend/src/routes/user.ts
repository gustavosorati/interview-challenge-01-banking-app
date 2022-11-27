import { Router } from "express";
import { UserController } from "../controllers/userController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const userController = new UserController();

const userRoutes = Router();

userRoutes.get('/', ensureAuthentication, userController.getUser);

userRoutes.get('/transactions', ensureAuthentication, userController.getTransactions);
userRoutes.post('/transactions', ensureAuthentication, userController.createTransaction);

export { userRoutes };