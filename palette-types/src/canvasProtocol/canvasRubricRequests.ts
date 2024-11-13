import { CanvasAssociation } from "../canvasTypes/CanvasAssociation";
import { CanvasCriterion } from "../canvasTypes/CanvasCriterion";
import { CanvasRating } from "../canvasTypes/CanvasRating";

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
>;

/**
 * The required format for ratings when creating or updating a rubric criterion.
 */
export type RequestFormattedRatings = Record<number, CanvasRating>;

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

/**
 * This type represents the parameters for deleting a CanvasRubric.
 * This is not a request body, but a set of two query parameters.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.destroy
 */
export interface DeleteRubricRequest {
  course_id: number; // The ID of the course
  id: number; // The ID of the rubric
}

export interface GetAllRubricsRequest {
  courseID: number;
}

/** Common properties shared by all rubric requests */
export interface GetRubricRequest {
  id: number;
  course_id: number;
  params?: RelatedRubricRecord[];
  style?: RubricStyle;
}

/** Style options for rubric display when assessments are included */
type RubricStyle = "full" | "comments_only";

export type RelatedRubricRecord =
  | "assessments"
  | "graded_assessments"
  | "peer_assessments"
  | "associations"
  | "assignment_associations"
  | "course_associations"
  | "account_associations";

export interface CreateRubricAssociationRequest {
  rubric_association: RubricAssociationData;
}

/**
 * The request payload for creating a new rubric association.
 * These are the only fields necessary to create a new rubric association.
 */
export type RubricAssociationData = Omit<
  CanvasAssociation,
  "id" | "summary_data" | "hide_outcome_results" | "hide_points"
> & {
  // the title of the rubric
  title: string;
  // whether the rubric is visible in its associated context
  bookmarked: boolean;
};

/**
 * This type represents the request body for updating a CanvasRubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.update
 */
export interface UpdateRubricRequest {
  // Required: The ID of the rubric
  rubric_id: number;
  course_id: number;
  // The ID of the object associated with the rubric
  rubric_association_id?: number;
  rubric: UpdatedRubric;
  rubric_association?: UpdatedRubricAssociation;
}

/**
 * The UpdatedRubric defines the rubric fields that can be updated (according to the API)
 * All fields are optional.
 */
interface UpdatedRubric {
  title?: string;
  free_form_criterion_comments?: boolean;
  skip_updating_points_possible?: boolean;
  criteria?: RequestFormattedCriteria;
}

/**
 * The UpdatedRubricAssociation defines the rubric association fields that can be updated (according to the API)
 * All fields are optional.
 */
type UpdatedRubricAssociation = Partial<
  Pick<
    CanvasAssociation,
    | "association_id"
    | "association_type"
    | "use_for_grading"
    | "hide_score_total"
    | "purpose"
  >
>;
