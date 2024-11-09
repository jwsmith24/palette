import { param } from "express-validator";

export const getRubricByIDValidator = () => [
  param("id").isNumeric().withMessage("ID param must be a number"),
  param("course_id")
    .isNumeric()
    .withMessage("Course ID param must be a number"),
];
