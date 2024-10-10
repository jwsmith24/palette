import Criteria from "../Criteria.ts";
import Rubric from "../Rubric.ts";

/*
Props for the edit and widget views for the Criteria within the rubric builder.
 */
export interface CriteriaDisplayProps {
  criterion: Criteria; // active criterion being edited
  index: number; // tracks which criteria it is on the Rubric object - used as a key for React
}
