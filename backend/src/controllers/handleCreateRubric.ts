// a controller for the express endpoint that creates a new rubric

import { Request, Response } from 'express';
import {
  CanvasCriterion,
  CanvasRating,
  CanvasRubric,
  CreateRubricRequest,
  CreateRubricResponse,
  newPaletteErrorResponse,
  newPaletteSuccessResponse,
  RequestFormattedCriteria,
  RequestFormattedRubric,
  Rubric,
} from 'palette-types';
import { CanvasAPIResponse, RubricsAPI } from '../CanvasAPI/Rubrics.js';
import config from '../config.js';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

/**
 * Handles the creation of a new rubric.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const handleCreateRubric = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("Request body:", req.body);

    // create the request object for the Canvas API
    const canvasRequest = createCanvasRequest(req.body as Rubric);

    // make the request to the Canvas API
    const canvasResponse: CanvasAPIResponse<CreateRubricResponse> =
      await RubricsAPI.createRubric(canvasRequest, Number(config!.COURSE_ID));

    // send the correct response to the frontend
    handleCanvasResponse(res, canvasResponse);
  },
);

function createCanvasRequest(rubric: Rubric): CreateRubricRequest {
  // todo: this makes a canned request for a specific assignment. Will need updating
  const dummyAssignmentID = Number(config!.ASSIGNMENT_ID);
  return {
    rubric_association_id: dummyAssignmentID,
    rubric: toCanvasFormat(rubric),
    rubric_association: {
      association_id: dummyAssignmentID,
      association_type: "Assignment",
      use_for_grading: true,
      hide_score_total: false,
      purpose: "grading",
    },
  };
}

function handleCanvasResponse(
  res: Response,
  canvasResponse: CanvasAPIResponse<CreateRubricResponse>,
) {
  if (canvasResponse.success) {
    const data = toPaletteFormat(canvasResponse.data?.rubric as CanvasRubric);
    const paletteResponse = newPaletteSuccessResponse(
      data,
      "Rubric created successfully",
    );
    res.status(StatusCodes.CREATED).json(paletteResponse);
  } else {
    // todo: refactor with specific canvas feedback (spoiler: it's not very good)
    const paletteResponse = newPaletteErrorResponse(
      canvasResponse.error || "Failed to create rubric",
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(paletteResponse);
  }
}

/**
 * Transforms the rubric object into the format expected by the Canvas API.
 *
 * @param {Rubric} originalRubric - The original rubric object.
 * @returns {RequestFormattedRubric} - The transformed rubric object.
 */
function toCanvasFormat(originalRubric: Rubric): RequestFormattedRubric {
  // turn the criteria (and its nested ratings) into their request formatted equivalent
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
    free_form_criterion_comments: false, // todo: default value
    criteria: formattedCriteria,
  };
}

/**
 * Formats a rubric object from the Canvas API into the format expected by the frontend.
 *
 * @param {CanvasRubric} rubric - The rubric object from the Canvas API.
 * @returns {Rubric} - The formatted rubric object.
 */
function toPaletteFormat(rubric: CanvasRubric): Rubric {
  // turn the criteria (and its nested ratings) into their request formatted equivalent
  return {
    title: rubric.title,
    pointsPossible: rubric.points_possible,
    criteria:
      rubric.data?.map((criterion: CanvasCriterion) => {
        return {
          description: criterion.description,
          longDescription: criterion.long_description,
          points: criterion.points,
          ratings: criterion.ratings?.map((rating: CanvasRating) => {
            return {
              description: rating.description,
              longDescription: rating.long_description,
              points: rating.points,
            };
          }),
        };
      }) || [], // or if there are no criteria, return an empty array
  } as Rubric; // trust me, it's a rubric (minus the key)
}
