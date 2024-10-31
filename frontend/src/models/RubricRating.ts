import { v4 as uuid } from "uuid";
import { RubricRating } from "../../../palette-types/src";
import { UNASSIGNED } from "../../../palette-types/src/constants.ts";

export default function createRating(
  points: number = 0,
  description: string = "",
  longDescription: string = "",
  id: number = UNASSIGNED,
): RubricRating {
  return {
    points,
    description,
    longDescription,
    id,
    key: uuid(),
  };
}
