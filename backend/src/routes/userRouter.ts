import express from "express";
import { getUserSettings } from "../controllers/userController.js";
import { getUserSettingsValidator } from "../validators/settingsRequestValidator.js";
import { rubricValidationErrorHandler } from "../middleware/rubricValidationErrorHandler.js";

const userRouter = express.Router();

/**
 * @route GET /user/settings
 * @description Get the settings for the current user.
 */
userRouter.get(
  "/settings",
  getUserSettingsValidator,
  rubricValidationErrorHandler,
  getUserSettings,
);

export default userRouter;
