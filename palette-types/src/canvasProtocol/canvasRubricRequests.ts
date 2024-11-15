import { CanvasCriterion } from "../canvasTypes/CanvasCriterion";
import { CanvasRating } from "../canvasTypes/CanvasRating";

/**
 * This type represents the request body for creating or updating a CanvasRubric.
 */
export interface RubricRequestBody {
  rubric_id?: number;
  course_id: number;
  data?: {
    rubric_association: RubricAssociation;
    rubric: RequestFormattedRubric;
  };
}

/**
 * Defines the rubric fields that can be created (according to the API).
 * All fields appear to be required.
 */
export interface RequestFormattedRubric {
  title: string;
  criteria: RequestFormattedCriteria;
}

/**
 * This looks crazy, but it is just an object of key-value pairs, where the keys are numbers and the values are CanvasCriterion.
 * The ratings for each criterion are also a record whose keys are numbers and values are CanvasRatings.
 *
 * The required format for criteria when creating or updating a rubric.
 *
 */
export type RequestFormattedCriteria = Record<
  number,
  Omit<CanvasCriterion, "ratings"> & { ratings: RequestFormattedRatings }
>;

/**
 * The required format for ratings when creating or updating a rubric criterion.
 */
export type RequestFormattedRatings = Record<number, CanvasRating>;

/**
 * Defines a rubric association object used in create and update requests.
 */
export interface RubricAssociation {
  association_type: "Assignment" | "Course";
  association_id: number;
  use_for_grading: boolean;
  purpose: "grading";
}
