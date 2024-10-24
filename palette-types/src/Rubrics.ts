/**
 * Defines rubric for all application interactions that occur outside the database.
 *
 * All fields are required as a baseline. Frontend and backend modules will use Partials/Omit to filter out what they
 * don't need.
 */
export interface Rubric {
  title: string;
  description: string;
  id: number;
  key: string;
  //rubricCriteria: Criteria [] tbd
}