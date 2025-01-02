import { create, fetchAll } from './../controllers/admin.controller';
import express from "express";

const router = express.Router();
router.post('/tenant', create)
router.get("/tenant", fetchAll)



export default router;