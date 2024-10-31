export interface Rubric {
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
  rubricCriteria: RubricCriterion[]; // required
  key?: string;
}

export interface RubricCriterion {
  id: number;
  description: string;
  longDescription?: string | null;
  points: number;
  ratings: RubricRating[];
  key?: string;
}

export interface RubricRating {
  id: number;
  description: string;
  longDescription?: string | null;
  points: number;
  key?: string;
}
