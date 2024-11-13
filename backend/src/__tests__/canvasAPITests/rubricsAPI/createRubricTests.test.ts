import { RubricsAPI } from "../../../canvasAPI/rubricRequests";
import { CreateRubricRequest, RubricObjectHash } from "palette-types";
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

    // create a mock RubricObjectHash response
    const fetchResponse: RubricObjectHash = {
      rubric: {
        id: 123,
        title: "Rubric Title",
        points_possible: 0,
        data: null,
      },
      rubric_association: {
        rubric_id: 123,
        association_id: 123,
        association_type: "Course",
        use_for_grading: true,
        summary_data: "some data",
        purpose: "grading",
        hide_score_total: true,
        hide_points: false,
        hide_outcome_results: false,
      },
    };
    // Mock the return value of fetchAPI
    (fetchAPI as jest.Mock).mockResolvedValue(fetchResponse);

    // Act
    await RubricsAPI.createRubric(request, courseID);

    // Assert
    expect(fetchAPI).toHaveBeenCalledWith(`/courses/${courseID}/rubrics`, {
      method: "POST",
      body: JSON.stringify(request),
    });
  });

  it("should throw an error if the response is not a RubricObjectHash", async () => {
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

    // Mock the return value of fetchAPI
    (fetchAPI as jest.Mock).mockResolvedValue({});

    // Act
    const createRubric = RubricsAPI.createRubric(request, courseID);

    // Assert
    await expect(createRubric).rejects.toThrow(
      "Unexpected response format: Expected a RubricObjectHash.",
    );
  });
});
