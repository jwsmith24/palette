import { defaultSettings, SettingsAPI } from "../settings";
import fs from "fs";
import { Settings } from "palette-types";

jest.mock("fs");

const mockSettings: Settings = {
  userName: "mockUser",
  templateCriteria: [],
  token: "mock token",
  preferences: {
    darkMode: true,
    defaultScale: 3,
  },
};

describe("getUserSettings", () => {
  it("should create a settings file with default settings first if it does not exist", () => {
    // file doesn't exist yet
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    SettingsAPI.getUserSettings();

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "./settings.json",
      JSON.stringify(defaultSettings, null, 2),
    );
  });

  it("should return settings with sensitive fields redacted by default", () => {
    // file exists with default settings
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    const settings = SettingsAPI.getUserSettings();

    expect(settings).toEqual({ ...defaultSettings, token: "REDACTED" });
  });

  it("should return settings with sensitive fields included, if specified", () => {
    // file exists with default settings
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    // call getUserSettings with includeSensitiveFields
    const settings = SettingsAPI.getUserSettings(true);

    expect(settings).toEqual(defaultSettings);
  });
});

describe("updateUserSettings", () => {
  it("should create a settings file with default settings first if it does not exist", () => {
    // file doesn't exist
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    SettingsAPI.updateUserSettings(mockSettings);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "./settings.json",
      JSON.stringify(defaultSettings, null, 2),
    );
  });

  it("should update settings and write to file", () => {
    // file exists with default settings
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    const newSettings: Settings = {
      ...mockSettings,
      userName: "updatedUser",
    };

    SettingsAPI.updateUserSettings(newSettings);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "./settings.json",
      JSON.stringify(newSettings, null, 2),
    );
  });
});
