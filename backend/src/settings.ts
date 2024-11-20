import { Settings } from "palette-types";
import fs from "fs";

// the settings path
const SETTINGS_PATH = "./settings.json";

export const defaultSettings: Settings = {
  userName: "admin",
  templateCriteria: [],
  token: "default token",
  preferences: {
    darkMode: false,
    defaultScale: 1,
  },
} as const;

// the settings object
let settings: Settings | null = null;

/**
 * The settings API defines the interface for the singleton settings object. It provides
 * utility functions for working with the settings object, such as getting and
 * updating the settings object.
 */
export const SettingsAPI = {
  /**
   * Get the settings object. If `includeSensitiveFields` is true, the sensitive fields
   * will be included. DO NOT use this option when communicating the settings object to the client.
   *
   * @param includeSensitiveFields Whether to include sensitive fields (like the Canvas API token) in the settings object.
   * @returns The settings object.
   */
  getUserSettings(includeSensitiveFields: boolean = false): Settings {
    // lazy load the settings object
    if (settings === null) {
      initializeSettings();
    }

    // mask out sensitive fields, if requested
    if (!includeSensitiveFields) {
      return { ...settings, token: "REDACTED" } as Settings;
    }

    return settings as Settings;
  },

  /**
   * Update the settings object and performs a settings file write. `newSettings` can be any subset of the settings object.
   *
   * Example usage: to update only the `token` field, pass `{ token: "new token" }`. To update only the `darkMode` preference,
   * pass `{ preferences: { darkMode: false } }`. That way, you don't have to pass the entire settings object
   * every time you want to update a single field.
   *
   * @param newSettings The subset of the Settings object to update
   */
  updateUserSettings(newSettings: Settings): void {
    if (settings === null) {
      initializeSettings();
    }

    // Update the settings object and write it to the settings file
    settings = newSettings;
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2));
  },
};

/**
 * Helper function to initialize the settings object by reading the settings file. If the settings file
 * does not exist, create it with the default user settings.
 */
function initializeSettings() {
  if (!fs.existsSync(SETTINGS_PATH)) {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(defaultSettings, null, 2));
    settings = defaultSettings;
  } else {
    settings = JSON.parse(fs.readFileSync(SETTINGS_PATH, "utf-8")) as Settings;
  }
}