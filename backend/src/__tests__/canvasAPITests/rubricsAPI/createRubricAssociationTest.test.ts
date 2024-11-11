/**
 * This file is responsible for testing the createRubricAssociation function in the rubricRequests.ts file.
 * The createRubricAssociation function is responsible for creating a new rubric association in a specific course.
 */

import { RubricsAPI } from "../../../CanvasAPI/rubricRequests";
import { CreateRubricAssociationRequest } from "palette-types";
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
});
