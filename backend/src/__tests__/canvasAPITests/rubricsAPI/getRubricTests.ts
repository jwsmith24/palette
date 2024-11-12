import { CanvasRubric, GetRubricRequest, Rubric } from "palette-types";
import { fetchAPI } from "../../../utils/fetchAPI";
import { toPaletteFormat } from "../../../utils/rubricUtils";
import { RubricsAPI } from "../../../canvasAPI/rubricRequests";

// mock the dependencies
jest.mock("../../../utils/fetchAPI");
jest.mock("../../../utils/rubricUtils");

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

  // reset mocks before each test runs for consistency
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
