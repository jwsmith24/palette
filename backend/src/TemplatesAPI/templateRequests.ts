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
  /**
   * Adds a new template to the datastore.
   * @param {Request} req - The request object containing the template data.
   * @returns {Promise<void>} - A Promise that resolves when the template is added.
   */
  addTemplate: async (req: Request) => {
    console.log("template data", req.body);
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    console.log("settings templates", settings.templates);
    const template = createTemplate();
    const templateData = req.body as Template | null;
    if (templateData) {
      template.title = templateData.title;
      template.criteria = templateData.criteria;
      template.id = templateData.id;
      template.key = templateData.key;
      settings.templates.push(template);
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    }
  },

  updateTemplate: async (req: Request) => {
    console.log("updating template request", req.body);
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    const templateData = req.body as Template | null;
    if (templateData) {
      const templateIndex = settings.templates.findIndex(
        (tmplt) => tmplt.title === templateData.title
      );
      console.log("templateIndex", templateIndex);
      console.log("templateData", templateData);
      if (templateIndex !== -1) {
        settings.templates[templateIndex] = templateData;

        console.log("updated templates", settings.templates);
        console.log("settings", settings);
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      }
    }
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
