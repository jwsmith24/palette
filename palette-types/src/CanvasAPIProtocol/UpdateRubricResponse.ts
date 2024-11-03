import { CanvasAssociation } from "../CanvasAPITypes/CanvasAssociation";
import { CanvasRubric } from "../CanvasAPITypes/CanvasRubric";

/**
 * This type represents the response body for updating a CanvasRubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.update
 */
export interface UpdateRubricResponse {
  rubric: CanvasRubric;
  rubric_association: CanvasAssociation;
}
