import { beforeEach, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CSVUpload } from "@features";

vi.mock("papaparse", () => ({
  parse: vi.fn(),
}));

describe("CSV upload component", () => {
  const mockSetRubric = vi.fn();
  const mockCloseImportCard = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

it("displays an error if no file is selected", () => {
  render(
    <CSVUpload
      rubric={undefined}
      setRubric={mockSetRubric}
      closeImportCard={mockCloseImportCard}
    />
  );

  const fileInput = screen.getByTestId("file-upload");

  // Mock `alert` before triggering
  vi.spyOn(window, "alert").mockImplementation(() => {});

  // Simulate file input with no files selected
  fireEvent.change(fileInput, { target: { files: null } });

  expect(window.alert).toHaveBeenCalledWith(
    "No file selected. Please choose a file to import."
  );
});

  it("displays an error for unsupported file formats", () => {
    render(
      <CSVUpload
        rubric={undefined}
        setRubric={mockSetRubric}
        closeImportCard={mockCloseImportCard}
      />
    );

    const selectFileButton = screen.getByRole("button", { name: /select file/i });
    const fileInput = screen.getByTestId("file-upload");

    vi.spyOn(window, "alert").mockImplementation(() => {});
    const unsupportedFile = new File(["content"], "unsupported.txt", {
      type: "text/plain",
    });

    fireEvent.change(fileInput, { target: { files: [unsupportedFile] } });

    expect(window.alert).toHaveBeenCalledWith(
      "Unsupported file format. Please upload a CSV file."
    );
  });

  it("displays an error if version is not selected before uploading", () => {
    render(
      <CSVUpload
        rubric={undefined}
        setRubric={mockSetRubric}
        closeImportCard={mockCloseImportCard}
      />
    );

    const fileInput = screen.getByTestId("file-upload");
    const csvFile = new File(["content"], "file.csv", { type: "text/csv" });

    vi.spyOn(window, "alert").mockImplementation(() => {});
    fireEvent.change(fileInput, { target: { files: [csvFile] } });

    expect(window.alert).toHaveBeenCalledWith(
      "Please select a parsing version before uploading."
    );
  });

  it("enables the Select File button when a version is selected", () => {
    render(
      <CSVUpload
        rubric={undefined}
        setRubric={mockSetRubric}
        closeImportCard={mockCloseImportCard}
      />
    );

    const importCSVButton = screen.getByRole("button", { name: /import csv/i });
    fireEvent.click(importCSVButton);

    const version1Button = screen.getByRole("button", { name: /version 1/i });
    fireEvent.click(version1Button);

    const selectFileButton = screen.getByRole("button", { name: /select file/i });
    expect(selectFileButton).not.toBeDisabled();
  });

  it("opens the dropdown when Import CSV button is clicked", () => {
    render(
      <CSVUpload
        rubric={undefined}
        setRubric={mockSetRubric}
        closeImportCard={mockCloseImportCard}
      />
    );

    const importCSVButton = screen.getByRole("button", { name: /import csv/i });
    fireEvent.click(importCSVButton);

    expect(screen.getByRole("button", { name: /version 1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /version 2/i })).toBeInTheDocument();
  });
});
