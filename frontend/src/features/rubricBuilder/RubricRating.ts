import { v4 as uuid } from "uuid";
import { RubricRating as BaseRating } from "../../../../palette-types/src";
import { UNASSIGNED } from "../../utils/constants.ts";

/**
 * Ensures key field is required within the frontend scope.
 */
export interface RubricRating extends BaseRating {
  key: string;
}

/**
 * Rating factory function.
 */
export default function createRating(
  points: number = 0,
  description: string = "",
  longDescription: string = "",
  id: number = UNASSIGNED,
): RubricRating {
  return {
    points,
    description,
    longDescription,
    id,
    key: uuid(),
  };
}
