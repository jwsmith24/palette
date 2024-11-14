import { RubricsAPI } from "../canvasAPI/rubricRequests.js";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  CreateRubricAssociationRequest,
  CreateRubricRequest,
  DeleteRubricRequest,
  GetAllRubricsRequest,
  GetRubricRequest,
  PaletteAPIResponse,
  Rubric,
} from "palette-types";
import config from "../config.js";
import { toCanvasFormat } from "../utils/rubricUtils.js";
import { createSuccessResponse } from "../utils/paletteResponseFactories.js";
import { StatusCodes } from "http-status-codes";

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

/**
 * Handles the creation of a new rubric.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const createRubric = asyncHandler(
  async (req: Request, res: Response) => {
    const { course_id } = req.params;

    // create the request object for the Canvas API
    const canvasRequest = createRubricRequest(
      req.body as Rubric,
      Number(course_id),
    );

    // make the request to the Canvas API
    const canvasResponse: Rubric = await RubricsAPI.createRubric(
      canvasRequest,
      Number(course_id),
    );

    // send the response back to the client
    const paletteResponse: PaletteAPIResponse<Rubric> = createSuccessResponse(
      canvasResponse,
      "Rubric created successfully",
    );
    res.status(StatusCodes.CREATED).json(paletteResponse);
    return;
  },
);

export const deleteRubric = asyncHandler(
  async (req: Request, res: Response) => {
    const { course_id, id } = req.params;

    // create the request object for the Canvas API
    const deleteRequest: DeleteRubricRequest = {
      course_id: Number(course_id),
      id: Number(id),
    };

    // make the request to the Canvas API
    const canvasResponse: Rubric = await RubricsAPI.deleteRubric(deleteRequest);

    // send the response back to the client
    const paletteResponse: PaletteAPIResponse<Rubric> = createSuccessResponse(
      canvasResponse,
      "Rubric deleted successfully",
    );
    res.status(StatusCodes.OK).json(paletteResponse);
    return;
  },
);

/**
 * Handles the creation of a new rubric association.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const createRubricAssociation = asyncHandler(
  async (req: Request, res: Response) => {
    // build the request
    const { course_id } = req.params;

    // use the canned request for now
    const request: CreateRubricAssociationRequest =
      createNewRubricAssociationRequest();

    // make the api call
    const response: Rubric = await RubricsAPI.createRubricAssociation(
      request,
      Number(course_id),
    );

    const data: PaletteAPIResponse<Rubric> = createSuccessResponse(
      response,
      "Rubric association created successfully",
    );
    res.status(StatusCodes.CREATED).json(data);
    return;
  },
);

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
 * Creates a request object for creating a rubric using the Canvas API.
 *
 * @param {Rubric} rubric - The rubric object to be converted.
 * @param courseID - The ID of the course to associate the rubric with.
 * @returns {CreateRubricRequest} The request object for the Canvas API.
 */
function createRubricRequest(
  rubric: Rubric,
  courseID: number,
): CreateRubricRequest {
  return {
    rubric_association_id: courseID,
    rubric: toCanvasFormat(rubric),
    rubric_association: {
      association_id: courseID,
      association_type: "Course",
      use_for_grading: true,
      hide_score_total: false,
      purpose: "grading",
    },
  };
}
