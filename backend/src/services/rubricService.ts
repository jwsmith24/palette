import { Rubric } from '../../../palette-types/src/DatabaseSafeTypes';

/**
 * This file contains the interface for the RubricService class.
 * The RubricService class is responsible for handling all the business logic for rubrics.
 * This includes creating, updating, deleting, and retrieving rubrics from the datastore.
 */
export interface RubricService {
  /**
   * Creates a new rubric in the datastore.
   * @param {Rubric} data - The rubric object to be created.
   * @returns {Promise<Rubric | null>} - The created rubric object or null if creation failed.
   */
  createRubric(data: Rubric): Promise<Rubric | null>;

  /**
   * Retrieves a rubric by its ID.
   * @param {number} id - The ID of the rubric to retrieve.
   * @returns {Promise<Rubric | null>} - The retrieved rubric object or null if not found.
   */
  getRubricById(id: number): Promise<Rubric | null>;

  /**
   * Retrieves all rubrics from the datastore.
   * @returns {Promise<Rubric[]>} - An array of all rubric objects.
   */
  getAllRubrics(): Promise<Rubric[]>;

  /**
   * Retrieves the ID of a rubric by its title.
   * @param {string} title - The title of the rubric.
   * @returns {Promise<{ id: number } | null>} - An object containing the rubric ID or null if not found.
   */
  getRubricIdByTitle(title: string): Promise<{ id: number } | null>;

  /**
   * Updates an existing rubric in the datastore.
   * @param {number} id - The ID of the rubric to update.
   * @param {Rubric} data - The updated rubric data.
   * @returns {Promise<Rubric | null>} - The updated rubric object or null if update failed.
   */
  updateRubric(id: number, data: Rubric): Promise<Rubric | null>;

  /**
   * Deletes a rubric from the datastore.
   * @param {number} id - The ID of the rubric to delete.
   * @returns {Promise<void>} - A Promise that resolves when the rubric is deleted.
   */
  deleteRubric(id: number): Promise<void>;

  /**
   * Deletes all criteria associated with a specific rubric.
   * @param {number} rubricId - The ID of the rubric whose criteria are to be deleted.
   * @returns {Promise<void>} - A Promise that resolves when all criteria are deleted.
   */
  deleteAllCriteria(rubricId: number): Promise<void>;
}
