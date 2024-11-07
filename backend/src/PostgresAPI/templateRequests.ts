import { Template } from "palette-types";

/**
 * This file contains the interface for the RubricService class.
 * The RubricService class is responsible for handling all the business logic for rubrics.
 * This includes creating, updating, deleting, and retrieving rubrics from the datastore.
 */
export interface TemplateService {
  /**
   * Creates a new rubric in the datastore.
   * @param {Rubric} data - The rubric object to be created.
   * @returns {Promise<Rubric | null>} - The created rubric object or null if creation failed.
   */
  createTemplate(data: Template): Promise<Template | null>;

  /**
   * Retrieves a rubric by its ID.
   * @param {number} id - The ID of the rubric to retrieve.
   * @returns {Promise<Rubric | null>} - The retrieved rubric object or null if not found.
   */
  getTemplateById(id: number): Promise<Template | null>;

  /**
   * Retrieves all rubrics from the datastore.
   * @returns {Promise<Rubric[]>} - An array of all rubric objects.
   */
  getAllTemplates(): Promise<Template[]>;

  /**
   * Retrieves the ID of a rubric by its title.
   * @param {string} title - The title of the rubric.
   * @returns {Promise<{ id: number } | null>} - An object containing the rubric ID or null if not found.
   */
  getTemplateIdByTitle(title: string): Promise<{ id: number } | null>;

  /**
   * Updates an existing rubric in the datastore.
   * @param {number} id - The ID of the rubric to update.
   * @param {Rubric} data - The updated rubric data.
   * @returns {Promise<Rubric | null>} - The updated rubric object or null if update failed.
   */
  updateTemplate(id: number, data: Template): Promise<Template | null>;

  /**
   * Deletes a rubric from the datastore.
   * @param {number} id - The ID of the rubric to delete.
   * @returns {Promise<void>} - A Promise that resolves when the rubric is deleted.
   */
  deleteTemplate(id: number): Promise<void>;

  /**
   * Deletes all criteria associated with a specific rubric.
   * @param {number} rubricId - The ID of the rubric whose criteria are to be deleted.
   * @returns {Promise<void>} - A Promise that resolves when all criteria are deleted.
   */
  deleteAllCriteria(rubricId: number): Promise<void>;
}
