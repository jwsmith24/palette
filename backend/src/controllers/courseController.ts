import asyncHandler from "express-async-handler";
import { CoursesAPI } from "../canvasAPI/courseRequests.js";
import { PaletteAPIResponse, Course, Assignment } from "palette-types";
import { Request, Response } from "express";

export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await CoursesAPI.getCourses();
  const apiResponse: PaletteAPIResponse<Course[]> = {
    data: courses,
    success: true,
    message: "Here are the courses",
  };

  res.json(apiResponse);
});

export const getAssignments = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("course id: ", req.params.courseId);
    const assignments = await CoursesAPI.getAssignments(req.params.courseId);
    const apiResponse: PaletteAPIResponse<Assignment[]> = {
      data: assignments,
      success: true,
      message: "Here are the assignments",
    };

    res.json(apiResponse);
  },
);
