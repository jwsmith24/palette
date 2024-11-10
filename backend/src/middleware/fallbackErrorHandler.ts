import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createErrorResponse } from "../utils/paletteResponseFactories.js";

/**
 * Middleware to handle any uncaught errors.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param _next - The ignored next middleware function in the stack. Because this is intended to be the final error handler in the chain, it does not call the next function.
 */
export const fallbackErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  console.error(`Uncaught error: ${err.message} `);
  const paletteResponse = createErrorResponse(
    err.message || "An unexpected error occurred",
  );
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(paletteResponse);
};
