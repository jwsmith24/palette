import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { PaletteAPIErrorData, PaletteAPIResponse } from "palette-types";
import { StatusCodes } from "http-status-codes";
import { createErrorResponse } from "../utils/paletteResponseFactories.js";

/**
 * Middleware to handle express-validator errors and return them in the
 * PaletteAPIErrorData format.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 */
export const validationErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    // keep only the FieldValidationErrors that match our PaletteAPIErrorData type
    const paletteErrors: PaletteAPIErrorData[] = errors
      .array()
      .filter((error) => error.type === "field") as PaletteAPIErrorData[];

    // construct the error response with the first error message
    const response: PaletteAPIResponse<null> = createErrorResponse(
      paletteErrors[0]?.msg || "Invalid field",
      paletteErrors,
    );

    res.status(StatusCodes.BAD_REQUEST).json(response);
    return;
  }

  // Proceed to the next middleware if no validation errors
  next();
};
