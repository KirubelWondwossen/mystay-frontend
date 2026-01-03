import { API_URL } from "./apiURl";

export async function apiFetch(url, token) {
  const res = token
    ? await fetch(`${API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "ngrok-skip-browser-warning": true,
        },
      })
    : await fetch(`${API_URL}${url}`, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": true,
        },
      });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error("Request failed");
  }

  return res.json();
}

export async function apiFetchGoogle(url) {
  const res = await fetch(`${API_URL}${url}`, {
    headers: { Accept: "application/json", "ngrok-skip-browser-warning": true },
    credentials: "include",
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error("Request failed");
  }

  return res.json();
}
export const getGuestProfile = (token) => apiFetch(`/guest/profile`, token);

// For Admins
export const getManager = (id, token) => apiFetch(`/hotelmanager/${id}`, token);
export const getManagers = (token) => apiFetch("/hotelmanager/", token);

// For guest
export const getBookings = (token) => apiFetch("/bookings/", token);

// For manager
export const getManagerBookings = (id, token) =>
  apiFetch(`/bookings/hotels/${id}`, token);
export const getManagerInfo = (token) => apiFetch(`/hotelmanager/me`, token);

export const getDashboard = (token) =>
  apiFetch(`/hotelmanager/dashboard`, token);
//Guest
export const getRooms = () => apiFetch("/hotels/rooms");

export const getUnavailableDates = (roomId) =>
  apiFetch(`/hotels/rooms/${roomId}/unavailable-dates`);

export const getGuestBookings = (token, bookingId) =>
  apiFetch(`/bookings/${bookingId}`);

// Hotel
export const getHotel = (id) => apiFetch(`/hotels/${id}`);
export const getHotelRooms = (id) => apiFetch(`/hotels/${id}/rooms`);

//Search
export const searchHotel = (search) =>
  apiFetch(`/hotels/?search=${encodeURIComponent(search)}`);

export const getRoomDetail = (roomId, hotelId) =>
  apiFetch(`/hotels/${hotelId}/rooms/${roomId}`);

export const getRoomsManager = (id, token) =>
  apiFetch(`/hotels/${id}/rooms`, token);
