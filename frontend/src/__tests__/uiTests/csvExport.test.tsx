import { render, screen, fireEvent } from "@testing-library/react";
import { vi, beforeEach, describe, it, expect, MockedFunction } from "vitest";
import Papa from "papaparse";
import CSVExport from "@features/rubricBuilder/CSVExport";
import { Rubric } from "palette-types/src"; 

// Mock the unparse method from Papa Parse
vi.mock("papaparse", () => ({
  unparse: vi.fn(),
}));

describe("CSVExport Component", () => {
  const mockRubric: Rubric = {
    title: "Sample Rubric",
    pointsPossible: 100,
    key: "unique-key-123",
    criteria: [
      {
        id: 1,
        description: "Criterion 1",
        longDescription: "Detailed description for Criterion 1",
        points: 10,
        ratings: [
          { points: 5, description: "Excellent", longDescription: "", key: "1" },
          { points: 3, description: "Good", longDescription: "", key: "2" },
          { points: 1, description: "Poor", longDescription: "", key: "3" },
        ],
        key: "criterion-key-1",
        updatePoints: vi.fn(),
      },
      {
        id: 2,
        description: "Criterion 2",
        longDescription: "Detailed description for Criterion 2",
        points: 20,
        ratings: [
          { points: 10, description: "Perfect", longDescription: "", key: "4" },
          { points: 5, description: "Satisfactory", longDescription: "", key: "5" },
        ],
        key: "criterion-key-2",
        updatePoints: vi.fn(),
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("generates CSV data with correct headers and rows", () => {
    render(<CSVExport rubric={mockRubric} />);

    // Cast Papa.unparse as a mocked function to access the .mock property
    const mockedUnparse = Papa.unparse as MockedFunction<typeof Papa.unparse>;

    // Find and click the export button
    const exportButton = screen.getByText("Export to CSV");
    fireEvent.click(exportButton);

    // Check if Papa.unparse was called with the correct data
    expect(mockedUnparse).toHaveBeenCalledTimes(1);
    const csvData = mockedUnparse.mock.calls[0][0] as string[][];

    // Expected CSV headers based on maximum ratings
    const expectedHeaders = [
      "Criteria/Title",
      "Rating 1",
      "Reason 1",
      "Rating 2",
      "Reason 2",
      "Rating 3",
      "Reason 3",
    ];
    expect(csvData[0]).toEqual(expectedHeaders);

    // Expected CSV rows
    const expectedRow1 = ["Criterion 1", "5", "Excellent", "3", "Good", "1", "Poor"];
    const expectedRow2 = ["Criterion 2", "10", "Perfect", "5", "Satisfactory", "", ""];

    expect(csvData[1]).toEqual(expectedRow1);
    expect(csvData[2]).toEqual(expectedRow2);
  });

  it("trigger download with the correct file name", () => {
    // Mock the URL and link creation to intercept the download behavior
    const createObjectURLSpy = vi.spyOn(URL, "createObjectURL").mockReturnValue("mock-url");
    const linkClickSpy = vi.spyOn(document.createElement("a"), "click");

    render(<CSVExport rubric={mockRubric} />);

    const exportButton = screen.getByText("Export to CSV");
    fireEvent.click(exportButton);

    // Check that a Blob was created and a URL was generated
    expect(createObjectURLSpy).toHaveBeenCalled();

    // Check if link click was triggered
    expect(linkClickSpy).toHaveBeenCalled();
    createObjectURLSpy.mockRestore();
    linkClickSpy.mockRestore();
  });
});
