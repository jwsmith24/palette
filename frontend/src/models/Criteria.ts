import { Criteria } from "./types/criteria.ts";
import { Rating } from "./types/rating.ts";

/**
 * Helper function to calculate a criterion's max point value on creation
 * @param ratings - array of rating options for target criterion
 */
export const calcMaxPoints = (ratings: Rating[]): number => {
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
 */
export default function createCriterion(
  description: string = "",
  longDescription: string = "",
  ratings: Rating[] = [],
  points: number = 0,
  id: number = crypto.getRandomValues(new Uint32Array(1))[0],
  // defaults to unique random number if not assigned by the database yet
): Criteria {
  return {
    ratings,
    description,
    longDescription,
    points,
    id,
    updatePoints() {
      this.points = calcMaxPoints(this.ratings);
    },
  };
}
