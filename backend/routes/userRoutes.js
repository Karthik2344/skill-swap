import express from "express";
import { getUserProfile, getUsers, login, register, updateProfile } from "../controllers/User.js";
import protect from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/profile", protect, updateProfile);
userRouter.get("/get-users", protect, getUsers);

export default userRouter;
