import { renderHook, act } from "@testing-library/react";
import useFetch from "../../hooks/useFetch";

// Mock the fetch API
global.fetch = jest.fn();

describe("useFetch", () => {
  const mockData = { message: "Success!" }; // returns whenever fetch is called
  const endpoint = "/test-endpoint"; // simulated endpoint

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set loading to true while fetching data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useFetch(endpoint));

    // Assert initial loading state
    expect(result.current.response.loading).toBe(true);

    await act(async () => {
      await result.current.fetchData();
    });

    // Assert loading is set to false after fetching
    expect(result.current.response.loading).toBe(false);
    expect(result.current.response.success).toBe(true);
    expect(result.current.response.data).toEqual(mockData);
  });

  it("should set error state if the fetch request fails", async () => {
    const errorMessage = "Error: 500";
    (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useFetch(endpoint));

    await act(async () => {
      await result.current.fetchData();
    });

    expect(result.current.response.loading).toBe(false);
    expect(result.current.response.success).toBe(false);
    expect(result.current.response.error).toBe(errorMessage);
    expect(result.current.response.data).toBeNull();
  });

  it("should override default headers with options provided", async () => {
    const customHeader = { Authorization: "Bearer token SECRET" };
    const customOptions = { headers: customHeader };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useFetch(endpoint, customOptions));

    await act(async () => {
      await result.current.fetchData();
    });

    // Check that fetch was called with the custom header
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(endpoint),
      expect.objectContaining({
        headers: expect.objectContaining(customHeader) as Record<
          string,
          string
        >,
      }),
    );

    expect(result.current.response.success).toBe(true);
    expect(result.current.response.data).toEqual(mockData);
  });

  it("should use specified method from options", async () => {
    const customMethod = "POST";
    const customOptions = { method: customMethod };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useFetch(endpoint, customOptions));

    await act(async () => {
      await result.current.fetchData();
    });

    // Check that fetch was called with the specified method
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(endpoint),
      expect.objectContaining({
        method: customMethod,
      }),
    );

    expect(result.current.response.success).toBe(true);
    expect(result.current.response.data).toEqual(mockData);
  });
});
