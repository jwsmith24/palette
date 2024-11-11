/**
 * This file is responsible for testing the isPaginatedRubricsList function in the typeGuards.ts file.
 *
 */

import { isPaginatedRubricsList } from "../../../utils/typeGuards";
import { CanvasRubric } from "palette-types";

describe("isPaginatedRubricsList", () => {
  it("should return true if the object is a paginated list of CanvasRubrics", () => {
    // Arrange
    const paginatedRubricsList: CanvasRubric[] = [
      {
        title: "Rubric 1",
        points_possible: 10,
        data: [
          {
            description: "Criterion 1",
            points: 5,
            ratings: [
              {
                description: "Rating 1",
                points: 3,
              },
            ],
          },
        ],
      },
    ];

    // Act
    const result = isPaginatedRubricsList(paginatedRubricsList);

    // Assert
    expect(result).toBe(true);
  });

  it("should return false if the object is not a paginated list of CanvasRubrics", () => {
    // Arrange
    const notPaginatedRubricsList = {
      data: [
        {
          title: "Rubric 1",
          points_possible: 10,
          data: [
            {
              description: "Criterion 1",
              points: 5,
            },
          ],
        },
        {
          title: "Rubric 2",
          points_possible: 20,
          data: [
            {
              description: "Criterion 2",
              points: 10,
            },
          ],
        },
      ],
    };

    // Act
    const result = isPaginatedRubricsList(notPaginatedRubricsList);

    // Assert
    expect(result).toBe(false);
  });

  it("should return false if the object is not an array", () => {
    // Arrange
    const notAnArray = {};

    // Act
    const result = isPaginatedRubricsList(notAnArray);

    // Assert
    expect(result).toBe(false);
  });

  it("should return true if the object is an empty array", () => {
    // Arrange
    const emptyArray: CanvasRubric[] = [];

    // Act
    const result = isPaginatedRubricsList(emptyArray);

    // Assert
    expect(result).toBe(true);
  });

  it("should return false if the object is an array of non-CanvasRubric objects", () => {
    // Arrange
    const nonCanvasRubricArray = [
      {
        thisIsMissingRequiredFields: true,
      },
    ];

    // Act
    const result = isPaginatedRubricsList(nonCanvasRubricArray);

    // Assert
    expect(result).toBe(false);
  });

  it("should return false if the object is an array of mixed CanvasRubric and non-CanvasRubric objects", () => {
    // Arrange
    const actualCanvasRubric: CanvasRubric = {
      title: "Rubric 1",
      points_possible: 10,
      data: [
        {
          description: "Criterion 1",
          points: 5,
          ratings: [
            {
              description: "Rating 1",
              points: 3,
            },
          ],
        },
      ],
    };

    const mixedCanvasRubricArray = [
      actualCanvasRubric,
      {
        thisIsMissingRequiredFields: true,
      },
    ];

    // Act
    const result = isPaginatedRubricsList(mixedCanvasRubricArray);

    // Assert
    expect(result).toBe(false);
  });

  it("should return false if there is a null value in the array", () => {
    // Arrange
    const nullValueArray = [null];

    // Act
    const result = isPaginatedRubricsList(nullValueArray);

    // Assert
    expect(result).toBe(false);
  });
});
