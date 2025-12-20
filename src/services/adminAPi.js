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

export const getManager = (id, token) => apiFetch(`/hotelmanager/${id}`, token);

export const getHotel = (id, token) => apiFetch(`/hotels/${id}`, token);
