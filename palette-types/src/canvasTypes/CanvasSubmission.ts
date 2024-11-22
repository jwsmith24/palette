/**
 * Defines the necessary fields to successfully update a Canvas Submission within the Canvas API.
 *
 * https://canvas.instructure.com/doc/api/submissions.html#method.submissions_api.update
 */
import { CanvasCriterion } from "./CanvasCriterion";

export interface CanvasSubmission {
  id: number; // tracks the submission stored on Canvas
  comment?: {
    text_comment: string; // comment body
  };
  submission?: {
    group_comment: boolean; // should the comment be sent to the entire group?
  };
  rubric_assessment: CanvasCriterion[]; // transformed and graded criteria
}
