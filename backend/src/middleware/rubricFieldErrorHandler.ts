import { NextFunction, Request, Response } from "express";
import {
  FieldValidationError,
  Result,
  ValidationError,
  validationResult,
} from "express-validator";
import { StatusCodes } from "http-status-codes";
import { PaletteAPIErrorData, PaletteAPIResponse } from "palette-types";

/**
 * Middleware to handle express-validator errors and return them in the
 * PaletteAPIErrorData format.
 */
export const rubricFieldErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("rubricFieldErrorHandler");
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    // Map the errors to the PaletteAPIErrorData format
    const formattedErrors: PaletteAPIErrorData[] = errors
      .array()
      .map((error: FieldValidationError) => ({
        type: "field", // Error type, could be more specific if needed
        value: error.value as unknown,
        msg: error.msg as string,
        path: error.path,
        location: error.location,
      })) as PaletteAPIErrorData[];

    // send the error response in the desired format
    res.status(StatusCodes.BAD_REQUEST).json({
      data: null,
      success: false,
      error: "FieldValidationError",
      errors: formattedErrors,
    } as PaletteAPIResponse<null>);
  }

  // Proceed to the next middleware if no validation errors
  next();
};
