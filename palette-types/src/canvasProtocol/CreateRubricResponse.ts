import { RubricObjectHash } from "../canvasTypes/RubricObjectHash";
import { CanvasAPIErrorResponse } from "./CanvasAPIErrorResponse";

/**
 * This type represents the response body for creating a new CanvasRubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.create
 */
export type CreateRubricResponse = RubricObjectHash | CanvasAPIErrorResponse;
