/*
Defines properties for Rating options that exist within each criterion.
 */
export interface RatingProps {
  ratingCount: number;
  criteriaIndex: number; // used to track which criteria the rating belongs too to use as a key for React
}
