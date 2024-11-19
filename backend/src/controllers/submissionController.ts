import asyncHandler from "express-async-handler";

export const getSubmissions = asyncHandler(async (req, res) => {
  console.log(
    `getting submissions for assignment: ${req.params.assignment_id}`,
  );
});
