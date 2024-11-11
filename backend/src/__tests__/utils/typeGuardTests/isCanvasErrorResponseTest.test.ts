/**
 * This file is a test for the isCanvasErrorResponse function in the typeGuards.ts file.
 * The isCanvasErrorResponse function is responsible for checking if an error response is from the Canvas API.
 * The function takes in an unknown response object and returns a boolean indicating if the error is a Canvas API error.
 */

import { isCanvasAPIErrorResponse } from "../../../utils/typeGuards";

describe("isCanvasErrorResponse", () => {
  it("should return true if the response is a Canvas API error response", () => {
    // Arrange
    const response: unknown = {
      errors: [
        {
          message: "Error message",
        },
      ],
    };

    // Act
    const result = isCanvasAPIErrorResponse(response);

    // Assert
    expect(result).toBe(true);
  });

  it("should require that the errors array is not empty", () => {
    // Arrange
    const response: unknown = {
      errors: [],
    };

    // Act
    const result = isCanvasAPIErrorResponse(response);

    // Assert
    expect(result).toBe(false);
  });

  it("should require that every error in the errors array is a Canvas API error", () => {
    // Arrange
    const response: unknown = {
      errors: [
        {
          message: "Error message",
        },
        {
          error: "Not a Canvas API error",
        },
      ],
    };

    // Act
    const result = isCanvasAPIErrorResponse(response);

    // Assert
    expect(result).toBe(false);
  });

  it("should allow for multiple message fields in the errors array", () => {
    // Arrange
    const response: unknown = {
      errors: [
        {
          message: "Error message 1",
        },
        {
          message: "Error message 2",
        },
      ],
    };

    // Act
    const result = isCanvasAPIErrorResponse(response);

    // Assert
    expect(result).toBe(true);
  });

  it("should return false if the response is missing the errors (plural) field", () => {
    // Arrange
    const response: unknown = {
      notTheErrorsField: "Not a Canvas API error",
    };

    // Act
    const result = isCanvasAPIErrorResponse(response);

    // Assert
    expect(result).toBe(false);
  });

  it("should return false if the response is missing the message field in the errors array", () => {
    // Arrange
    const response: unknown = {
      errors: [
        {
          error: "Not a Canvas API error",
        },
      ],
    };

    // Act
    const result = isCanvasAPIErrorResponse(response);

    // Assert
    expect(result).toBe(false);
  });
});
