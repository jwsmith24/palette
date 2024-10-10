/*
Defines properties for Rating options that exist within each criterion.
 */
import Criteria from "../Criteria.ts";
import Rating from "../Rating.ts";

export interface RatingInputProps {
  entry: Rating;
  key: string; // used to track which criteria the rating belongs too to use as a key for React
  ratingIndex: number; // so rating knows its order in the array
  onChange: (index: number, updatedRating: Rating) => void;
}
