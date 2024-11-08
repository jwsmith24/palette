import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  CanvasRubric,
  Rubric,
  UpdateRubricRequest,
  UpdateRubricResponse,
} from "palette-types";
import RubricUtils from "../../utils/rubricUtils.js";
import { RubricsAPI } from "../../CanvasAPI/rubricRequests.js";
import config from "../../config.js";
import { isRubricObjectHash } from "../../utils/typeGuards.js";
import { createSuccessResponse } from "../../utils/paletteResponseFactories.js";
import { StatusCodes } from "http-status-codes";

export const handleUpdateRubric = asyncHandler(
  async (req: Request, res: Response) => {
    // todo: I'm making an assumption that we'll look up existing rubrics on canvas, selecting one,
    //  loading it into palette's rubric builder, and changing it, sending it back to the server to update
    // we'll get a rubric object WITH a rubric ID to update as the request body
    const rubricToUpdate = req.body as Rubric;
    // todo: move to updateRubricRequestValidator
    if (!rubricToUpdate.id) {
      throw new Error("Rubric ID required for updating");
    }

    // create the request object for the Canvas API
    const canvasRequest = createCanvasRequest(req.body as Rubric);

    // make the request to the Canvas API
    const canvasResponse: UpdateRubricResponse = await RubricsAPI.updateRubric(
      canvasRequest,
      Number(config!.TEST_COURSE_ID), // dummy course id for testing
    );

    // if the response is successful, the type is a RubricObjectHash
    if (isRubricObjectHash(canvasResponse)) {
      // convert the Canvas format to the palette format
      const data: Rubric = RubricUtils.toPaletteFormat(
        canvasResponse.rubric as CanvasRubric,
      );
      // send the response back to the client
      const paletteResponse = createSuccessResponse(
        data,
        "Rubric updated successfully",
      );
      res.status(StatusCodes.OK).json(paletteResponse);
      return;
    }

    throw new Error("Something went wrong");
  },
);

function createCanvasRequest(rubric: Rubric): UpdateRubricRequest {
  // we need an id here!
  if (!rubric.id) {
    throw new Error("Rubric ID required for updating");
  }

  return {
    id: Number(config!.TEST_RUBRIC_ID),
    rubric_association_id: Number(config!.TEST_ASSIGNMENT_ID),
    rubric: RubricUtils.toCanvasFormat(rubric),
    // optional association update below
    rubric_association: {
      association_id: Number(config!.TEST_ASSIGNMENT_ID),
      association_type: "Assignment",
      use_for_grading: true,
      hide_score_total: false,
      purpose: "grading",
    },
  };
}
