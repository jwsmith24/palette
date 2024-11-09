/** Common properties shared by all rubric requests */
export interface GetRubricRequest {
  id: number;
  course_id: number;
  params?: RelatedRubricRecord[];
  style?: RubricStyle;
}

/** Style options for rubric display when assessments are included */
type RubricStyle = "full" | "comments_only";

export type RelatedRubricRecord =
  | "assessments"
  | "graded_assessments"
  | "peer_assessments"
  | "associations"
  | "assignment_associations"
  | "course_associations"
  | "account_associations";
