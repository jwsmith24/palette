import { v4 as uuidv4 } from 'uuid';

export interface RubricRating {
  points: number;
  description: string;
  longDescription: string;
  id?: number;
  key: string; // UUID for React
}

export default function createRating(
  points: number = 0,
  description: string = '',
  longDescription: string = '',
  id: number | undefined = undefined
): RubricRating {
  return {
    points,
    description,
    longDescription,
    id,
    key: uuidv4(),
  };
}
