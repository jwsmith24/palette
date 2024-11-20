import { RubricsAPI } from "../canvasAPI/rubricRequests.js";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  CreateRubricResponse,
  PaletteAPIResponse,
  Rubric,
  RubricRequestBody,
  UpdateRubricResponse,
} from "palette-types";
import {
  createAssignmentAssociation,
  toCanvasFormat,
} from "../utils/rubricUtils.js";
import { isRubricObjectHash } from "../utils/typeGuards.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../utils/paletteResponseFactories.js";

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
  const canvasRequest: RubricRequestBody = {
    course_id: Number(course_id),
    rubric_id: Number(rubric_id),
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
    const canvasRequest: RubricRequestBody = {
      course_id: Number(course_id),
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

export const createRubric = asyncHandler(
  async (req: Request, res: Response) => {
    const { course_id, assignment_id } = req.params;

    const canvasRequest: RubricRequestBody = {
      course_id: Number(course_id),
      data: {
        rubric_association: createAssignmentAssociation(Number(assignment_id)),
        rubric: toCanvasFormat(req.body as Rubric),
      },
    };

    const canvasResponse: CreateRubricResponse =
      await RubricsAPI.createRubric(canvasRequest);

    const apiResponse: PaletteAPIResponse<unknown> = {
      data: canvasResponse,
      success: true,
      message: "New rubric created successfully",
    };

    res.json(apiResponse);
  },
);

export const updateRubric = asyncHandler(
  async (req: Request, res: Response) => {
    const { course_id, rubric_id, assignment_id } = req.params;

    // package the required information for the rubric request
    const canvasRequest: RubricRequestBody = {
      rubric_id: Number(rubric_id),
      course_id: Number(course_id),
      data: {
        rubric_association: createAssignmentAssociation(Number(assignment_id)),
        rubric: toCanvasFormat(req.body as Rubric),
      },
    };

    const canvasResponse: UpdateRubricResponse =
      await RubricsAPI.updateRubric(canvasRequest);

    let paletteResponse: PaletteAPIResponse<unknown>;

    if (isRubricObjectHash(canvasResponse)) {
      paletteResponse = createSuccessResponse(
        canvasResponse.rubric,
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
