import { CanvasAssociation, CanvasRubric } from "src/index";

/**
 * This type represents the return value of the Canvas API when creating, updating a rubric.
 */
export interface RubricObjectHash {
  rubric: CanvasRubric;
  rubric_association: CanvasAssociation;
}
