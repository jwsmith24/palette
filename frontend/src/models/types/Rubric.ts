import { RubricCriterion } from './RubricCriterion.ts';
import { v4 as uuid4 } from 'uuid';

export interface Rubric {
  title: string;
  rubricCriteria: RubricCriterion[];
  description: string;
  points?: number;
  id?: number; // will be assigned by the backend once rubric is persisted
  key: string; // unique key for React DOM (with uuid)
}

export default function createRubric(
  title: string = '',
  criteria: RubricCriterion[] = [],
  description: string = 'Enter description',
  id: undefined | number = undefined // defaults to undefined until the db assigns a unique id
): Rubric {
  return {
    title,
    rubricCriteria: criteria,
    description,
    id,
    key: uuid4(),
  };
}
