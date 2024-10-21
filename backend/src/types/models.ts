/**
 * Define types for rubric objects on the backend.
 */
import { Request } from 'express';

export interface Criteria {
  id: number;
  description: string;
  longDescription?: string;
  points: number;
  ratings: Rating[];
}

export interface Rating {
  id: number;
  description: string;
  longDescription?: string;
  points: number;
}

// explicitly define type for Requests to the rubrics api
export interface RubricRequest extends Request {
  body: {
    title: string;
    rubricCriteria: Criteria[];
  };
}
