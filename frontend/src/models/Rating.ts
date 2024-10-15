import { Rating } from "./types/rating.ts";

export default function createRating(
  points: number = 0,
  description: string = "",
  id: number = crypto.getRandomValues(new Uint32Array(1))[0], // default to unique random number if not assigned by
  // the database yet
): Rating {
  return {
    points,
    description,
    id,
  };
}
