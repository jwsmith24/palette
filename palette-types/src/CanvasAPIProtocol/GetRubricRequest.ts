/** Common properties shared by all rubric requests */
interface BaseGetRubricRequest {
  id: number;
  params?: RelatedRubricRecord[];
  style?: RubricStyle;
}

/** Properties specific to course-level rubric requests */
export interface GetCourseRubricRequest extends BaseGetRubricRequest {
  // not actually part of the request, but used to differentiate between course and account requests
  type: "course";
  course_id: number;
}

/** Properties specific to account-level rubric requests */
export interface GetAccountRubricRequest extends BaseGetRubricRequest {
  // not actually part of the request, but used to differentiate between course and account requests
  type: "account";
  account_id: number;
}

/** Style options for rubric display when assessments are included */
type RubricStyle = "full" | "comments_only";

/**
 * Request type for retrieving a single rubric
 * @see {@link https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics_api.show Canvas LMS API Documentation}
 */
export type GetRubricRequest = GetCourseRubricRequest | GetAccountRubricRequest;

export type RelatedRubricRecord =
  | "assessments"
  | "graded_assessments"
  | "peer_assessments"
  | "associations"
  | "assignment_associations"
  | "course_associations"
  | "account_associations";
