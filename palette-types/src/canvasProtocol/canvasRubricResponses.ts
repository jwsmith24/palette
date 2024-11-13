import { CanvasAssociation } from "../canvasTypes/CanvasAssociation";
import { RubricObjectHash } from "../canvasTypes/RubricObjectHash";
import { CanvasRubric } from "../canvasTypes/CanvasRubric";

/**
 * This type represents the response body for creating a new CanvasRubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.create
 */
export type CreateRubricResponse = RubricObjectHash | CanvasAPIErrorResponse;

export type CreateRubricAssociationResponse =
  | CanvasAssociation
  | CanvasAPIErrorResponse;

export type DeleteRubricResponse = CanvasRubric | CanvasAPIErrorResponse;

/**
 * The response object for the request to get all rubrics is either a paginated list of rubrics or an error response.
 */
export type GetAllRubricsResponse = CanvasRubric[] | CanvasAPIErrorResponse;

export type GetRubricResponse = CanvasRubric | CanvasAPIErrorResponse;

/**
 * This type represents the response body for updating a CanvasRubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.update
 */
export type UpdateRubricResponse = RubricObjectHash | CanvasAPIErrorResponse;

export interface CanvasAPIErrorResponse {
  errors: CanvasAPIError[];
}

/**
 * When Canvas returns an error, this object will be in the error field of the response.
 */
export interface CanvasAPIError {
  message: string;
}
