import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  CanvasRubric,
  Rubric,
  UpdateRubricRequest,
  UpdateRubricResponse,
} from "palette-types";
import { toCanvasFormat, toPaletteFormat } from "../../utils/rubricUtils.js";
import { RubricsAPI } from "../../canvasAPI/rubricRequests.js";
import config from "../../config.js";
import { isRubricObjectHash } from "../../utils/typeGuards.js";
import { createSuccessResponse } from "../../utils/paletteResponseFactories.js";
import { StatusCodes } from "http-status-codes";

export const handleUpdateRubric = asyncHandler(
  async (req: Request, res: Response) => {
    const { course_id, id } = req.params;

    // create the request object for the Canvas API
    const canvasRequest: UpdateRubricRequest = createCanvasRequest(
      Number(id),
      Number(course_id),
      req.body as Rubric,
    );

    // make the request to the Canvas API
    const canvasResponse: UpdateRubricResponse = await RubricsAPI.updateRubric(
      canvasRequest,
      Number(course_id) || Number(config!.TEST_COURSE_ID),
    );

    // if the response is successful, the type is a RubricObjectHash
    if (isRubricObjectHash(canvasResponse)) {
      // convert the Canvas format to the palette format
      const data: Rubric = toPaletteFormat(
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

// ASSUMPTION: this assumes that this rubric should be associated the course that it's being updated in and not an assignment
function createCanvasRequest(
  rubricID: number,
  courseID: number,
  rubric: Rubric,
): UpdateRubricRequest {
  return {
    id: rubricID || Number(config!.TEST_RUBRIC_ID),
    rubric_association_id: courseID || Number(config!.TEST_COURSE_ID),
    rubric: toCanvasFormat(rubric),
    // optional association update below
    // if we use canvas types globally we can just use the existing association if we don't want to update it
    // rubric_association: {
    //   association_id: courseID || Number(config!.TEST_COURSE_ID),
    //   association_type: "Course",
    //   use_for_grading: true,
    //   hide_score_total: false,
    //   purpose: "grading",
    // },
  };
}
