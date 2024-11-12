import { CanvasRubric, GetAllRubricsRequest, Rubric } from "palette-types";
import { RubricsAPI } from "../../../canvasAPI/rubricRequests";
import { fetchAPI } from "../../../utils/fetchAPI";
import RubricUtils from "../../../utils/rubricUtils";

jest.mock("../../../utils/fetchAPI", () => ({
  fetchAPI: jest.fn(),
}));

describe("getAllRubrics", () => {
  const request: GetAllRubricsRequest = { courseID: 123 };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should make a paginated GET request to the correct URL", async () => {
    // Act
    await RubricsAPI.getAllRubrics(request);

    // Assert
    expect(fetchAPI).toHaveBeenCalledWith(
      `/courses/${request.courseID}/rubrics?per_page=100`,
    );
  });

  it("should transform the Canvas API response using RubricUtils", async () => {
    // Arrange: Mock fetchAPI to return an array of CanvasRubric-like objects
    const mockCanvasRubrics: CanvasRubric[] = [
      {
        id: 1,
        title: "Example Rubric",
        data: [],
        points_possible: 10,
      },
    ];
    const mockTransformedRubrics: Rubric[] = [
      {
        id: 1,
        title: "Transformed Example Rubric",
        criteria: [],
        pointsPossible: 10,
      },
    ];

    (fetchAPI as jest.Mock).mockResolvedValue(mockCanvasRubrics);

    // Spy on RubricUtils.toPaletteFormat to return the mock transformed data
    const transformSpy = jest.spyOn(RubricUtils, "toPaletteFormat");
    transformSpy.mockReturnValue(mockTransformedRubrics[0]);

    // Act
    const rubrics = await RubricsAPI.getAllRubrics(request);

    // Assert
    expect(rubrics).toEqual(mockTransformedRubrics);
    expect(transformSpy).toHaveBeenCalledTimes(mockCanvasRubrics.length);
    expect(transformSpy).toHaveBeenCalledWith(mockCanvasRubrics[0]);
  });

  it("should return an empty array if the Canvas API response is empty", async () => {
    // Arrange: Mock an empty array response
    (fetchAPI as jest.Mock).mockResolvedValue([]);

    // Act
    const rubrics = await RubricsAPI.getAllRubrics(request);

    // Assert
    expect(rubrics).toEqual([]);
  });

  it("should handle unexpected error response gracefully", async () => {
    // Arrange: Mock fetchAPI to return an error-like response
    (fetchAPI as jest.Mock).mockResolvedValue({ unexpectedError: true });

    // Act and Assert: Expect an error to be thrown or handled
    await expect(RubricsAPI.getAllRubrics(request)).rejects.toThrow(
      "Canvas API returned an unexpected error response",
    );
  });
});
