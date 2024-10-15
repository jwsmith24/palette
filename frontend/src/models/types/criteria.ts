import { Rating } from "./rating.ts";

export interface Criteria {
  title: string;
  description: string;
  ratings: Rating[];
  id: number;
  getMaxPoints: () => number;
}
