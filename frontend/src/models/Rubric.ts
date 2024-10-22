import { Criteria } from "./types/criteria.ts";
import { Rubric } from "./types/rubric.ts";
import { v4 as uuid } from "uuid";

export default function createRubric(
  title: string = '',
  criteria: Criteria[] = [],
  description: string = "Enter description",
  id: undefined | number = undefined, // defaults to undefined until the db assigns a unique id
): Rubric {
  return {
    title,
    rubricCriteria: criteria,
    description,
    id,
    key: uuid(), // generates unique uuid string for React DOM
  };
}
