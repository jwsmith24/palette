// A CanvasAssessment object represents an assessment using a rubric
export interface CanvasAssessment {
  // the ID of the rubric assessment
  id: number;
  // the rubric the assessment belongs to
  rubric_id: number;
  // the association ID for the rubric
  rubric_association_id: number;
  // the score given in this assessment
  score: number;
  // the type of object being assessed
  artifact_type: RubricArtifactType;
  // the ID of the object being assessed
  artifact_id: number;
  // number of attempts on the object being assessed
  artifact_attempt: number;
  // type of assessment, either 'grading', 'peer_review', or 'provisional_grade'
  assessment_type: RubricAssessmentType;
  // the ID of the user who made the assessment
  assessor_id: number;

  /**
   * (Optional) If 'full' is included in the 'style' parameter, returned
   * assessments will have their full details contained in their data hash.
   * If the user does not request a style, this key will be absent.
   */
  data?: never;
  /**
   * (Optional) If 'comments_only' is included in the 'style' parameter, returned
   * assessments will include only the comments portion of their data hash. If the
   * user does not request a style, this key will be absent.
   */
  comments?: never;
}

/**
 * Type of object being assessed by the rubric.
 * Note: Documentation only shows "Submission" as an example.
 * Other values may be possible - consider monitoring actual usage.
 */
export type RubricArtifactType = "Submission";

export type RubricAssessmentType =
  | "grading"
  | "peer_review"
  | "provisional_grade";
