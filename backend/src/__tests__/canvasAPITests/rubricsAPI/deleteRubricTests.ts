import { RubricsAPI } from "../../../canvasAPI/rubricRequests";
import { fetchAPI } from "../../../utils/fetchAPI";

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
});
