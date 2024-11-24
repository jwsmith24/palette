import { render, fireEvent, waitFor } from "@testing-library/react";
import { CSVUpload } from "@features";
import { vi } from "vitest";

describe("CSVUpload Component", () => {
  test("calls the closeImportCard callback after successful import", async () => {
    const mockSetRubric = vi.fn();
    const mockCloseImportCard = vi.fn();

    // Render the component
    const { getByText, container } = render(
      <CSVUpload
        rubric={undefined}
        setRubric={mockSetRubric}
        closeImportCard={mockCloseImportCard}
      />,
    );

    // Simulate clicking "Import CSV"
    const importButton = getByText("Import CSV");
    fireEvent.click(importButton);

    // Simulate clicking "Version 1"
    fireEvent.click(getByText("Version 1"));

    // Ensure a file input is added to the DOM
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toBeTruthy();

    // Create a mock file
    const mockFile = new File(["criterion1,description1,5"], "test.csv", {
      type: "text/csv",
    });

    // Mock the `files` property and trigger change event
    Object.defineProperty(fileInput!, "files", {
      value: [mockFile],
      writable: false,
    });

    fireEvent.change(fileInput!);

    // Verify that the closeImportCard callback was called
    await waitFor(() => {
      expect(mockCloseImportCard).toHaveBeenCalledTimes(1);
    });
  });
});
