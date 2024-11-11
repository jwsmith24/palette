import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { GetRubricRequest, GetRubricResponse } from "palette-types";
import { RubricsAPI } from "../../CanvasAPI/rubricRequests.js";
import { isCanvasRubric } from "../../utils/typeGuards.js";
import { StatusCodes } from "http-status-codes";
import config from "../../config.js";

/**
 * Handles the GET request to retrieve a rubric by its ID.
 *
 * @param {Request} _req - The Express request object (not used in this handler).
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const handleGetRubricById = asyncHandler(
  async (req: Request, res: Response) => {
    const { course_id, id } = req.params;
    // create the request object for the Canvas API
    const canvasRequest: GetRubricRequest = {
      course_id: Number(course_id) || Number(config!.TEST_COURSE_ID),
      id: Number(id) || Number(config!.TEST_RUBRIC_ID),
    };

    // make the request to the Canvas API
    const canvasResponse: GetRubricResponse =
      await RubricsAPI.getRubric(canvasRequest);

    // if the response is successful, the type is a CanvasRubric
    if (isCanvasRubric(canvasResponse)) {
      res.status(StatusCodes.OK).json(canvasResponse);
      return;
    }

    throw new Error("Something went wrong");
  },
);
