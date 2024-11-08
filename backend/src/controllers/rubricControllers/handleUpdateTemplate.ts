import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const handleUpdateTemplate = asyncHandler(
  (req: Request, res: Response) => {
    console.log(req, res);
    throw new Error("Not implemented");
  },
);
