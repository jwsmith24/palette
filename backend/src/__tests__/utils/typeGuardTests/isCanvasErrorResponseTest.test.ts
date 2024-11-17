import { isCanvasAPIErrorResponse } from "../../../utils/typeGuards";

describe("isCanvasErrorResponse", () => {
  it("should return true if the response is an array of Canvas API error response", () => {
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

  it("should require that the errors array (if present) not be empty", () => {
    // Arrange
    const response: unknown = {
      errors: [],
    };

    // Act
    const result = isCanvasAPIErrorResponse(response);

    // Assert
    expect(result).toBe(false);
  });

  it("should require that every error in the errors array (if present) is a Canvas API error", () => {
    // Arrange
    const response: unknown = {
      errors: [
        {
          message: "Good error message",
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

  it("should allow for multiple message fields in the errors array (if present)", () => {
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

  it("should allow the errors array to be optional if the response is a Canvas API error", () => {
    // Arrange
    const response: unknown = {
      message: "Error message",
    };

    // Act
    const result = isCanvasAPIErrorResponse(response);

    // Assert
    expect(result).toBe(true);
  });

  it("should return false if the errors array is missing and the response is not a Canvas API error", () => {
    // Arrange
    const response: unknown = {
      notAFieldCalledMessage: "Not a Canvas API error",
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
