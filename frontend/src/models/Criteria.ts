import { Criteria } from "./types/criteria.ts";
import { Rating } from "./types/rating.ts";

import { v4 as uuid } from "uuid";

// Criterion factory function
export default function createCriterion(
  description: string = '',
  longDescription: string = '',
  points: number = 0,
  ratings: Rating[] = [],
  id: number | undefined = undefined,
): Criteria {
  return {
    ratings,
    description,
    longDescription,
    points,
    id,
    key: uuid(),
  };



}
