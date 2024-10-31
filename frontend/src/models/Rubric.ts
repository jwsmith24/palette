import { RubricCriterion } from "./RubricCriterion.ts"; // frontend extension defined locally
import { v4 as uuidv4 } from "uuid";
import { Rubric } from "../../../palette-types/src";
import { UNASSIGNED } from "../../../palette-types/src/constants.ts";

export default function createRubric(
  title: string = "",
  criteria: RubricCriterion[] = [],
  pointsPossible: number = 0,
  id: number = UNASSIGNED,
): Rubric {
  return {
    title,
    pointsPossible,
    rubricCriteria: criteria,
    id,
    key: uuidv4(),
  };
}
