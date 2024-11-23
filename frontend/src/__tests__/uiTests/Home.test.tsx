import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { colorOptions, randomColor } from "@utils";
import { Home } from "@features";

describe("home page view", () => {
  it("should have a header that welcomes the user to the site", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const heading = screen.getByText(/welcome to palette/i);
    expect(heading).toBeInTheDocument();
  });
  it("should have a login button and a sign up button", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const loginButton = screen.getByText(/log in/i);
    const signupButton = screen.getByText(/sign up/i);
    expect(loginButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });
});

describe("randomColor", () => {
  it("returns a valid color from the options array", () => {
    const mockRandom = vi.spyOn(Math, "random");

    colorOptions.forEach((colorClass, index) => {
      mockRandom.mockReturnValue(index / colorOptions.length);
      expect(randomColor()).toBe(colorClass);
    });
    mockRandom.mockRestore();
  });
});
