import { param } from "express-validator";

export const getAllRubricsValidator = () => [
  param("course_id")
    .isNumeric()
    .withMessage("Course ID param must be a number"),
];
