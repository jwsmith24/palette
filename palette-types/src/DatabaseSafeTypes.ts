export interface PrismaRubric {
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
  rubricCriteria: PrismaRubricCriterion[]; // required
  key?: string;
}

export interface PrismaRubricCriterion {
  description: string; // required
  longDescription?: string | null;
  points: number; // required
  ratings: PrismaRubricRating[]; // required
}

export interface PrismaRubricRating {
  description: string; // required
  longDescription?: string | null;
  points: number; // required
}
