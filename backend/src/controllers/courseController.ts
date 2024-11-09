import asyncHandler from "express-async-handler";
import { CoursesAPI } from "../canvasAPI/courseRequests.js";
import { PaletteAPIResponse, Course } from "palette-types";

export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await CoursesAPI.getCourses();
  const apiResponse: PaletteAPIResponse<Course[]> = {
    data: courses,
    success: true,
    message: "Here are the courses",
  };

  res.json(apiResponse);
});

export const getAssignments = asyncHandler(async (req, res) => {
  const msg = "to be implemented";
});
