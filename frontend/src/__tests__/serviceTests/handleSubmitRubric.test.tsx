// RubricBuilder.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RubricBuilder from "../../features/rubricBuilder/RubricBuilder";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

// Mock functions used in RubricBuilder
const setModalTitle = jest.fn();
const setModalMessage = jest.fn();
const openModal = jest.fn();
const closeModal = jest.fn();

// Mock response objects
let postRubricResponse = { success: false, error: "" };
let putRubricResponse = { success: false, error: "" };

// Mock the `useFetch` hook
jest.mock("../../hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    response: { success: false, error: "" }, // Default mock response
    fetchData: jest.fn(), // Mock function for fetchData
  })),
}));

describe("handleSubmitRubric in RubricBuilder", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    postRubricResponse = { success: false, error: "" };
    putRubricResponse = { success: false, error: "" };
  });

  it("displays success modal after a successful rubric submission", async () => {
    postRubricResponse.success = true;

    render(
      <MemoryRouter>
        <RubricBuilder />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByText("Save Rubric"));

    expect(setModalTitle).toHaveBeenCalledWith("Success!");
    expect(setModalMessage).toHaveBeenCalledWith(
      expect.stringContaining("submitted successfully"),
    );
    expect(openModal).toHaveBeenCalled();
  });

  it("handles duplicate rubric scenario and displays options in modal", async () => {
    postRubricResponse.error = "already exists";

    render(
      <MemoryRouter>
        <RubricBuilder />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByText("Save Rubric"));

    expect(setModalTitle).toHaveBeenCalledWith("Duplicate Rubric Detected");
    expect(setModalMessage).toHaveBeenCalledWith(
      expect.stringContaining("already exists"),
    );
    expect(openModal).toHaveBeenCalled();

    // Verify Overwrite and Make a Copy choices are available
    expect(screen.getByText("Overwrite")).toBeInTheDocument();
    expect(screen.getByText("Make a Copy")).toBeInTheDocument();
  });

  it("displays error modal on submission failure", async () => {
    postRubricResponse.error = "Network error";

    render(
      <MemoryRouter>
        <RubricBuilder />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByText("Save Rubric"));

    expect(setModalTitle).toHaveBeenCalledWith("A MYSTERIOUS ERROR OCCURRED");
    expect(setModalMessage).toHaveBeenCalledWith("Network error");
    expect(openModal).toHaveBeenCalled();
  });

  it("executes overwrite action on duplicate modal choice", async () => {
    postRubricResponse.error = "already exists";
    putRubricResponse.success = true;

    render(
      <MemoryRouter>
        <RubricBuilder />
      </MemoryRouter>,
    );

    // Trigger duplicate detection
    await userEvent.click(screen.getByText("Save Rubric"));

    // Simulate clicking "Overwrite"
    await userEvent.click(screen.getByText("Overwrite"));

    expect(closeModal).toHaveBeenCalled();
    expect(openModal).toHaveBeenCalled();
    expect(setModalMessage).toHaveBeenCalledWith(
      "Rubric was overwritten successfully!",
    );
  });

  it("executes make a copy action on duplicate modal choice", async () => {
    postRubricResponse.error = "already exists";
    postRubricResponse.success = true; // Assuming new rubric post is successful

    render(
      <MemoryRouter>
        <RubricBuilder />
      </MemoryRouter>,
    );

    // Trigger duplicate detection
    await userEvent.click(screen.getByText("Save Rubric"));

    // Simulate clicking "Make a Copy"
    await userEvent.click(screen.getByText("Make a Copy"));

    expect(closeModal).toHaveBeenCalled();
    expect(setModalMessage).toHaveBeenCalledWith(
      expect.stringContaining("created successfully"),
    );
    expect(openModal).toHaveBeenCalled();
  });
});
