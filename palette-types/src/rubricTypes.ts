/**
 * Define the core rubric types used throughout the application.
 */

export interface Rubric {
  id?: number; // id is optional as rubrics may not have one assigned by canvas
  title: string;
  pointsPossible: number;
  key: string; // required unique id for react
  criteria: Criteria[];
}

export interface Criteria {
  id?: number;
  description: string;
  longDescription: string;
  points: number;
  ratings: Rating[];
  key: string;
}

export interface Rating {
  id?: number;
  description: string;
  longDescription: string;
  points: number;
  key: string;
}
