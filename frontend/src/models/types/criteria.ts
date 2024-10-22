import { Rating } from "./rating";

export interface Criteria {
  description: string;
  longDescription: string;
  ratings: Rating[];
  id?: number;
  points: number;
  key: string;
}