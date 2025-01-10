import express from "express";
import { fetchAll, signUp, getTenant, login } from "../controllers/tenant.controller";

const router = express.Router();
router.post('/signup', signUp)
router.get("/all", fetchAll)
router.get("/tenant/:id", getTenant)
router.post("/login", login)



export default router;