const BACKEND_URL = "http://localhost:3000";
const slowDown = "?slow"; // ""

export async function fetchJson(path: string) {
  const url = `${BACKEND_URL}${path}${slowDown}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response from server not OK: ${response.status}`);
  }
  return await response.json();
}

type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

export async function sendJson(method: HttpMethod, path: string, payload = {}) {
  const url = `${BACKEND_URL}${path}${slowDown}`;

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Response from server not OK: ${response.status}`);
  }

  return await response.json();
}
