import { RubricObjectHash } from "../canvasTypes/RubricObjectHash";
import { CanvasAPIErrorResponse } from "./CanvasAPIErrorResponse";

/**
 * This type represents the response body for updating a CanvasRubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.update
 */
export type UpdateRubricResponse = RubricObjectHash | CanvasAPIErrorResponse;
