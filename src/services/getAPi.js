const API_URL = "http://127.0.0.1:8000/api";

export async function apiFetch(url, token) {
  const res = await fetch(`${API_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error("Request failed");
  }

  return res.json();
}

// For Admins
export const getManager = (id, token) => apiFetch(`/hotelmanager/${id}`, token);
export const getHotel = (id, token) => apiFetch(`/hotels/${id}`, token);
export const getManagers = (token) => apiFetch("/hotelmanager/", token);

// For guest
export const getBookings = (token) => apiFetch("/bookings/", token);

// For manager
export const getManagerBookings = (id, token) =>
  apiFetch(`/bookingshotels/${id}`, token);
export const getManagerInfo = (token) => apiFetch(`/hotelmanager/me`, token);
