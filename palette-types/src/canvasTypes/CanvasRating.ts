// A CanvasRating object represents a rating for a specific criterion in a rubric
export interface CanvasRating {
  // the ID of the rating
  id?: string;
  // the ID of the associated criterion
  criterion_id?: string;
  // short description of the rating
  description: string | null; // REQUIRED
  // long description of the rating
  long_description?: string | null;
  // points awarded for this rating
  points: number; // REQUIRED
}
