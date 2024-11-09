/**
 * This file is responsible for testing the updateRubric function in the rubricRequests.ts file.
 * The updateRubric function is responsible for updating an existing rubric in a specific course.
 */

import { RubricsAPI } from "../../../CanvasAPI/rubricRequests";
import { UpdateRubricRequest } from "palette-types";
import { fetchAPI } from "../../../CanvasAPI/fetchAPI";

// Mock the fetchAPI function
jest.mock("../../../CanvasAPI/fetchAPI", () => ({
  fetchAPI: jest.fn(),
}));

describe("updateRubric", () => {
  it("should make a PUT request to update an existing rubric in a specific course", async () => {
    // Arrange
    const request: UpdateRubricRequest = {
      id: 123,
      rubric_association_id: 123,
      rubric: {
        title: "Rubric Title",
        free_form_criterion_comments: true,
        criteria: {
          0: {
            description: "Criterion 1",
            long_description: "Criterion 1 Long Description",
            points: 10,
            ratings: {
              0: {
                description: "Rating 1",
                points: 5,
              },
              1: {
                description: "Rating 2",
                points: 10,
              },
            },
          },
        },
      },
      rubric_association: {
        association_id: 123,
        association_type: "Course",
        use_for_grading: true,
        hide_score_total: true,
        purpose: "grading",
      },
    };
    const courseID = 123;

    // Act
    await RubricsAPI.updateRubric(request, courseID);

    // Assert
    expect(fetchAPI).toHaveBeenCalledWith(
      `/courses/${courseID}/rubrics/${request.id}`,
      {
        method: "PUT",
        body: JSON.stringify(request),
      },
    );
  });
});
