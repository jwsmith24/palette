// a controller for the express endpoint that creates a new template

import { Request, Response } from "express";
import { Template } from "palette-types";
import { createSuccessResponse } from "../utils/paletteResponseFactories.js";
import config from "../config.js";
import asyncHandler from "express-async-handler";

/*
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const handleCreateTemplate = asyncHandler(
  async (req: Request, res: Response) => {}

  // TODO: Prisma model / Postgres
);
