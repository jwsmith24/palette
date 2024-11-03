import { RubricRating } from "./RubricRating";
import { Template } from "./Template";
import { v4 as uuidv4 } from "uuid";

export interface RubricCriterion {
  description: string;
  longDescription: string;
  ratings: RubricRating[];
  id?: number; // id is only assigned when the rubric is saved to the database
  points: number;
  template: string;
  updatePoints: () => void;
  key: string; // UUID for React
}

/**
 * Helper function to calculate a criterion's max point value on creation
 * @param ratings - array of rating options for target criterion
 */
export const calcMaxPoints = (ratings: RubricRating[]): number => {
  // ensure ratings aren't empty
  if (ratings.length > 0) {
    return ratings.reduce(
      (max, current) => (current.points > max.points ? current : max),
      ratings[0]
    ).points;
  } else {
    return 0;
  }
};

/**
 * Criterion factory function.
 */
export default function createRubricCriterion(
  description: string = "",
  longDescription: string = "",
  points: number = 0,
  ratings: RubricRating[] = [],
  id: number | undefined = undefined,
  template: string = ""
): RubricCriterion {
  return {
    ratings,
    description,
    longDescription,
    points,
    id,
    template,
    key: uuidv4(),
    updatePoints() {
      this.points = Number(calcMaxPoints(this.ratings));
    },
  };
}
