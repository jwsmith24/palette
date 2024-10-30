// backend/src/dtos/rubric.dto.ts
export interface RubricDTO {
  title: string;
  contextId: number | null;
  contextType: string | null;
  pointsPossible: number;
  reusable: boolean | null;
  readOnly: boolean | null;
  freeFormCriterionComments: boolean | null;
  hideScoreTotal: boolean | null;
  content: string | null;
  published?: boolean;
  authorId: number | null;
  rubricCriteria: RubricCriterionDTO[];
}

export interface RubricCriterionDTO {
  description: string;
  longDescription: string | null;
  points: number;
  ratings: RubricRatingDTO[];
  criterionUseRange: number | null;
}

export interface RubricRatingDTO {
  description: string;
  longDescription: string | null;
  points: number;
  criterionUseRange: number | null;
}
