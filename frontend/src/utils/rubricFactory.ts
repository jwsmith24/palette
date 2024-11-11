/**
 * Collection of factory functions for the Rubric Builder feature.
 */

import { Rubric, Criteria, Rating, Template } from "../../../palette-types/src";
import { v4 as uuid } from "uuid";
import { calcMaxPoints } from "./calculateMaxPoints.ts";

const DEFAULT_CRITERIA_COUNT = 1;

/**
 * Helper function to populate default criteria.
 */
function populateDefaultCriteria() {
  const criteria: Criteria[] = [];
  for (let i = 0; i < DEFAULT_CRITERIA_COUNT; i++) {
    criteria.push(createCriterion());
  }
  return criteria;
}

/**
 * Helper function to populate default ratings.
 *
 * Each criterion must have a minimum of two rating options that cannot be deleted - full marks and no marks.
 */
function populateDefaultRatings() {
  const ratings: Rating[] = [];
  ratings.push(createRating(5, "Full Marks", ""));
  ratings.push(createRating(0, "No Marks", ""));
  return ratings;
}
/**
 * Rubric factory function. Assigns a unique key with uuid.
 */
export function createRubric(
  title: string = "",
  criteria: Criteria[] = populateDefaultCriteria(),
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
  description: string = "New Criterion",
  longDescription: string = "",
  points: number = 0,
  ratings: Rating[] = populateDefaultRatings(),
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
  description: string = "New Rating",
  longDescription: string = "Add a description",
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
