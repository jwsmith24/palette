/**
 * useFetch
 *
 * Custom React hook to streamline the process of making API calls within components and managing their loading,
 * error, and response states.
 */

import { useCallback, useState } from "react";
import { PaletteAPIRequest, PaletteAPIResponse } from "palette-types";

const DEFAULT_REQUEST = {
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  baseURL: "http://localhost:3000/api",
  method: "GET",
} as PaletteAPIRequest;

export default function useFetch<T>(
  endpoint: string, // url path to target endpoint
  options: Partial<PaletteAPIRequest> = {}, // use defaults if nothing is provided
) {
  const [response, setResponse] = useState<PaletteAPIResponse<T>>({
    data: null,
    success: false,
    loading: true,
  });

  const fetchData = useCallback(async () => {
    // display loading indication while request is processing
    setResponse((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch(`${DEFAULT_REQUEST.baseURL}${endpoint}`, {
        // safer/explicit spreading
        headers: {
          ...DEFAULT_REQUEST.headers, // use default headers, allow functions to overwrite
          ...(options.headers || {}),
        },
        method: options.method || DEFAULT_REQUEST.method, // use specified method, otherwise default to GET
        body: options.body || null, // use specified body or default to an empty body
      });

      if (!response.ok) {
        const errorResponse =
          (await response.json()) as PaletteAPIResponse<null>;
        throw new Error(`Error: ${errorResponse.error}`);
      }

      const json = (await response.json()) as T;
      const newResponse: PaletteAPIResponse<T> = {
        data: json,
        success: true,
        loading: false,
      };
      setResponse(newResponse);
      return newResponse;
    } catch (error) {
      console.log("API Request failed:", error);
      const errorResponse: PaletteAPIResponse<T> = {
        data: null,
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      };
      setResponse(errorResponse);
      return errorResponse;
    }
  }, [endpoint, options]); // only updates the callback when endpoint or options change
  return { response, fetchData };
}
