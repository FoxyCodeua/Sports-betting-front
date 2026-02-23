import { API_URL } from "@/lib/config";
import { getStoredPassword } from "@/lib/stores/auth-store";

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
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (path.startsWith("/api/admin")) {
    const password = getStoredPassword();
    if (password) {
      headers["x-admin-password"] = password;
    }
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  const text = await response.text();
  if (!text) return null as T;

  return JSON.parse(text) as T;
}
