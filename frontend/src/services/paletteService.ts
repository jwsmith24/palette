// wip

import {
  APIRequest,
  APIResponse,
} from "../../../palette-types/src/apiTypes.ts";

const requestTemplate = {
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  baseURL: "http://localhost:3000/api",
} as APIRequest;

export async function paletteRequest<T>(
  url: string,
  options: APIRequest = {}, // defaults to empty object for flexibility
): Promise<APIResponse<T>> {
  const { headers, ...otherOptions } = options;

  const response = await fetch(`${requestTemplate.baseURL}${url}`, {
    ...otherOptions, // spread in function-specific options (method, body, etc.)
    headers: {
      ...requestTemplate.headers,
      ...headers, // overwrite default headers if necessary
    },
  });
  const data = (await response.json()) as APIResponse<T>;

  if (!response.ok) throw new Error(data.error || "API request failed");
  return data;
}
