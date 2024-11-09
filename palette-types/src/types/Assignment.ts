/**
 * Defines an Assignment object within the Palette context.
 */

export interface Assignment {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  pointsPossible: number;
  rubricId: string; // stores the id of the rubric when needed
}
