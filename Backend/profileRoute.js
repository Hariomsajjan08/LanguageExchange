import { Router } from "express";
import { getUserProfile, updateUserProfile } from "./profileController.js";
import { verifyToken } from "./Middleware/verifyToken.js";

const profileRouter = Router();


profileRouter.get("/getUser",verifyToken,getUserProfile);
profileRouter.put("/updateUser",verifyToken,updateUserProfile);

export default profileRouter;
