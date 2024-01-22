import Section from "../models/section.model";

export async function createSection(sectionName: string) {
  if (
    sectionName ||
    typeof sectionName !== "string" ||
    sectionName.trim() === ""
  ) {
    throw new Error("Invalidation Error: Sectoin ID should be string");
  }

  // Section name to lower case
  const lowerCaseName = sectionName.toLowerCase();

  try {
    // Find Section
    const isSectionExist = await Section.findOne({ lowerCaseName });
    if (isSectionExist) {
      throw new Error("Section Already Exist");
    }

    // Create new section
    const newSection = await Section.create(lowerCaseName);
    return newSection;
  } catch (err) {
    console.log(err);
  }
}

// Get section by name
export async function getSectionByName(sectionName: string) {
  // Validat input section name
  if (
    sectionName ||
    typeof sectionName !== "string" ||
    sectionName.trim() === ""
  ) {
    throw new Error("Invalidation Error: Sectoin ID should be string");
  }

  // Find section
  const section = await Section.findOne({ name: sectionName.toLowerCase() });
  if (section) {
    return section;
  } else {
    throw new Error("Section Not Found");
  }
}

// Get All Sections
export async function getSections() {
  return await Section.find({});
}
