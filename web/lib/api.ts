const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface ApiError {
  message: string;
  details?: { field: string; message: string }[];
}

export async function postRequirement(payload: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/api/requirements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err: ApiError = {
      message: json.error || `Request failed (${res.status})`,
      details: json.details,
    };
    throw err;
  }
  return json as { _id: string; category: string; createdAt: string };
}

export async function checkHealth() {
  const res = await fetch(`${API_URL}/api/health`);
  if (!res.ok) throw new Error("API unreachable");
  return res.json();
}
