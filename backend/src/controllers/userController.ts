import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createSuccessResponse } from "../utils/paletteResponseFactories.js";
import { Settings } from "palette-types";
import { SettingsAPI } from "../settings.js";

/**
 * Handles the GET request to retrieve a user's settings.
 *
 * @param {Request} req - The Express request object (not used in this handler).
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const getUserSettings = asyncHandler((req: Request, res: Response) => {
  const { fields } = req.query;

  if (fields) {
    // Split the 'fields' parameter into an array of requested fields
    const requestedFields = (fields as string).split(",");

    const filteredSettings: Partial<Settings> = SettingsAPI.getUserSettings(
      false,
      requestedFields,
    );

    // Respond with the filtered settings
    res.json(createSuccessResponse(filteredSettings));
    return;
  }

  // If no fields were requested, respond with the full settings object
  const settings = SettingsAPI.getUserSettings(true) as Settings;
  res.json(createSuccessResponse(settings));
});

// controller for update user settings
export const updateUserSettings = asyncHandler(
  (req: Request, res: Response) => {
    // Update the settings with the new values
    SettingsAPI.updateUserSettings(req.body as Partial<Settings>);

    // Safely retrieve the updated settings
    const updatedSettings = SettingsAPI.getUserSettings(false);

    res.json(
      createSuccessResponse(updatedSettings, "Settings updated successfully"),
    );
  },
);
