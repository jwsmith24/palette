import { RubricsAPI } from "../../../canvasAPI/rubricRequests";
import {
  CreateRubricAssociationRequest,
  RubricObjectHash,
} from "palette-types";
import { fetchAPI } from "../../../utils/fetchAPI";

// Mock the fetchAPI function
jest.mock("../../../utils/fetchAPI", () => ({
  fetchAPI: jest.fn(),
}));

describe("createRubricAssociation", () => {
  it("should make a POST request to create a new rubric association in a specific course", async () => {
    // Arrange
    const request: CreateRubricAssociationRequest = {
      rubric_association: {
        rubric_id: 123,
        association_id: 123,
        association_type: "Course",
        purpose: "grading",
        use_for_grading: true,
        hide_score_total: true,
        title: "Assn Title",
        bookmarked: true,
      },
    };

    const courseID = 123;

    const fetchedRubricObjectHash: RubricObjectHash = {
      rubric: {
        id: 123,
        title: "Assn Title",
        points_possible: 0,
        free_form_criterion_comments: true,
        data: null,
      },
      // rubric_association field is optional
    };

    // Mock the fetchAPI function to resolve with a RubricObjectHash
    (fetchAPI as jest.Mock).mockResolvedValue(fetchedRubricObjectHash);

    // Act
    await RubricsAPI.createRubricAssociation(request, courseID);

    // Assert
    expect(fetchAPI).toHaveBeenCalledWith(
      `/courses/${courseID}/rubric_associations`,
      {
        method: "POST",
        body: JSON.stringify(request),
      },
    );
  });

  it("throws an error if the fetched response is not a RubricObjectHash", async () => {
    // Arrange
    const request: CreateRubricAssociationRequest = {
      rubric_association: {
        rubric_id: 123,
        association_id: 123,
        association_type: "Course",
        purpose: "grading",
        use_for_grading: true,
        hide_score_total: true,
        title: "Assn Title",
        bookmarked: true,
      },
    };

    const courseID = 123;

    // Mock the fetchAPI function to resolve with an unexpected response
    (fetchAPI as jest.Mock).mockResolvedValue({});

    // Act and Assert
    await expect(
      RubricsAPI.createRubricAssociation(request, courseID),
    ).rejects.toThrowError(
      "Unexpected response format: Expected a RubricObjectHash.",
    );
  });
});
