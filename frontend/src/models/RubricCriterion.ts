import { RubricCriterion } from "./types/rubricCriterion.ts";
import { RubricRating } from "./types/rubricRating.ts";
import createRating from "./RubricRating.ts";


// Criterion factory function
export default function createRubricCriterion(
  description: string = "",
  longDescription: string = "",
  points: number = 0,
  ratings: RubricRating[] = [createRating(5), createRating(3), createRating(0)],
  // the database yet
): RubricCriterion {
  return {
    ratings,
    description,
    longDescription,
    points,
  };



}
