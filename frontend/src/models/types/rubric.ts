import { RubricCriterion } from "./rubricCriterion.ts";

export interface Rubric {
  title: string;
  rubricCriteria: RubricCriterion[];
  description: string;
  id?: number // id is only assigned when the rubric is saved to the database
}
