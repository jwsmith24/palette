import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const handleGetRubricById = asyncHandler(
  (req: Request, res: Response) => {
    console.log(req, res);
    throw new Error("handleGetRubricById is not implemented.. yet");
  },
);
