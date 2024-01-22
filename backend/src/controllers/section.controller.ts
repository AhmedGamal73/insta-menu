import {
  createSection,
  getSectionByName,
  getSections,
} from "../services/section.service";
import { Request, Response } from "express";
import { ISection } from "../models/section.model";

export async function postSection(
  req: Request<{}, {}, ISection>,
  res: Response
): Promise<Response | undefined> {
  if (!(req.body && req.body.name)) {
    return res.status(400).json({ message: "Not Found" });
  }
  try {
    const section = await createSection(req.body.name);
    res.json(section);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function getSection(
  req: Request,
  res: Response
): Promise<Response | undefined> {
  if (!req.params.name) {
    return res.status(400).json({ message: "Section Name Not Provided" });
  }

  try {
    const section = await getSectionByName(req.params.name);
    return res.json(section);
  } catch (err) {
    console.log(err);
  }
}

// Get All Sections
export async function getSectionsController(req: Request, res: Response) {
  try {
    const sections = await getSections();
    return res.json(sections);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
}
