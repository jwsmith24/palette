import { RubricCriterion } from "./RubricCriterion.ts"; // frontend extension defined locally
import { v4 as uuidv4 } from "uuid";
import { Rubric as BaseRubric } from "../../../../palette-types/src";
import { UNASSIGNED } from "../../utils/constants.ts";

/**
 * Extend global rubric type but ensure key is a required field for the frontend.
 */
export interface Rubric extends BaseRubric {
  key: string;
  rubricCriteria: RubricCriterion[];
}

/**
 * Rubric factory function. Assigns a unique key with uuid.
 */
export function createRubric(
  title: string = "",
  rubricCriteria: RubricCriterion[] = [],
  id: number = UNASSIGNED,
  pointsPossible: number = 0,
): Rubric {
  return {
    title,
    pointsPossible,
    rubricCriteria,
    id,
    key: uuidv4(),
  };
}
