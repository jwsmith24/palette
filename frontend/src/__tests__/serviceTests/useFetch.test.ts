import { renderHook, act } from "@testing-library/react-hooks";
import useFetch from "../../hooks/useFetch";

// Mocking the global fetch function
global.fetch = jest.fn();

const mockFetchResponse = async (data: unknown, ok = true, status = 200) => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok,
    status,
    json: async () => data,
  });
};

describe("useFetch hook", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear previous mocks between tests
  });

  it("should start with loading state", async () => {
    const { result } = renderHook(() => useFetch("/test"));

    expect(result.current.response.loading).toBe(true);
  });

  it("should fetch and return data on success", async () => {
    const mockData = { message: "Success" };
    await mockFetchResponse(mockData);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch<{ message: string }>("/test"),
    );

    act(() => {
      result.current.fetchData();
    });

    await waitForNextUpdate();

    expect(result.current.response.loading).toBe(false);
    expect(result.current.response.success).toBe(true);
    expect(result.current.response.data).toEqual(mockData);
    expect(result.current.response.error).toBeNull();
  });

  it("should handle fetch error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

    const { result, waitForNextUpdate } = renderHook(() => useFetch("/test"));

    act(() => {
      result.current.fetchData();
    });

    await waitForNextUpdate();

    expect(result.current.response.loading).toBe(false);
    expect(result.current.response.success).toBe(false);
    expect(result.current.response.error).toBe("Fetch error");
    expect(result.current.response.data).toBeNull();
  });

  it("should handle HTTP error responses", async () => {
    await mockFetchResponse(null, false, 404);

    const { result, waitForNextUpdate } = renderHook(() => useFetch("/test"));

    act(() => {
      result.current.fetchData();
    });

    await waitForNextUpdate();

    expect(result.current.response.loading).toBe(false);
    expect(result.current.response.success).toBe(false);
    expect(result.current.response.error).toBe("Error: 404");
    expect(result.current.response.data).toBeNull();
  });
});
