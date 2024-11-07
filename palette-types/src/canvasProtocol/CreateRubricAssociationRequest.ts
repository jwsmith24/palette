import { CanvasAssociation } from "../canvasTypes/CanvasAssociation";

export interface CreateRubricAssociationRequest {
  rubric_association: RubricAssociationData;
}

/**
 * The request payload for creating a new rubric association.
 * These are the only fields necessary to create a new rubric association.
 */
export type RubricAssociationData = Omit<
  CanvasAssociation,
  "id" | "summary_data" | "hide_outcome_results" | "hide_points"
> & {
  // the title of the rubric
  title: string;
  // whether the rubric is visible in its associated context
  bookmarked: boolean;
};
