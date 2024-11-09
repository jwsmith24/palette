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
