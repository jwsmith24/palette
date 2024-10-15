import { Criteria } from "./types/criteria.ts";
import { Rating } from "./types/rating.ts";

// Criterion factory function
export default function createCriterion(
  title: string = "",
  description: string = "",
  longDescription: string = "",
  ratings: Rating[] = [],
  id: number = crypto.getRandomValues(new Uint32Array(1))[0], // default to unique random number if not assigned by
  // the database yet
): Criteria {
  return {
    title,
    ratings,
    description,
    longDescription,
    id,
    getMaxPoints() {
      if (this.ratings.length === 0) {
        return 0; // Handle empty ratings array
      }
      const maxRating = this.ratings.reduce(
        (max, current) => (current.points > max.points ? current : max),
        this.ratings[0],
      );
      return maxRating.points;
    },
  };
}
