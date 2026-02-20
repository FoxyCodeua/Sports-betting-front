import { API_URL } from "@/lib/config";

const BASE_URL = API_URL;

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: string,
  ) {
    super(`API Error ${status}: ${body}`);
    this.name = "ApiError";
  }
}

export async function restFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  const text = await response.text();
  if (!text) return null as T;

  return JSON.parse(text) as T;
}
