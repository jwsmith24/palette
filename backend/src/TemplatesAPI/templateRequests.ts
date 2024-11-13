import { Template } from "palette-types";
import * as fs from "fs/promises";

/**
 * This file contains the interface for the RubricService class.
 * The RubricService class is responsible for handling all the business logic for rubrics.
 * This includes creating, updating, deleting, and retrieving rubrics from the datastore.
 */
export const TemplateService = {
  /**
   * Creates a new rubric in the datastore.
   * @param {Template} data - The rubric object to be created.
   * @returns {Promise<Template | null>} - The created rubric object or null if creation failed.
   */
  async createTemplate(data: Template): Promise<Template | null> {
    try {
      // Read existing templates
      const templatesPath = ".,/userData/templates.json";
      let templates: Template[] = [];

      try {
        const fileContent = await fs.readFile(templatesPath, "utf-8");
        templates = JSON.parse(fileContent);
      } catch (error) {
        // If file doesn't exist, we'll create it
        await fs.mkdir(templatesPath, { recursive: true });
      }

      // Generate new ID (use length + 1 or find max ID + 1)
      data.id =
        templates.length > 0
          ? Math.max(...templates.map((t) => t.id ?? 0)) + 1
          : 1;

      // Add new template
      templates.push(data);

      // Write back to file
      await fs.writeFile(templatesPath, JSON.stringify(templates, null, 2));

      return data;
    } catch (error) {
      console.error("Error creating template:", error);
      return null;
    }
  },

  /**
   * Retrieves a rubric by its ID.
   * @param {number} id - The ID of the rubric to retrieve.
   * @returns {Promise<Rubric | null>} - The retrieved rubric object or null if not found.
   */
  getTemplateById(id: number): Promise<Template | null> {
    return Promise.resolve(null);
  },

  /**
   * Retrieves all rubrics from the datastore.
   * @returns {Promise<Rubric[]>} - An array of all rubric objects.
   */
  getAllTemplates(): Promise<Template[]> {
    return Promise.resolve([]);
  },

  /**
   * Retrieves the ID of a rubric by its title.
   * @param {string} title - The title of the rubric.
   * @returns {Promise<{ id: number } | null>} - An object containing the rubric ID or null if not found.
   */
  getTemplateIdByTitle(title: string): Promise<{ id: number } | null> {
    return Promise.resolve(null);
  },

  /**
   * Updates an existing rubric in the datastore.
   * @param {number} id - The ID of the rubric to update.
   * @param {Rubric} data - The updated rubric data.
   * @returns {Promise<Rubric | null>} - The updated rubric object or null if update failed.
   */
  updateTemplate(id: number, data: Template): Promise<Template | null> {
    return Promise.resolve(null);
  },

  /**
   * Deletes a rubric from the datastore.
   * @param {number} id - The ID of the rubric to delete.
   * @returns {Promise<void>} - A Promise that resolves when the rubric is deleted.
   */
  deleteTemplate(id: number): Promise<void> {
    return Promise.resolve();
  },

  /**
   * Deletes all criteria associated with a specific rubric.
   * @param {number} rubricId - The ID of the rubric whose criteria are to be deleted.
   * @returns {Promise<void>} - A Promise that resolves when all criteria are deleted.
   */
  deleteAllCriteria(rubricId: number): Promise<void> {
    return Promise.resolve();
  },
};
