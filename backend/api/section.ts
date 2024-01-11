import { Router, Request, Response } from "express";
import Section from "../model/section";
import section from "../model/section";

const sectionRouter = Router();

sectionRouter.post("/section", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const finalName = name.toLowerCase();
    const isSectionExist = await Section.findOne({ name: finalName });

    if (isSectionExist) {
      return res.status(400).json({ Error: "Section already exists" });
    }

    req.body.name = req.body.name.toLowerCase();
    const newSection = await Section.create(req.body);
    res.json(newSection);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

sectionRouter.get("/section/:name", async (req, res) => {
  try {
    const section = await Section.findOne({
      name: req.params.name.toLowerCase(),
    });
    if (section) {
      res.json(section);
    } else {
      res.status(404).send("Section not found");
    }
  } catch (err) {
    console.log(err);
  }
});

sectionRouter.get("/sections", async (req, res) => {
  try {
    const sections = await Section.find({});
    res.json(sections);
  } catch (err) {
    console.log(err);
  }
});

export default sectionRouter;
