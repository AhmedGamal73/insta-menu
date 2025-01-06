import express from "express";
import { fetchAll, signUp, getTenant } from "../controllers/tenant.controller";

const router = express.Router();
router.post('/signup', signUp)
router.get("/all", fetchAll)
router.get("/tenant/:id", getTenant)



export default router;