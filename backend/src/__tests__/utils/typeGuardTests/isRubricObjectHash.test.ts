/**
 * This is a test file for the isRubricObjectHash function in the typeGuards.ts file.
 * The isRubricObjectHash function is responsible for checking if a response object is a RubricObjectHash.
 * The function takes in an unknown object and returns a boolean indicating if the object is a RubricObjectHash.
 */

import {
  isCanvasAssociation,
  isCanvasRubric,
  isRubricObjectHash,
} from "../../../utils/typeGuards";
import { CanvasRubric } from "palette-types";

const validRubric: CanvasRubric = {
  title: "Rubric Title",
  points_possible: 10,
  data: [
    {
      description: "Criterion 1",
      points: 10,
      ratings: [
        {
          description: "Rating 1",
          points: 5,
        },
      ],
    },
  ],
} as const;
const validRubricAssociation = {
  rubric_id: 1,
  association_id: 1,
  association_type: "Course",
  use_for_grading: true,
  summary_data: true,
  purpose: "grading",
  hide_score_total: false,
  hide_points: false,
  hide_outcome_results: false,
} as const;

// setup before each test to assert that the rubric is a valid canvas rubric
beforeEach(() => {
  // make sure we didn't mess up the test data
  expect(isCanvasRubric(validRubric)).toBe(true);
  expect(isCanvasAssociation(validRubricAssociation)).toBe(true);
});

describe("isRubricObjectHash", () => {
  it("should return true if the object is a valid RubricObjectHash", () => {
    // Arrange
    const response1: unknown = {
      rubric: validRubric,
      rubric_association: validRubricAssociation,
    };
    const response2: unknown = {
      rubric: validRubric,
    };

    // Act
    const result1 = isRubricObjectHash(response1);
    const result2 = isRubricObjectHash(response2);

    // Assert
    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });

  it("should return false if the object has no rubric field", () => {
    // Arrange
    const response: unknown = {
      rubric_association: validRubricAssociation,
    };

    // Act
    const result = isRubricObjectHash(response);

    // Assert
    expect(result).toBe(false);
  });

  it("should return false if the rubric fields isn't a valid CanvasRubric", () => {
    // Arrange
    // remove a field from a valid rubric
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, ...invalidRubric } = validRubric;
    const response: unknown = {
      rubric: invalidRubric,
      rubric_association: validRubricAssociation,
    };

    // Act
    const result = isRubricObjectHash(response);

    // Assert
    expect(result).toBe(false);
  });

  it("should return false if the rubric_association field isn't a valid CanvasAssociation", () => {
    // Arrange
    // remove a field from a valid rubric association
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { rubric_id, ...invalidRubricAssociation } = validRubricAssociation;
    const response: unknown = {
      rubric: validRubric,
      rubric_association: invalidRubricAssociation,
    };

    // Act
    const result = isRubricObjectHash(response);

    // Assert
    expect(result).toBe(false);
  });

  it("should allow the rubric_association field to be optional", () => {
    // Arrange
    const response: unknown = {
      rubric: validRubric,
    };

    // Act
    const result = isRubricObjectHash(response);

    // Assert
    expect(result).toBe(true);
  });
});
