import asyncHandler from "express-async-handler";
import { CoursesAPI } from "../services/courseRequests";
import { PaletteAPIResponse, Submission } from "palette-types";

export const getSubmissions = asyncHandler(async (req, res) => {
  console.log(
    `getting submissions for assignment: ${req.params.assignment_id}`,
  );
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
