/**
 * Collection of factory functions for the Rubric Builder feature.
 */

import { Rubric, Criteria, Rating, Template } from "../../../palette-types/src";
import { calcMaxPoints } from "./calculateMaxPoints.ts";
import { v4 as uuid } from "uuid";

/**
 * Rubric factory function. Assigns a unique key with uuid.
 */
export function createRubric(
  title: string = "",
  criteria: Criteria[] = [],
  id?: number,
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
 * id is only assigned if criterion is being imported from Canvas.
 */
export function createCriterion(
  description: string = "",
  longDescription: string = "",
  points: number = 0,
  ratings: Rating[] = [],
  id?: number,
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
  id?: number,
): Rating {
  return {
    points,
    description,
    longDescription,
    id,
    key: uuid(),
  };
}

/**
 * Template factory function.
 */
export function createTemplate(
  title: string = "",
  criteria: Criteria[] = [],
  id?: number,
): Template {
  return {
    title,
    criteria: criteria,
    id,
    key: uuid(),
  };
}
