import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { GetAllRubricsRequest, GetAllRubricsResponse } from "palette-types";
import config from "../../config.js";
import { RubricsAPI } from "../../canvasAPI/rubricRequests.js";
import { StatusCodes } from "http-status-codes";
import { isPaginatedRubricsList } from "../../utils/typeGuards.js";

export const handleGetAllRubrics = asyncHandler(
  async (req: Request, res: Response) => {
    const { course_id } = req.params;
    // create the request object for the Canvas API
    const canvasRequest: GetAllRubricsRequest = {
      courseID: Number(course_id) || Number(config!.TEST_COURSE_ID),
    };

    // make the request to the Canvas API
    const canvasResponse: GetAllRubricsResponse =
      await RubricsAPI.getAllRubrics(canvasRequest);

    // if the response is successful, the type is a paginated list of CanvasRubrics
    if (isPaginatedRubricsList(canvasResponse)) {
      res.status(StatusCodes.OK).json(canvasResponse);
      return;
    }

    throw new Error("Something went wrong");
  },
);
