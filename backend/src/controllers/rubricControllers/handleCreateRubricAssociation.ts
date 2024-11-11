import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CreateRubricAssociationRequest } from "palette-types";
import config from "../../config.js";
import { RubricsAPI } from "../../CanvasAPI/rubricRequests.js";
import { isRubricObjectHash } from "../../utils/typeGuards.js";
import { createSuccessResponse } from "../../utils/paletteResponseFactories.js";
import { StatusCodes } from "http-status-codes";

/**
 * Creates a new rubric association request.
 * @returns {CreateRubricAssociationRequest} The request object for the Canvas API.
 */
function createNewRubricAssociationRequest(): CreateRubricAssociationRequest {
  // todo - this is a canned request for a specific assignment. Will need updating
  return {
    rubric_association: {
      rubric_id: Number(config!.TEST_RUBRIC_ID),
      association_id: Number(config!.TEST_ASSIGNMENT_ID),
      association_type: "Assignment",
      title: "wrong title",
      use_for_grading: true,
      hide_score_total: false,
      purpose: "grading",
      bookmarked: false,
    },
  };
}

/**
 * Handles the creation of a new rubric association.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const handleCreateRubricAssociation = asyncHandler(
  async (req: Request, res: Response) => {
    // build the request
    const { course_id } = req.params;
    const request = createNewRubricAssociationRequest();

    // make the api call
    const response = await RubricsAPI.createRubricAssociation(
      request,
      Number(course_id) || Number(config!.TEST_COURSE_ID),
    );

    // Canvas Documentation is wrong on the return type. It actually returns a RubricObjectHash and not a RubricAssociation
    if (isRubricObjectHash(response)) {
      const data = createSuccessResponse(
        null,
        "Rubric association created successfully",
      );
      res.status(StatusCodes.CREATED).json(data);
      return;
    }

    // uh-oh
    throw new Error("Failed to create rubric association");
  },
);
