import { CanvasRubric } from "../canvasTypes/CanvasRubric";
import { CanvasAssociation } from "../canvasTypes/CanvasAssociation";

/**
 * This type represents the response body for creating a new CanvasRubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.create
 */
export interface CreateRubricResponse {
  rubric: CanvasRubric;
  rubric_association: CanvasAssociation;
}
