// A Rubric object represents a grading rubric
export interface Rubric {
    id: number;                             // the ID of the rubric
    title: string;                          // the title of the rubric
    context_id: number;                     // the context owning the rubric
    context_type: "Course" | string;        // todo: what is context_type?
    points_possible: number;                // possible points for the rubric
    reusable: boolean;
    read_only: boolean;
    free_form_criterion_comments: boolean; // whether free-form comments are used
    hide_score_total: boolean;
    data: RubricCriterion[] | null;        // An array with all of this Rubric's grading Criteria

    /**
     * (Optional) If an assessment type is included in the 'include' parameter, includes an
     * array of rubric assessment objects for a given rubric, based on the
     * assessment type requested. If the user does not request an assessment type,
     * this key will be absent.
     */
    assessments?: RubricAssessment[] | null;

    /**
     * (Optional) If an association type is included in the 'include' parameter, includes an
     * array of rubric association objects for a given rubric, based on the
     * association type requested. If the user does not request an association type,
     * this key will be absent.
     */
    associations?: RubricAssociation[] | null;
}

// A RubricCriterion object represents a single criterion in a rubric
export interface RubricCriterion {
    id: string;                      // the ID of the criterion
    description: string | null;      // short description of the criterion
    long_description: string | null; // long description of the criterion
    points: number;                  // maximum points for this criterion
    criterion_use_range: boolean;    // whether the criterion uses a range of points
    ratings: RubricRating[] | null;  // the possible ratings for this criterion
}

// A RubricRating object represents a rating for a specific criterion in a rubric
export interface RubricRating {
    id: string;                      // the ID of the rating
    criterion_id: string;            // the ID of the associated criterion
    description: string | null;      // short description of the rating
    long_description: string | null; // long description of the rating
    points: number;                  // points awarded for this rating
}

// A RubricAssessment object represents an assessment using a rubric
export interface RubricAssessment {
    id: number;                            // the ID of the rubric assessment
    rubric_id: number;                     // the rubric the assessment belongs to
    rubric_association_id: number;         // the association ID for the rubric
    score: number;                         // the score given in this assessment
    artifact_type: "Submission" | string;  // the type of object being assessed
    artifact_id: number;                   // the ID of the object being assessed
    artifact_attempt: number;              // number of attempts on the object being assessed
    assessment_type: RubricAssessmentType; // type of assessment, either 'grading', 'peer_review', or 'provisional_grade'
    assessor_id: number;                   // the ID of the user who made the assessment
    data?: any;                            // (Optional) Full details of the assessment if 'full' is requested in the 'style' parameter
    comments?: any;                        // (Optional) Comments only if 'comments_only' is requested in the 'style' parameter
}

// A RubricAssociation object represents an association between a rubric and another entity
export interface RubricAssociation {
    id: number;                              // the ID of the association
    rubric_id: number;                       // the ID of the associated rubric
    association_id: number;                  // the ID of the object this association links to
    association_type: RubricAssociationType; // the type of object this association links to
    use_for_grading: boolean;                // whether the rubric is used for grading
    summary_data: string;                    // summary data for the association
    purpose: RubricAssociationPurpose        // purpose of the association, either 'grading' or 'bookmark'
    hide_score_total: boolean;               // whether the score total is displayed within the rubric
    hide_points: boolean;                    // whether points are hidden in the rubric
    hide_outcome_results: boolean;           // whether outcome results are hidden
}

// A RubricObjectHash object represents a response from the Rubric API for
// creating a single rubric and update a single rubric requests
interface RubricObjectHash {
    rubric: Rubric;
    rubric_association: RubricAssociation;
}

// A RubricAssociationType is a string representing the type of entity a rubric is associated with
export type RubricAssociationType = "Assignment" | "Course" | "Account";
export type RubricAssociationPurpose = "grading" | "bookmark";
export type RubricAssessmentType =
    "grading"
    | "peer_review"
    | "provisional_grade";