/**
 * useFetch
 *
 * Custom React hook to streamline the process of making API calls within components and managing their loading,
 * error, and response states.
 */

import { useState, useEffect } from "react";
import { PaletteAPIBaseRequest } from "../../../palette-types/src/paletteApiTypes.ts";

interface FetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const requestTemplate = {
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  baseURL: "http://localhost:3000/api",
} as PaletteAPIBaseRequest;

export default function useFetch<T>(
  url: string,
  options: RequestInit,
): FetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${requestTemplate.baseURL}${url}`, {
          ...requestTemplate.headers,
          ...options,
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const json = (await response.json()) as T;
        setData(json);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [url, options]);

  return { data, loading, error };
}
