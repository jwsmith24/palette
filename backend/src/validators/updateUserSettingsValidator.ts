import { body, ValidationChain } from "express-validator";

export const updateUserSettingsValidator: ValidationChain[] = [
  // body().custom(isValidSettingsObject),
  body("userName").isString().withMessage("userName must be a string"),
  body("templateCriteria")
    .isArray()
    .withMessage("templateCriteria must be an array"),
  body("token")
    .isString()
    .withMessage("token must be a string")
    .matches(/^[a-zA-Z0-9~]+$/)
    .withMessage("token must be alphanumeric and can include the ~ character"),
  body("preferences").isObject().withMessage("preferences must be an object"),
  body("preferences.darkMode")
    .isBoolean()
    .withMessage("preferences.darkMode must be a boolean"),
  body("preferences.defaultScale")
    .isNumeric()
    .withMessage("preferences.defaultScale must be a number"),
];
