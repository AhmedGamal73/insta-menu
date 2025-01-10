import { getConnection } from "../db/connectionManager";
import {getSectionModel, sectionSchema} from "../models/section.model";
// getConnection
// const Section = getSectionModel();
export async function createSection(name: string) {
  // Section name to lower case
  const dbConnection = await getConnection();
  console.log("dbConnection", dbConnection)
  const Section = dbConnection.model("Section", sectionSchema)
  const lowerCaseName = name.toLowerCase();

  try {
    // Find Section
    console.log("Section Model", Section)
    const isSectionExist = await Section.findOne({ lowerCaseName });
    if (isSectionExist) {
      throw new Error("Section Already Exist");
    }

    // Create new section
    const newSection = await Section.create({ name: lowerCaseName });
    return newSection;
  } catch (err: any) {
    console.log("create section service error", err);
    throw new Error(err)
  }
}

// Get section by name
export async function getSectionByName(sectionName: string) {
  // Find section
  const dbConnection = await getConnection();
  const Section = dbConnection.model("Section", sectionSchema)
  const section = await Section.findOne({ name: sectionName.toLowerCase() });
  if (section) {
    return section;
  } else {
    throw new Error("Section Not Found");
  }
}

// Get All Sections
export async function getSections() {
  const dbConnection = await getConnection();
  const Section = dbConnection.model("Section", sectionSchema)
  return await Section.find({});
}
