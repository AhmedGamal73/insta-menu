import express, { Request, Response } from "express";

import {
  postUser,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/", postUser);
userRouter.get("/", getUser);
userRouter.delete("/", deleteUser);
userRouter.put("/", updateUser);

export default userRouter;
