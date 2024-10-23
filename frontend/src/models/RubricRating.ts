import { RubricRating } from "./types/rubricRating.ts";
import { v4 as uuidv4 } from "uuid";

export default function createRating(
  points: number = 0,
  description: string = "",
  longDescription: string = "",
  id: number | undefined = undefined,
): RubricRating {
  return {
    points,
    description,
    longDescription,
    id,
    key: uuidv4(),
  };
}
