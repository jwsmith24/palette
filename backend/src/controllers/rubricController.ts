import {RubricsAPI} from "../canvasAPI/rubricRequests.js";
import {Request, Response} from "express";
import asyncHandler from "express-async-handler";
import {GetRubricRequest, PaletteAPIResponse, Rubric, RubricRequestBody, UpdateRubricResponse,} from "palette-types";
import config from "../config.js";
import {createAssignmentAssociation, toCanvasFormat,} from "../utils/rubricUtils.js";
import {isRubricObjectHash} from "../utils/typeGuards.js";
import {createErrorResponse, createSuccessResponse,} from "../utils/paletteResponseFactories.js";

/**
 * Handles the GET request to retrieve a rubric by its ID.
 *
 * @param {Request} _req - The Express request object (not used in this handler).
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const getRubric = asyncHandler(async (req: Request, res: Response) => {
  const { course_id, rubric_id } = req.params;
  // create the request object for the Canvas API
  const canvasRequest: GetRubricRequest = {
    course_id: Number(course_id) || Number(config!.TEST_COURSE_ID),
    rubric_id: Number(rubric_id) || Number(config!.TEST_RUBRIC_ID),
  };

  // make the request to the Canvas API
  const rubric: Rubric = await RubricsAPI.getRubric(canvasRequest);
  const apiResponse: PaletteAPIResponse<Rubric> = {
    data: rubric,
    success: true,
    message: "Here is the rubric",
  };

  res.json(apiResponse);
});

export const getAllRubrics = asyncHandler(
  async (req: Request, res: Response) => {
    const { course_id } = req.params;
    // create the request object for the Canvas API
    const canvasRequest: GetRubricRequest = {
      course_id: Number(course_id) || Number(config!.TEST_COURSE_ID),
    };

    // make the request to the Canvas API
    const rubrics: Rubric[] = await RubricsAPI.getAllRubrics(canvasRequest);
    const apiResponse: PaletteAPIResponse<Rubric[]> = {
      data: rubrics,
      success: true,
      message: "Here are the rubrics!",
    };

    res.json(apiResponse);
  },
);

export const updateRubric = asyncHandler(
  async (req: Request, res: Response) => {
    const { course_id, rubric_id } = req.params;
    console.log("update rubric check");
    console.log("course_id", course_id);
    console.log("rubric_id", rubric_id);

    // package the required information for the rubric request
    const canvasRequest: RubricRequestBody = {
      rubric_id: Number(rubric_id),
      course_id: Number(course_id),
      data: {
        rubric_association: createAssignmentAssociation(Number(course_id)),
        rubric: toCanvasFormat(req.body as Rubric),
      },
    };

    const canvasResponse: UpdateRubricResponse =
      await RubricsAPI.updateRubric(canvasRequest);

    let paletteResponse: PaletteAPIResponse<null>;

    if (isRubricObjectHash(canvasResponse)) {
      paletteResponse = createSuccessResponse(
        null,
        "Rubric updated successfully!",
      );
    } else {
      paletteResponse = createErrorResponse(
        `Rubric update failed: ${
          canvasResponse.errors[0].message || "Unknown error"
        }`,
      );
    }

    res.json(paletteResponse);
  },
);
