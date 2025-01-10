import { Router } from "express";
import {
  getSectionsController,
  getSection,
  postSection,
} from "../controllers/section.controller";
import isAuthenticated, { authorizeTenant } from "../middleware/auth";

const sectionRouter = Router();

// Post Section
sectionRouter.post("/", isAuthenticated, authorizeTenant,postSection);

// Get Section By Name
sectionRouter.get("/:name", getSection);

// Get All Sections
sectionRouter.get("/", getSectionsController);

export default sectionRouter;
