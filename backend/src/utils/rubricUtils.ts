// Utility functions for rubric conversion and miscellaneous operations
import {
  CanvasCriterion,
  CanvasRating,
  CanvasRubric,
  RequestFormattedCriteria,
  RequestFormattedRubric,
  Rubric,
} from "palette-types";

import { v4 as uuid } from "uuid";

/**
 * Transforms the rubric object into the format expected by the Canvas API.
 *
 * @param {Rubric} originalRubric - The original rubric object.
 * @returns {RequestFormattedRubric} - The transformed rubric object.
 */
export const toCanvasFormat = (
  originalRubric: Rubric,
): RequestFormattedRubric => {
  const formattedCriteria: RequestFormattedCriteria = Object.fromEntries(
    originalRubric.criteria.map((criterion, index) => {
      return [
        index,
        {
          description: criterion.description,
          long_description: criterion.longDescription,
          points: criterion.points,
          ratings: Object.fromEntries(
            criterion.ratings.map((rating, ratingIndex) => {
              return [
                ratingIndex,
                {
                  description: rating.description,
                  long_description: rating.longDescription,
                  points: rating.points,
                },
              ];
            }),
          ),
        },
      ];
    }),
  );
  // return the transformed rubric object
  return {
    title: originalRubric.title,
    free_form_criterion_comments: true, // todo: default value
    criteria: formattedCriteria,
  };
};

export const toPaletteFormat = (rubric: CanvasRubric): Rubric => {
  return {
    id: rubric.id,
    title: rubric.title,
    pointsPossible: rubric.points_possible,
    key: uuid(),
    criteria:
      rubric.data?.map((criterion: CanvasCriterion) => {
        return {
          // id: criterion.id,
          description: criterion.description,
          longDescription: criterion.long_description,
          points: criterion.points,
          key: uuid(),
          updatePoints: () => {
            throw new Error("Not implemented");
          },
          ratings: criterion.ratings?.map((rating: CanvasRating) => {
            return {
              // id: rating.id,
              description: rating.description,
              longDescription: rating.long_description,
              points: rating.points,
              key: uuid(),
            };
          }),
        };
      }) || [], // or if there are no criteria, return an empty array
  } as Rubric;
};
