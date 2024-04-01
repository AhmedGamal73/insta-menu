import { Router } from "express";

import {
  postUserController,
  getUserController,
  getUsersController,
  getWaitersController,
  getAdminsController,
  getCashiersController,
  getWaitersByShiftController,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/", postUserController);

userRouter.get("/", getUsersController);
userRouter.get("/waiters", getWaitersController);
userRouter.get("/cashier", getCashiersController);
userRouter.get("/amdins", getAdminsController);
userRouter.get("/:id", getUserController);

userRouter.get("/waiters/:shiftType", getWaitersByShiftController);

export default userRouter;
