import { RubricUtils } from "../../utils/rubricUtils";
import { CanvasRubric, RequestFormattedRubric, Rubric } from "palette-types";

const validPaletteRubric: Rubric = {
  title: "Test Rubric",
  pointsPossible: 10,
  criteria: [
    {
      description: "Criterion 1",
      longDescription: "Long description 1",
      points: 10,
      updatePoints: () => {},
      ratings: [
        {
          description: "Rating 1",
          longDescription: "Long rating description 1",
          points: 5,
        },
      ],
    },
  ],
} as const;

// The expected output of the toCanvasFormat function when given the validPaletteRubric
const validRequestFormattedRubric: RequestFormattedRubric = {
  title: "Test Rubric",
  free_form_criterion_comments: true,
  criteria: {
    0: {
      description: "Criterion 1",
      long_description: "Long description 1",
      points: 10,
      ratings: {
        0: {
          description: "Rating 1",
          long_description: "Long rating description 1",
          points: 5,
        },
      },
    },
  },
} as const;

const validCanvasRubric: CanvasRubric = {
  id: 1,
  title: "Test Rubric",
  points_possible: 10,
  data: [
    {
      id: "1",
      description: "Criterion 1",
      long_description: "Long description 1",
      points: 10,
      ratings: [
        {
          id: "1",
          description: "Rating 1",
          long_description: "Long rating description 1",
          points: 5,
        },
      ],
    },
  ],
} as const;

describe("RubricUtils", () => {
  describe("toCanvasFormat", () => {
    it("converts a frontend rubric to a RequestFormattedRubric format", () => {
      expect(RubricUtils.toCanvasFormat(validPaletteRubric)).toEqual(
        validRequestFormattedRubric,
      );
    });

    it("handles an empty criteria array", () => {
      // copy the valid rubric and remove the criteria
      const original = { ...validPaletteRubric, criteria: [] };

      // copy the corresponding valid request formatted rubric and remove the criteria
      const expected = { ...validRequestFormattedRubric, criteria: {} };

      expect(RubricUtils.toCanvasFormat(original)).toEqual(expected);
    });

    it("handles an empty ratings array", () => {
      // copy the valid rubric and remove the ratings
      const original = {
        ...validPaletteRubric,
        criteria: [{ ...validPaletteRubric.criteria[0], ratings: [] }],
      };
      // assert that the ratings array is empty
      expect(original.criteria[0].ratings).toEqual([]);

      // copy the corresponding valid request formatted rubric and remove the ratings
      const expected = {
        ...validRequestFormattedRubric,
        criteria: {
          0: {
            ...validRequestFormattedRubric.criteria[0],
            ratings: {},
          },
        },
      };

      // assert that the ratings object is empty
      expect(expected.criteria[0].ratings).toEqual({});

      expect(RubricUtils.toCanvasFormat(original)).toEqual(expected);
    });
  });

  describe("toPaletteFormat", () => {
    // todo: implement this test
    it("converts a Canvas rubric to Palette format", () => {
      const expected: Rubric = {
        id: 1,
        title: "Test Rubric",
        pointsPossible: 10,

        criteria: [
          {
            //id: "1",
            description: "Criterion 1",
            longDescription: "Long description 1",
            points: 10,

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            updatePoints: expect.any(Function),
            ratings: [
              {
                //id: "1",
                description: "Rating 1",
                longDescription: "Long rating description 1",
                points: 5,
              },
            ],
          },
        ],
      };

      expect(RubricUtils.toPaletteFormat(validCanvasRubric)).toEqual(expected);
    });

    it("handles a Canvas rubric with no criteria", () => {
      // copy the valid rubric and remove the criteria
      const noCriteriaRubric: CanvasRubric = { ...validCanvasRubric, data: [] };

      const expected: Rubric = {
        id: 1,
        title: "Test Rubric",
        pointsPossible: 10,
        criteria: [],
      };

      expect(RubricUtils.toPaletteFormat(noCriteriaRubric)).toEqual(expected);
    });
  });
});
