/**
 * This type represents the request body for deleting a Rubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.destroy
 */
export interface DeleteSingleRubricRequest {
    course_id: number; // The ID of the course
    id: number;        // The ID of the rubric
}
