import { beforeEach, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CSVUpload from "@features/rubricBuilder/CSVUpload.tsx";

// Mock papa parse
vi.mock("papaparse", () => ({
  parse: vi.fn(),
}));

describe("CSV upload component", () => {
  const mockOnDataChange = vi.fn();
  const mockCloseImportCard = vi.fn(); // vi.fn() to mock callback props

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays an error if a non-CSV file is uploaded", () => {
    render(
      <CSVUpload
        onDataChange={mockOnDataChange}
        closeImportCard={mockCloseImportCard}
      />,
    );
    const input = screen.getByTestId("file-upload");
    const file = new File(["content"], "bad.txt", { type: "text/plain" }); // try uploading a text file

    // mock the window alert
    vi.spyOn(window, "alert").mockImplementation(() => {}); // have it do nothing

    fireEvent.change(input, { target: { files: [file] } }); // attempt to upload the file

    expect(window.alert).toHaveBeenCalledWith(
      "Unsupported file format. Please upload a CSV file.",
    );
    expect(mockOnDataChange).not.toHaveBeenCalled();
    expect(mockCloseImportCard).not.toHaveBeenCalled();
  });

  test("calls closeImportCard when cancel button is clicked", () => {
    render(
      <CSVUpload
        onDataChange={mockOnDataChange}
        closeImportCard={mockCloseImportCard}
      />,
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockCloseImportCard).toHaveBeenCalled();
  });
});
