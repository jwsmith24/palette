// a controller for the express endpoint that creates a new rubric

import { Request, Response } from "express";
import { Template } from "palette-types";
import { createSuccessResponse } from "../utils/paletteResponseFactories.js";
import { RubricsAPI } from "../CanvasAPI/rubricRequests.js";
import config from "../config.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { isRubricObjectHash } from "../utils/typeGuards.js";
import RubricUtils from "../utils/rubricUtils.js";
