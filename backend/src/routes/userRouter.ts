import express from "express";
import {
  getUserSettings,
  updateUserSettings,
} from "../controllers/userController.js";
import { getUserSettingsValidator } from "../validators/settingsRequestValidator.js";
import { validationErrorHandler } from "../middleware/validationErrorHandler.js";
import { updateUserSettingsValidator } from "../validators/updateUserSettingsValidator.js";

const userRouter = express.Router();

/**
 * @route GET /user/settings
 * @description Get the settings for the current user.
 */
userRouter.get(
  "/settings",
  getUserSettingsValidator,
  validationErrorHandler,
  getUserSettings,
);

/**
 * @route PUT /user/settings
 */
userRouter.put(
  "/settings",
  updateUserSettingsValidator,
  validationErrorHandler,
  updateUserSettings,
);

export default userRouter;
