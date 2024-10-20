import { Criteria } from "./types/criteria.ts";
import { Rating } from "./types/rating.ts";
import createRating from "./Rating.ts";


// Criterion factory function
export default function createCriterion(
  description: string = "",
  longDescription: string = "",
  points: number = 0,
  ratings: Rating[] = [createRating(5), createRating(3), createRating(0)],
  id: number = crypto.getRandomValues(new Uint32Array(1))[0], // default to unique random number if not assigned by
  // the database yet
): Criteria {
  return {
    ratings,
    description,
    longDescription,
    points,
    id,
  };



}
