import { CanvasCriterion } from "../canvasTypes/CanvasCriterion";
import { CanvasRating } from "../canvasTypes/CanvasRating";
import { CanvasAssociation } from "../canvasTypes/CanvasAssociation";

/**
 * This type represents the request body for creating a new CanvasRubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.create
 */
export interface CreateRubricRequest {
  id?: number; // The ID of the rubric
  rubric_association_id: number; // The ID of the object associated with the rubric
  rubric: RequestFormattedRubric;
  rubric_association: RequestFormattedAssociation;
}

/**
 * Defines the rubric fields that can be created (according to the API).
 * All fields appear to be required.
 */
export interface RequestFormattedRubric {
  title: string;
  free_form_criterion_comments: boolean;
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
> | null;

/**
 * The required format for ratings when creating or updating a rubric criterion.
 */
export type RequestFormattedRatings = Record<number, CanvasRating> | null;

/**
 * Defines the rubric association fields that can be created (according to the API).
 */
export type RequestFormattedAssociation = Pick<
  CanvasAssociation,
  | "association_id"
  | "association_type"
  | "use_for_grading"
  | "hide_score_total"
  | "purpose"
>;