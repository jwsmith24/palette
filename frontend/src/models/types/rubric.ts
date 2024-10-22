import { RubricCriterion } from "./rubricCriterion.ts";

export interface Rubric {
  title: string;
  rubricCriteria: RubricCriterion[];
  description: string;
  id?: number; // will be assigned by the backend once rubric is persisted
  key: string; // unique key for React DOM (with uuid)
}
