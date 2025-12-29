import { API_URL } from "./apiURl";

export async function apiFetchFormData(url, token, data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const res = await fetch(`${API_URL}${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "ngrok-skip-browser-warning": true,
    },
    body: formData,
  });

  if (!res.ok) {
    if (res.status === 422) {
      const errData = await res.json();
      const error = new Error("Validation error");
      error.type = "validation";
      error.errors = errData.detail || errData.errors || {};
      throw error;
    }
    if (res.status === 401) throw new Error("Unauthorized");

    if (res.status === 409) throw new Error("Room number already exist");

    throw new Error("Request failed");
  }

  return res.json();
}

// For managers
export const postRooms = (id, token, data) =>
  apiFetchFormData(`/hotels/${id}/rooms`, token, data);

// Guest
export const Book = (token, data) =>
  apiFetchFormData(`/bookings/`, token, data);
