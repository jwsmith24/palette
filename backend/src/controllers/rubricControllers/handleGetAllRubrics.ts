import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  GetAllRubricsRequest,
  PaletteAPIResponse,
  Rubric,
} from "palette-types";
import config from "../../config.js";
import { RubricsAPI } from "../../canvasAPI/rubricRequests.js";

export const handleGetAllRubrics = asyncHandler(
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
