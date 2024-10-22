import { RubricCriterion } from "./types/rubricCriterion.ts";
import { Rubric } from "./types/rubric.ts";

export default function createRubric(
  title: string = "",
  criteria: RubricCriterion[] = [],
  description: string = "Enter description",
): Rubric {
  return {
    title,
    rubricCriteria: criteria,
    description,
  };
}
