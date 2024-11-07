import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const handleDeleteTemplate = asyncHandler(
  (req: Request, res: Response) => {
    console.log(req, res);
    throw new Error("Not implemented");
  }
);
