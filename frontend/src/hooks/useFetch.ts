/**
 * useFetch
 *
 * Custom React hook to streamline the process of making API calls within components and managing their loading,
 * error, and response states.
 */

import { useState, useCallback } from "react";
import {
  PaletteAPIRequest,
  PaletteAPIResponse,
} from "../../../palette-types/src/paletteApiTypes.ts";

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
    error: null,
    errors: [],
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
        throw new Error(`Error: ${response.status}`);
      }

      const json = (await response.json()) as T; //
      setResponse({
        data: json,
        success: true,
        error: null,
        errors: [],
        loading: false,
      });
    } catch (error) {
      setResponse({
        data: null,
        success: false,
        // error message added by express
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        errors: [], // array of errors
        loading: false,
      });
    }
  }, [endpoint, options]); // only updates the callback when endpoint or options change

  return { response, fetchData };
}
