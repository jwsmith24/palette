import { RubricCriterion } from "./types/rubricCriterion.ts";
import { Rubric } from "./types/rubric.ts";
import { v4 as uuidv4 } from "uuid";

export default function createRubric(
  title: string = "",
  rubricCriteria: RubricCriterion[] = [],
  description: string = "Enter description",
  id: number | undefined = undefined, // defaults to undefined until the db assigns a unique id the database yet
  // the database yet
): Rubric {
  return {
    title,
    rubricCriteria,
    description,
    id,
    key: uuidv4(),
  };
}
