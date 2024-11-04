/**
 * Defines a Course object within the Palette context.
 */

export interface Course {
  id: number; // REQUIRED: Courses will always have IDs already assigned by Canvas
  name: string;
  description: string;
  credits: number;
  key: string;
}
