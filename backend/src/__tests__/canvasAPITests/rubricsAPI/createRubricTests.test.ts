/**
 * This file is for testing the createRubric function in the rubricRequests.ts file.
 * The createRubric function is responsible for creating a new rubric in a specific course.
 * The function takes in a request object containing rubric details and the course ID.
 * It then makes a POST request to the Canvas API to create the rubric if successful.
 *
 */

import { RubricsAPI } from "../../../canvasAPI/rubricRequests";
import { CreateRubricRequest } from "palette-types";
import { fetchAPI } from "../../../utils/fetchAPI";

// Mock the fetchAPI function
jest.mock("../../../utils/fetchAPI", () => ({
  fetchAPI: jest.fn(),
}));

describe("createRubric", () => {
  it("should make a POST request to create a new rubric in a specific course", async () => {
    // Arrange
    const request: CreateRubricRequest = {
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
    await RubricsAPI.createRubric(request, courseID);

    // Assert
    expect(fetchAPI).toHaveBeenCalledWith(`/courses/${courseID}/rubrics`, {
      method: "POST",
      body: JSON.stringify(request),
    });
  });
});
