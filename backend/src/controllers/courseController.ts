import asyncHandler from "express-async-handler";
import { CoursesAPI } from "../canvasAPI/courseRequests.js";
import {
  Assignment,
  Course,
  PaletteAPIResponse,
  Submission,
} from "palette-types";
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
    console.log("course id: ", req.params.course_id);
    const assignments = await CoursesAPI.getAssignments(req.params.course_id);
    const apiResponse: PaletteAPIResponse<Assignment[]> = {
      data: assignments,
      success: true,
      message: "Here are the assignments",
    };

    res.json(apiResponse);
  },
);

export const getAssignment = asyncHandler(
  async (req: Request, res: Response) => {
    const assignment = await CoursesAPI.getAssignment(
      req.params.course_id,
      req.params.assignment_id,
    );
    const apiResponse: PaletteAPIResponse<Assignment> = {
      data: assignment,
      success: true,
      message: `Assignment: ${assignment.name}`,
    };
    res.json(apiResponse);
  },
);

export const getSubmissions = asyncHandler(async (req, res) => {
  const submissions = await CoursesAPI.getSubmissions(
    req.params.course_id,
    req.params.assignment_id,
  );

  const apiResponse: PaletteAPIResponse<Submission[]> = {
    data: submissions,
    success: true,
    message: "Assignment submissions",
  };

  res.json(apiResponse);
});
