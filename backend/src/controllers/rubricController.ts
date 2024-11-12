import {RubricsAPI} from "../canvasAPI/rubricRequests";
import {Request, Response} from "express";
import asyncHandler from "express-async-handler";
import {GetAllRubricsRequest, GetRubricRequest, PaletteAPIResponse, Rubric,} from "palette-types";
import config from "../config";

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

export const getAllRubrics = asyncHandler(
  async (req: Request, res: Response) => {
    const { course_id } = req.params;
    // create the request object for the Canvas API
    const canvasRequest: GetAllRubricsRequest = {
      courseID: Number(course_id) || Number(config!.TEST_COURSE_ID),
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
