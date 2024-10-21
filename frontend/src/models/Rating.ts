import { Rating } from "./types/rating.ts";
import { v4 as uuid } from "uuid";

export default function createRating(
  points: number = 0,
  description: string = "",
  longDescription: string = "",
  id: number | undefined = undefined,
): Rating {
  return {
    points,
    description,
    longDescription,
    id,
    key: uuid(),
  };
}
