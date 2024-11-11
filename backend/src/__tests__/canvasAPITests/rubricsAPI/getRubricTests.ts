/**
 * This file is for testing the getRubric function in the rubricRequests.ts file.
 * The getRubric function is responsible for retrieving a rubric by its ID.
 */

import { RubricsAPI } from "../../../canvasAPI/rubricRequests";
import { fetchAPI } from "../../../utils/fetchAPI";
import { GetRubricRequest } from "palette-types";

// Mock the fetchAPI function
jest.mock("../../../utils/fetchAPI", () => ({
  fetchAPI: jest.fn(),
}));

describe("getRubric", () => {
  it("should make a GET request to retrieve a rubric by its ID", async () => {
    // Arrange
    // create a GetRubricRequest object
    const request: GetRubricRequest = {
      id: 123,
      course_id: 123,
    };

    // Act
    await RubricsAPI.getRubric(request);

    // Assert
    expect(fetchAPI).toHaveBeenCalledWith(
      `/courses/${request.course_id}/rubrics/${request.id}`,
    );
  });
});
