import { UNASSIGNED } from "./constants.ts";
import { Rubric, Criteria, Rating } from "../../../palette-types/src";
import { calcMaxPoints } from "./calculateMaxPoints.ts";
import { v4 as uuid } from "uuid";
/**
 * Rubric factory function. Assigns a unique key with uuid.
 */
export function createRubric(
  title: string = "",
  criteria: Criteria[] = [],
  id: number = UNASSIGNED,
  pointsPossible: number = 0,
): Rubric {
  return {
    title,
    pointsPossible,
    criteria,
    id,
    key: uuid(),
  };
}

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
export function createRubricCriterion(
  description: string = "",
  longDescription: string = "",
  points: number = 0,
  ratings: Rating[] = [],
  id: number = UNASSIGNED,
): Criteria {
  return {
    ratings,
    description,
    longDescription,
    points,
    id,
    key: uuid(),
    updatePoints() {
      this.points = Number(calcMaxPoints(this.ratings));
    },
  };
}

/**
 * Rating factory function.
 */
export function createRating(
  points: number = 0,
  description: string = "",
  longDescription: string = "",
  id: number = UNASSIGNED,
): Rating {
  return {
    points,
    description,
    longDescription,
    id,
    key: uuid(),
  };
}
