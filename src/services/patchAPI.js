const API_URL = "http://127.0.0.1:8000/api";

export async function apiPatchJson(url, token, data) {
  const res = await fetch(`${API_URL}${url}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    if (res.status === 422) {
      const errData = await res.json();
      const error = new Error("Validation error");
      error.type = "validation";
      error.errors = errData.errors || errData.detail || {};
      throw error;
    }
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error("Request failed");
  }

  return res.json();
}

// Manager
export const updateRooms = (hotelID, roomID, token, data) =>
  apiPatchJson(`/hotels/${hotelID}/rooms/${roomID}`, token, data);

export const updateHotel = (hotelId, token, data) =>
  apiPatchJson(`/hotels/${hotelId}`, token, data);

export const checkIn = (id, token) =>
  apiPatchJson(`/bookings/${id}/confirm`, token);

export const cancelBooking = (id, token) =>
  apiPatchJson(`/bookings/${id}/cancel`, token);

export const completeBooking = (id, token) =>
  apiPatchJson(`/bookings/${id}/complete`, token);
