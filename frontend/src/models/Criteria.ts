import { Criteria } from './types/criteria.ts';
import { Rating } from './types/rating.ts';

import { v4 as uuid } from 'uuid';

/**
 * Helper function to calculate a criterion's max point value on creation
 * @param ratings - array of rating options for target criterion
 */
export const calcMaxPoints = (ratings: Rating[]): number => {
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
export default function createCriterion(
  description: string = '',
  longDescription: string = '',
  points: number = 0,
  ratings: Rating[] = [],
  id: number | undefined = undefined
): Criteria {
  return {
    ratings,
    description,
    longDescription,
    points,
    id,
    key: uuid(),
    updatePoints() {
      this.points = calcMaxPoints(this.ratings);
    },
  };
}
