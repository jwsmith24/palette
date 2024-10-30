import { Rubric } from '../routes/rubricRouter';

/**
 * This file contains the interface for the RubricService class.
 * The RubricService class is responsible for handling all the business logic for rubrics.
 * This includes creating, updating, deleting, and retrieving rubrics from the database.
 * The purpose of this interface is abstracting the implementation details of the RubricService class.
 * This allows for easier testing and swapping out different implementations of the RubricService class.
 */
export interface RubricService {
  createRubric(data: Rubric): Promise<Rubric | null>;
  getRubricById(id: number): Promise<Rubric | null>;
  getAllRubrics(): Promise<Rubric[]>;
  getRubricIdByTitle(title: string): Promise<{ id: number } | null>;
  updateRubric(id: number, data: Rubric): Promise<void>;
  deleteRubric(id: number): Promise<void>;
  deleteAllCriteria(rubricId: number): Promise<void>;
}
