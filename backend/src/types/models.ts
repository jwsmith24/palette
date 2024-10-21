/**
 * Define types for rubric objects on the backend.
 */
import { Request } from 'express';

/**
 * Define Criteria object that the React application will send to the backend.
 *
 * Will be nested inside a Rubric object.
 */
export interface Criteria {
  id: number;
  description: string;
  longDescription?: string;
  points: number;
  ratings: Rating[];
}

/**
 * Define Rating object that the React application will send to the backend.
 *
 * Will be nested inside Criterion objects.
 */
export interface Rating {
  id: number;
  description: string;
  longDescription?: string;
  points: number;
}

/**
 * Define custom request body structure that the React application will be sending to the backend.
 *
 * Implicitly defines the Rubric model for the backend.
 */

export interface RubricRequest extends Request {
  body: {
    title: string;
    rubricCriteria: Criteria[];
  };
}
