import { RubricsAPI } from "../../../canvasAPI/rubricRequests";
import { fetchAPI } from "../../../utils/fetchAPI";
import { GetAllRubricsRequest } from "palette-types";

// Mock the fetchAPI function
jest.mock("../../../utils/fetchAPI", () => ({
  fetchAPI: jest.fn(),
}));

describe("listAllRubrics", () => {
  it("should make a paginated GET request to retrieve all rubrics in a specific course", async () => {
    // Arrange
    const request: GetAllRubricsRequest = {
      courseID: 123,
    };

    // Act
    await RubricsAPI.getAllRubrics(request);

    // Assert
    expect(fetchAPI).toHaveBeenCalledWith(
      `/courses/${request.courseID}/rubrics?per_page=100`,
    );
  });
});
