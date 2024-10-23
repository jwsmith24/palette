import { RubricCriterion } from './types/rubricCriterion';
import { Rubric } from './types/rubric.ts';
import { v4 as uuid4 } from 'uuid';

export default function createRubric(
  title: string = '',
  criteria: RubricCriterion[] = [],
  description: string = 'Enter description',
  id: undefined | number = undefined // defaults to undefined until the db assigns a unique id
): Rubric {
  return {
    title,
    rubricCriteria,
    description,
    id,
    key: uuidv4(),
  };
}
