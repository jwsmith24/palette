import asyncHandler from "express-async-handler";
import {Request, Response} from "express";
import {GetRubricRequest, PaletteAPIResponse, Rubric} from "palette-types";
import {RubricsAPI} from "../../canvasAPI/rubricRequests.js";
import config from "../../config.js";

/**
 * Handles the GET request to retrieve a rubric by its ID.
 *
 * @param {Request} _req - The Express request object (not used in this handler).
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const getRubricById = asyncHandler(
  async (req: Request, res: Response) => {
    const { course_id, id } = req.params;
    // create the request object for the Canvas API
    const canvasRequest: GetRubricRequest = {
      course_id: Number(course_id) || Number(config!.TEST_COURSE_ID),
      id: Number(id) || Number(config!.TEST_RUBRIC_ID),
    };

    // make the request to the Canvas API
    const rubric: Rubric = await RubricsAPI.getRubric(canvasRequest);
    const apiResponse: PaletteAPIResponse<Rubric> = {
      data: rubric,
      success: true,
      message: "Here is the rubric",
    };

    res.json(apiResponse);
  },
);
