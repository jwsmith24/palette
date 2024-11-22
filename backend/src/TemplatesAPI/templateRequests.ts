import { Template, Settings, Criteria } from "palette-types";
import { createTemplate } from "../../../frontend/src/utils/templateFactory.js";
import fs from "fs";

/**
 * This file contains the interface for the RubricService class.
 * The RubricService class is responsible for handling all the business logic for rubrics.
 * This includes creating, updating, deleting, and retrieving rubrics from the datastore.
 */

// Construct an absolute path
const settingsPath = "./settings.json";

export const TemplateService = {
  addTemplate: async (req: Request) => {
    console.log("template data", req.body);
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    console.log("settings templates", settings.templates);
    const template = createTemplate();
    // template.title = (await req.json()).title as string;
    // template.criteria = (await req.json()).criteria as Criteria[];
    // template.id = (await req.json()).id as number;
    // template.key = (await req.json()).key as string;
    settings.templates.push(template);
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  },

  /**
   * Retrieves a rubric by its ID.
   * @param {number} id - The ID of the rubric to retrieve.
   * @returns {Promise<Rubric | null>} - The retrieved rubric object or null if not found.
   */

  getTemplateById: async (req: Request) => {
    console.log("template data", req.body);
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    settings.templates.push();
    console.log("settings templates", settings.templates);
  },

  /**
   * Retrieves the ID of a rubric by its title.
   * @param {string} title - The title of the rubric.
   * @returns {Promise<{ id: number } | null>} - An object containing the rubric ID or null if not found.
   */
  getTemplateIdByTitle: async (req: Request) => {
    console.log("template data", req.body);
  },

  /**
   * Updates an existing rubric in the datastore.
   * @param {number} id - The ID of the rubric to update.
   * @param {Rubric} data - The updated rubric data.
   * @returns {Promise<Rubric | null>} - The updated rubric object or null if update failed.
   */
  updateTemplate: async (req: Request) => {
    console.log("template data", req.body);
  },

  /**
   * Deletes a rubric from the datastore.
   * @param {number} id - The ID of the rubric to delete.
   * @returns {Promise<void>} - A Promise that resolves when the rubric is deleted.
   */

  deleteTemplate: async (req: Request) => {
    console.log("template data", req.body);
  },

  /**
   * Deletes all criteria associated with a specific rubric.
   * @param {number} rubricId - The ID of the rubric whose criteria are to be deleted.
   * @returns {Promise<void>} - A Promise that resolves when all criteria are deleted.
   */
  deleteAllCriteria: async (req: Request) => {
    console.log("template data", req.body);
  },
};
