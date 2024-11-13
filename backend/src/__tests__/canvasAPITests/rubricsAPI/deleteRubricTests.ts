import { RubricsAPI } from "../../../canvasAPI/rubricRequests";
import { fetchAPI } from "../../../utils/fetchAPI";
import { CanvasRubric } from "palette-types";

// Mock the fetchAPI function
jest.mock("../../../utils/fetchAPI", () => ({
  fetchAPI: jest.fn(),
}));

describe("deleteRubric", () => {
  it("should make a DELETE request to delete a rubric by its ID", async () => {
    // Arrange
    const request = {
      id: 123,
      course_id: 123,
    };

    const fetchedRubric: CanvasRubric = {
      id: 123,
      title: "Test Rubric",
      points_possible: 10,
      data: null,
    };

    // mock the fetchAPI function to resolve a CanvasRubric
    (fetchAPI as jest.Mock).mockResolvedValue(fetchedRubric);

    // Act
    await RubricsAPI.deleteRubric(request);

    // Assert
    expect(fetchAPI).toHaveBeenCalledWith(
      `/courses/${request.course_id}/rubrics/${request.id}`,
      {
        method: "DELETE",
      },
    );
  });

  it("should throw an error if the response is not a CanvasRubric", async () => {
    // Arrange
    const request = {
      id: 123,
      course_id: 123,
    };

    // mock the fetchAPI function to resolve a string
    (fetchAPI as jest.Mock).mockResolvedValue("Not a CanvasRubric");

    // Act and Assert
    await expect(RubricsAPI.deleteRubric(request)).rejects.toThrow(
      "Unexpected response format: Expected a CanvasRubric.",
    );
  });
});
