const API_BASE: string =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

/**
 * POST request helper
 */
export async function apiPost<T = any>(
  path: string,
  body: any,
  options?: {
    token?: string;
    isFormData?: boolean;
  }
): Promise<T> {
  const headers: Record<string, string> = {};
  const isFormData = options?.isFormData ?? false;
  const token = options?.token;

  // Set JSON header only when NOT sending FormData
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  // Auth header
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });

  let data: any = {};
  try {
    data = await res.json();
  } catch {
    // ignore JSON parse errors
  }

  if (!res.ok) {
    throw new Error(data?.msg || data?.error || "API error");
  }

  return data as T;
}

/**
 * GET request helper
 */
export async function apiGet<T = any>(
  path: string,
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers,
  });

  let data: any = {};
  try {
    data = await res.json();
  } catch {
    // ignore JSON parse errors
  }

  if (!res.ok) {
    throw new Error(data?.msg || data?.error || "API error");
  }

  return data as T;
}
