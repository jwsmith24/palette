// A CanvasAssociation object represents an association between a rubric and another entity
export interface CanvasAssociation {
  // the ID of the association
  id?: number;
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
  purpose: RubricAssociationPurpose;
  /**
   * Whether or not the score total is displayed within the rubric. This option is
   * only available if the rubric is not used for grading.
   */
  hide_score_total: boolean;
  // whether points are hidden in the rubric
  hide_points: boolean;
  // whether outcome results are hidden
  hide_outcome_results: boolean;
}

export type RubricAssociationType = "Assignment" | "Course" | "Account";
export type RubricAssociationPurpose = "grading" | "bookmark";
