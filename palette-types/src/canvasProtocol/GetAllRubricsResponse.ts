import { CanvasAPIErrorResponse } from "./CanvasAPIErrorResponse";
import { CanvasRubric } from "../canvasTypes/CanvasRubric";

/**
 * The reponse object for the request to get all rubrics is either a paginated list of rubrics or an error response.
 */
export type GetAllRubricsResponse = CanvasRubric[] | CanvasAPIErrorResponse;
