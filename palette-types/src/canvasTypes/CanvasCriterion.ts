import { CanvasRating } from "./CanvasRating";

// A CanvasCriterion object represents a single criterion in a rubric
export interface CanvasCriterion {
  // the ID of the criterion
  id?: string;
  // short description of the criterion
  description: string | null; // REQUIRED
  // long description of the criterion
  long_description?: string | null;
  // maximum points for this criterion
  points: number; // REQUIRED
  // whether the criterion uses a range of points
  criterion_use_range?: boolean;
  // the possible ratings for this criterion
  ratings: CanvasRating[] | null; // REQUIRED
}
