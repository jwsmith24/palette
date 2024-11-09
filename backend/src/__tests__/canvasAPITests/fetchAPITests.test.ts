/**
 * This test file is for testing the fetchAPI function in the fetchAPI.ts file.
 * The fetchAPI function is responsible for making requests to the Canvas API.
 * The function takes in a URL and options object and returns a promise that resolves to the response.
 * The function also handles errors and throws an error if an unexpected error response is encountered.
 */

import { fetchAPI } from "../../CanvasAPI/fetchAPI";
import { CanvasAPIUnexpectedError } from "../../errors/UnknownCanvasError";

// Mock the fetch function
global.fetch = jest.fn();

// Reset the mock before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("fetchAPI", () => {
  it("should return the JSON response if the request is successful", async () => {
    // Arrange
    const endpoint = "/courses/123";
    const options = {
      method: "GET",
    };

    const response = {
      data: "some data",
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true, // this is
      json: jest.fn().mockResolvedValue(response),
    });

    // Act
    const result = await fetchAPI(endpoint, options);

    // Assert
    expect(result).toEqual(response);
  });

  it("should throw an error if the request is unsuccessful", async () => {
    // Arrange
    const endpoint = "/courses/123";
    const options = {
      method: "GET",
    };

    const errorResponse = {
      errors: [
        {
          message: "Error message",
        },
      ],
    };

    // Act
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false, // this is what matters for this test
      json: jest.fn().mockResolvedValue(errorResponse),
    });

    // Assert
    await expect(fetchAPI(endpoint, options)).rejects.toThrow("Error message");
  });

  it("should throw the correct error type if an unexpected error response is encountered", async () => {
    // Arrange
    const endpoint = "/courses/123";
    const options = {
      method: "GET",
    };

    const errorResponse = {
      unexpectedError: true,
    };

    // Act
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(errorResponse),
    });

    // Assert
    await expect(fetchAPI(endpoint, options)).rejects.toThrow(
      CanvasAPIUnexpectedError,
    );
  });
});
