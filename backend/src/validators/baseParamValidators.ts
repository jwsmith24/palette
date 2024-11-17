import { param, ValidationChain } from "express-validator";

export const idParamValidator: ValidationChain[] = [
  param("rubric_id").isNumeric().withMessage("ID param must be a number"),
];

export const courseParamValidator: ValidationChain[] = [
  param("course_id")
    .isNumeric()
    .withMessage("Course ID param must be a number"),
];

export const assignmentParamValidator: ValidationChain[] = [
  param("assignment_id")
    .isNumeric()
    .withMessage("Assignment id must be a number"),
];

export const idAndCourseParamValidator: ValidationChain[] = [
  ...idParamValidator,
  ...courseParamValidator,
];
