/**
 * Define types for rubric objects on the backend.
 */

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
