import { Criteria } from "./types/criteria.ts";
import { Rating } from "./types/rating.ts";
import createRating from "./Rating.ts";

/**
 * Helper function to calculate a criterion's max point value on creation
 * @param ratings - array of rating options for target criterion
 */
const calcMaxPoints = (ratings: Rating[]): number => {
  // ensure ratings aren't empty
  if (ratings.length > 0) {
    const maxPoints = ratings.reduce(
      (max, current) => (current.points > max.points ? current : max),
      ratings[0],
    ).points;
    console.log(maxPoints);
    return maxPoints;
  } else {
    return 0;
  }
};

// Criterion factory function
export default function createCriterion(
  description: string = "",
  longDescription: string = "",
  ratings: Rating[] = [],
  points: number = 0,
  id: number = crypto.getRandomValues(new Uint32Array(1))[0],
  // default to unique random number if not assigned by
  // the database yet
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
