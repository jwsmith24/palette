import { Criteria } from "./types/criteria.ts";
import { Rubric } from "./types/rubric.ts";

export default function createRubric(
  title: string = "",
  criteria: Criteria[] = [],
  description: string = "Enter description",
  id: number = crypto.getRandomValues(new Uint32Array(1))[0], // default to unique random number if not assigned by
  // the database yet
): Rubric {
  return {
    title,
    criteria,
    description,
    id,
  };
}
