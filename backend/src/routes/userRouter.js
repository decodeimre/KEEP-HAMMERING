import { Router } from "express";
import { register, login, logout, handleVerifyLink } from "../controllers/userController.js";
import { registerValidation, loginValidation } from "../validation/userValidation.js";
import { handleValidationResults } from "../validation/handleValidationResults.js";

export const userRouter = Router();


userRouter.route('/register').post(registerValidation, handleValidationResults, register);
userRouter.route('/login').post(loginValidation, handleValidationResults, login);
userRouter.route('/logout').post(logout)
userRouter.route('/users/confirm/:token/:userID').get(handleVerifyLink)