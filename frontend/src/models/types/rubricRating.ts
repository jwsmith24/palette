export interface RubricRating {
  points: number;
  description: string;
  longDescription: string;
  id?: number;
  key: string; // UUID for React
}
