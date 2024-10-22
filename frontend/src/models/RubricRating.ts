import {RubricRating} from "./types/rubricRating.ts";

export default function createRating(
    points: number = 0,
    description: string = "",
    longDescription: string = "",
): RubricRating {
    return {
        points,
        description,
        longDescription,
    };
}
