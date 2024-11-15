import { getAllUsers } from "./homeController.js";
import { Router } from "express";

const displayUsersRouter = Router();

displayUsersRouter.get("/displyUsers",getAllUsers);


export default displayUsersRouter;