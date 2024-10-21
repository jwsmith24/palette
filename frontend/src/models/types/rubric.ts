import { Criteria } from './criteria.ts';

export interface Rubric {
  title: string;
  rubricCriteria: Criteria[];
  description: string;
  id: number;
}
