import { API_URL } from "./apiURl";

export async function apiDelete(url, token) {
  const res = await fetch(`${API_URL}${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error("Delete request failed");
  }

  if (res.status === 204) return null;

  return res.json();
}
// For managers
export const deleteRoom = (hotelID, roomID, token) =>
  apiDelete(`/hotels/${hotelID}/rooms/${roomID}`, token);
