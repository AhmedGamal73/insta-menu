import express from "express";
import { fetchAll, signUp } from "../controllers/tenant.controller";

const router = express.Router();
router.post('/signup', signUp)
router.get("/all", fetchAll)



export default router;