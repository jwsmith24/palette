import { RubricRating } from './rubricRating.ts';

export interface RubricCriterion {
  description: string;
  longDescription: string;
  ratings: RubricRating[];
  id?: number; // id is only assigned when the rubric is saved to the database
  points: number;
  updatePoints: () => void;
  key: string; // UUID for React
}
