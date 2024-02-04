"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const section_controller_1 = require("../controllers/section.controller");
const sectionRouter = (0, express_1.Router)();
// Post Section
sectionRouter.post("/", section_controller_1.postSection);
// Get Section By Name
sectionRouter.get("/:name", section_controller_1.getSection);
// Get All Sections
sectionRouter.get("/", section_controller_1.getSectionsController);
exports.default = sectionRouter;
//# sourceMappingURL=section.route.js.map