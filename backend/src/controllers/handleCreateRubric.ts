// a controller for the express endpoint that creates a new rubric

import { Request, Response } from 'express';
import {
  CanvasRubric,
  CreateRubricRequest,
  CreateRubricResponse,
  Rubric,
} from 'palette-types';
import {
  newPaletteSuccessResponse,
} from '../utils/paletteResponseFactories.js';
import { RubricsAPI } from '../CanvasAPI/rubricRequests.js';
import config from '../config.js';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { isRubricObjectHash } from '../utils/typeGuards.js';
import RubricUtils from '../utils/rubricUtils.js';

/**
 * Handles the creation of a new rubric.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const handleCreateRubric = asyncHandler(
  async (req: Request, res: Response) => {
    // create the request object for the Canvas API
    const canvasRequest = createCanvasRequest(req.body as Rubric);

    // make the request to the Canvas API
    const canvasResponse: CreateRubricResponse = await RubricsAPI.createRubric(
      canvasRequest,
      Number(config!.COURSE_ID), // dummy course id for testing
    );

    // if the response is successful, the type is a RubricObjectHash
    if (isRubricObjectHash(canvasResponse)) {
      const data: Rubric = RubricUtils.toPaletteFormat(canvasResponse.rubric as CanvasRubric);
      const paletteResponse = newPaletteSuccessResponse(
        data,
        "Rubric created successfully",
      );
      res.status(StatusCodes.CREATED).json(paletteResponse);
      return;
    }
  },
);

/**
 * Creates a request object for the Canvas API.
 *
 * @param {Rubric} rubric - The rubric object to be converted.
 * @returns {CreateRubricRequest} The request object for the Canvas API.
 */
function createCanvasRequest(rubric: Rubric): CreateRubricRequest {
  // todo: this makes a canned request for a specific assignment. Will need updating
  const dummyAssignmentID = Number(config!.ASSIGNMENT_ID);
  return {
    rubric_association_id: dummyAssignmentID,
    rubric: RubricUtils.toCanvasFormat(rubric),
    rubric_association: {
      association_id: dummyAssignmentID,
      association_type: "Assignment",
      use_for_grading: true,
      hide_score_total: false,
      purpose: "grading",
    },
  };
}
