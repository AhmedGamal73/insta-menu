import { Router } from "express";
import {
  getSectionsController,
  getSection,
  postSection,
} from "../controllers/section.controller";

const sectionRouter = Router();

// Post Section
sectionRouter.post("/", postSection);

// Get Section By Name
sectionRouter.get("/:name", getSection);

// Get All Sections
sectionRouter.get("/", getSectionsController);

export default sectionRouter;
