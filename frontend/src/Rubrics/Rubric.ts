// A Rubric object represents a grading rubric
export interface Rubric {
    id: number; // the ID of the rubric
    title: string; // the title of the rubric
    context_id: number; // the context owning the rubric
    context_type: "Course" | string; // todo: what is context_type?
    points_possible: number; // possible points for the rubric
    reusable: boolean;
    read_only: boolean;
    free_form_criterion_comments: boolean; // whether free-form comments are used
    hide_score_total: boolean;
    data: RubricCriterion[] | null; // An array with all of this Rubric's grading Criteria
    // If an assessment type is included in the 'include' parameter, includes an
    // array of rubric assessment objects for a given rubric, based on the
    // assessment type requested. If the user does not request an assessment type,
    // this key will be absent.
    assessments?: RubricAssessment[] | null;
    // If an association type is included in the 'include' parameter, includes an
    // array of rubric association objects for a given rubric, based on the
    // association type requested. If the user does not request an association type,
    // this key will be absent.
    associations?: RubricAssociation[] | null;
}

// A RubricCriterion object represents a single criterion in a rubric
export interface RubricCriterion {
    // the ID of the criterion
    id: string;
    // short description of the criterion
    description: string | null;
    // long description of the criterion
    long_description: string | null;
    // maximum points for this criterion
    points: number;
    // whether the criterion uses a range of points
    criterion_use_range: boolean;
    // the possible ratings for this criterion
    ratings: RubricRating[] | null;
}

// A RubricRating object represents a rating for a specific criterion in a rubric
export interface RubricRating {
    // the ID of the rating
    id: string;
    // the ID of the associated criterion
    criterion_id: string;
    // short description of the rating
    description: string | null;
    // long description of the rating
    long_description: string | null;
    // points awarded for this rating
    points: number;
}

// A RubricAssessment object represents an assessment using a rubric
export interface RubricAssessment {
    // the ID of the rubric assessment
    id: number;
    // the rubric the assessment belongs to
    rubric_id: number;
    // the association ID for the rubric
    rubric_association_id: number;
    // the score given in this assessment
    score: number;
    // the type of object being assessed
    // todo: verify this is the correct type
    artifact_type: "Submission" | string;
    // the ID of the object being assessed
    artifact_id: number;
    // number of attempts on the object being assessed
    artifact_attempt: number;
    // type of assessment, either 'grading', 'peer_review', or 'provisional_grade'
    assessment_type: RubricAssessmentType;
    // the ID of the user who made the assessment
    assessor_id: number;
    // (Optional) Full details of the assessment if 'full' is requested in the 'style' parameter
    data?: any;
    // (Optional) Comments only if 'comments_only' is requested in the 'style' parameter
    comments?: any;
}

// A RubricAssociation object represents an association between a rubric and another entity
export interface RubricAssociation {
    // the ID of the association
    id: number;
    // the ID of the associated rubric
    rubric_id: number;
    // the ID of the object this association links to
    association_id: number;
    // the type of object this association links to
    association_type: RubricAssociationType;
    // whether the rubric is used for grading
    use_for_grading: boolean;
    // summary data for the association
    summary_data: string;
    // purpose of the association, either 'grading' or 'bookmark'
    purpose: RubricAssociationPurpose
    // whether the score total is displayed within the rubric
    hide_score_total: boolean;
    // whether points are hidden in the rubric
    hide_points: boolean;
    // whether outcome results are hidden
    hide_outcome_results: boolean;
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