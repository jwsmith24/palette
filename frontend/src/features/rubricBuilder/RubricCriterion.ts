import { v4 as uuidv4 } from "uuid";
import { UNASSIGNED } from "../../utils/constants.ts";
import { RubricRating } from "./RubricRating.ts";
import { RubricCriterion as BaseCriterion } from "../../../../palette-types/src";

/**
 * Frontend extension of RubricCriterion
 *
 * Adds the updatePoints function to the type definition and ensures frontend implementation of RubricRating is used.
 */
export interface RubricCriterion extends BaseCriterion {
  updatePoints: () => void;
  key: string;
  ratings: RubricRating[];
}

/**
 * Helper function to calculate a criterion's max point value when it's pulled in from the backend.
 * @param ratings - array of rating options for target criterion
 */
export const calcMaxPoints = (ratings: RubricRating[]): number => {
  // ensure ratings aren't empty
  if (ratings.length > 0) {
    return ratings.reduce(
      (max, current) => (current.points > max.points ? current : max),
      ratings[0],
    ).points;
  } else {
    return 0;
  }
};

/**
 * Criterion factory function.
 * Sets default values for dynamically added elements but allows to pass in existing values for imports coming from
 * the backend.
 *
 * Generates a unique key for React with a universally unique identifier (UUID).
 *
 * id defaults to -1 to indicate that it was dynamically generated and needs to be assigned an ID when it reaches
 * the backend.
 */
export default function createRubricCriterion(
  description: string = "",
  longDescription: string = "",
  points: number = 0,
  ratings: RubricRating[] = [],
  id: number = UNASSIGNED,
): RubricCriterion {
  return {
    ratings,
    description,
    longDescription,
    points,
    id,
    key: uuidv4(),
    updatePoints() {
      this.points = Number(calcMaxPoints(this.ratings));
    },
  };
}
