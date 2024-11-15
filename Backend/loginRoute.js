import { Router } from "express";
import { loginUser } from "./loginController.js";

const loginRouter = Router();

loginRouter.post("/signIn", loginUser);

export default loginRouter;
