import { RequestFormattedCriteria } from "./CreateRubricRequest";
import { CanvasAssociation } from "../canvasTypes/CanvasAssociation";

/**
 * This type represents the request body for updating a CanvasRubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.update
 */
export interface UpdateRubricRequest {
  // Required: The ID of the rubric
  rubric_id: number;
  course_id: number;
  // The ID of the object associated with the rubric
  rubric_association_id?: number;
  rubric: UpdatedRubric;
  rubric_association?: UpdatedRubricAssociation;
}

/*
 * The UpdatedRubric defines the rubric fields that can be updated (according to the API)
 * All fields are optional.
 */
interface UpdatedRubric {
  title?: string;
  free_form_criterion_comments?: boolean;
  skip_updating_points_possible?: boolean;
  criteria?: RequestFormattedCriteria;
}

/**
 * The UpdatedRubricAssociation defines the rubric association fields that can be updated (according to the API)
 * All fields are optional.
 */
type UpdatedRubricAssociation = Partial<
  Pick<
    CanvasAssociation,
    | "association_id"
    | "association_type"
    | "use_for_grading"
    | "hide_score_total"
    | "purpose"
  >
>;
