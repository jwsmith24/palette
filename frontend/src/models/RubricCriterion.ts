import { RubricCriterion } from "./types/rubricCriterion.ts";
import { RubricRating } from "./types/rubricRating.ts";
import createRating from "./RubricRating.ts";
import { v4 as uuidv4 } from "uuid";

// Criterion factory function
export default function createRubricCriterion(
  description: string = "",
  longDescription: string = "",
  points: number = 0,
  ratings: RubricRating[] = [createRating(5), createRating(3), createRating(0)],
  id: number | undefined = undefined, // defaults to undefined until the db assigns a unique id the database yet
): RubricCriterion {
  return {
    ratings,
    description,
    longDescription,
    points,
    id,
    key: uuidv4(),
  };
}
