import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import path from "path";
import asyncHandler from "express-async-handler";
import { __dirname } from "../app.js";

/**
 * Handles wildcard routes for the application.
 *
 * This middleware function handles all requests that do not match any defined routes.
 * If the request URL starts with "/api", it responds with a 404 status code and an error message.
 * Otherwise, it serves the `index.html` file from the frontend's distribution directory.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const wildcardRouter = asyncHandler((req: Request, res: Response) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(StatusCodes.NOT_FOUND).send({ error: "API route not found" });
  } else {
    // If the client tries to navigate to an unknown page, send them the index.html file
    res.sendFile(path.join(__dirname, "/../frontend/dist", "index.html"));
  }
});
