import { Criteria } from "./criteria.ts";

export interface Rubric {
  title: string;
  criteria: Criteria[];
  description: string;
  id: number;
}
