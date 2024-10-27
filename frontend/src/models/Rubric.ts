import { RubricCriterion } from './RubricCriterion.ts';
import { v4 as uuidv4 } from 'uuid';

export interface Rubric {
  title: string;
  rubricCriteria: RubricCriterion[];
  description: string;
  points?: number;
  id?: number; // will be assigned by the backend once rubric is persisted
  key?: string; // unique key for React DOM (with uuid)
}

export default function createRubric(
  title: string = '',
  criteria: RubricCriterion[] = [],
  description: string = 'Enter description',
  id: number = -1
): Rubric {
  return {
    title,
    rubricCriteria: criteria,
    description,
    id,
    key: uuidv4(),
  };
}
