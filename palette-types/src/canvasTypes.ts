/**
 * Defines the types used when communicating with the Canvas API. Seperated from the core application types to
 * ensure the application can easily adapt if the Canvas API changes or if we want to support an additional LMS.
 */

export interface CanvasRubric {
  id?: number;
  title: string; // required
  contextId?: number | null;
  pointsPossible: number; // required
  reusable?: boolean | null;
  readOnly?: boolean | null;
  freeFormCriterionComments?: boolean | null;
  hideScoreTotal?: boolean | null;
  content?: string | null;
  published?: boolean;
  authorId?: number | null;
  rubricCriteria: CanvasCriterion[]; // required
  key?: string;
}

export interface CanvasCriterion {
  id?: number;
  description: string;
  longDescription?: string | null;
  points: number;
  ratings: CanvasRating[];
  key?: string;
}

export interface CanvasRating {
  id?: number;
  description: string;
  longDescription?: string | null;
  points: number;
  key?: string;
}
