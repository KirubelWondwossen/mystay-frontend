const API_URL = "http://127.0.0.1:8000/api";

export async function apiFetch(url, token, data) {
  const res = await fetch(`${API_URL}${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error("Request failed");
  }

  return res.json();
}
// For managers
export const postRooms = (id, token) => apiFetch(`/hotels/${id}/rooms`, token);
