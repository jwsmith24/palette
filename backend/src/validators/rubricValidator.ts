import { body } from "express-validator";

/**
 * define validation for rubrics before being stored on the database
 */
const validateRubric = [
  body("title")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Rubric does not have a title")
    .isLength({ max: 255 }) // max length: 255 characters
    .withMessage("Rubric title must not exceed 255 characters."),
  body("rubricCriteria")
    .isArray({ min: 1 })
    .withMessage("Rubric must have at least one criterion."),
  body("rubricCriteria.*.description") // * === all objects in the criteria array
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Each criterion must have a description"),
  body("rubricCriteria.*.longDescription").optional().isString(),
  body("rubricCriteria.*.points")
    .isNumeric()
    .withMessage("points field must be numeric"),
  body("rubricCriteria.*.ratings")
    .isArray({ min: 1 })
    .withMessage("Criterion must have at least one rating."),
  body("rubricCriteria.*.ratings.*.description")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Ratings must have a description."),
];

export default validateRubric;
