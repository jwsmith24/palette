import {
  CanvasRubric,
  GetAllRubricsRequest,
  GetRubricRequest,
  Rubric,
} from "palette-types";
import { fetchAPI } from "../../../utils/fetchAPI";
import { toPaletteFormat } from "../../../utils/rubricUtils";
import { RubricsAPI } from "../../../canvasAPI/rubricRequests";

// mock the dependencies
jest.mock("../../../utils/fetchAPI");
jest.mock("../../../utils/rubricUtils");

describe("Rubric GET service methods", () => {
  // reset mocks before each test runs for consistency
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getRubric", () => {
    const mockRequest: GetRubricRequest = {
      course_id: 123,
      id: 1,
    };
    /**
     * Mock the rubric from Canvas.
     */
    const mockCanvasRubric: CanvasRubric = {
      id: 1,
      title: "Sample Rubric",
      points_possible: 10,
      data: [],
    };
    /**
     * Mock the expected transformation.
     */
    const mockFormattedRubric: Rubric = {
      id: 1,
      title: "Sample Rubric",
      pointsPossible: 10,
      criteria: [],
    };
    it("should retrieve and format a rubric", async () => {
      // mock fetchAPI to return the canvas rubric
      (fetchAPI as jest.Mock).mockResolvedValue(mockCanvasRubric);

      // mock RubricUtils.toPaletteFormat to return a formatted rubric
      (toPaletteFormat as jest.Mock).mockResolvedValue(mockFormattedRubric);

      // call the getRubric service function
      const result = await RubricsAPI.getRubric(mockRequest);

      // assertions:
      expect(fetchAPI).toHaveBeenCalledWith(
        `/courses/${mockRequest.course_id}/rubrics/${mockRequest.id}`,
      );
      expect(toPaletteFormat).toHaveBeenCalledWith(mockCanvasRubric);
      expect(result).toEqual(mockFormattedRubric);
    });

    it("should throw an error if fetchAPI fails", async () => {
      (fetchAPI as jest.Mock).mockRejectedValue(new Error("API error"));

      await expect(RubricsAPI.getRubric(mockRequest)).rejects.toThrow(
        "API error",
      );
    });

    it("should throw an error if the transformation to palette format fails", async () => {
      (fetchAPI as jest.Mock).mockResolvedValue(mockCanvasRubric);
      (toPaletteFormat as jest.Mock).mockImplementation(() => {
        throw new Error("format error");
      });

      await expect(RubricsAPI.getRubric(mockRequest)).rejects.toThrow(
        "format error",
      );
    });
  });
  describe("getAllRubrics", () => {
    const mockRequest: GetAllRubricsRequest = {
      courseID: 101,
    };

    const mockCanvasRubrics: CanvasRubric[] = [
      { id: 1, title: "Rubric One", points_possible: 10, data: [] },
      { id: 2, title: "Rubric Two", points_possible: 12, data: [] },
    ];

    const mockFormattedRubrics: Rubric[] = [
      { id: 1, title: "Rubric One", pointsPossible: 10, criteria: [] },
      { id: 2, title: "Rubric Two", pointsPossible: 12, criteria: [] },
    ];

    it("should retrieve and format all rubrics successfully", async () => {
      // Mock fetchAPI to return an array of CanvasRubrics
      (fetchAPI as jest.Mock).mockResolvedValue(mockCanvasRubrics);

      // Mock toPaletteFormat to format each CanvasRubric
      (toPaletteFormat as jest.Mock).mockImplementation((rubric: Rubric) =>
        mockFormattedRubrics.find((r) => r.id === rubric.id),
      );

      // call getAllRubrics service function
      const result = await RubricsAPI.getAllRubrics(mockRequest);

      // assertions:
      expect(fetchAPI).toHaveBeenCalledWith(
        `/courses/${mockRequest.courseID}/rubrics?per_page=100`,
      );
      expect(toPaletteFormat).toHaveBeenCalledTimes(mockCanvasRubrics.length);
      expect(result).toEqual(mockFormattedRubrics);
    });
    it("should throw an error if fetchAPI returns a non-array response", async () => {
      // Mock fetchAPI to return a non-array
      (fetchAPI as jest.Mock).mockResolvedValue({
        id: 1,
        title: "Invalid Rubric",
      });

      await expect(RubricsAPI.getAllRubrics(mockRequest)).rejects.toThrow(
        "Unexpected response format: Expected an array of rubrics.",
      );
    });

    it("should return an empty array if fetchAPI returns an empty array", async () => {
      (fetchAPI as jest.Mock).mockResolvedValue([]);

      const result = await RubricsAPI.getAllRubrics(mockRequest);

      // Verify the result is an empty array and toPaletteFormat was not called
      expect(result).toEqual([]);
      expect(toPaletteFormat).not.toHaveBeenCalled();
    });
  });
});
