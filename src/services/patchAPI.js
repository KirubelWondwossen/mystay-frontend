const API_URL = "http://127.0.0.1:8000/api";

export async function apiPatchFormData(url, token, data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    // 🔑 Important: skip null/undefined fields (especially image)
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });

  const res = await fetch(`${API_URL}${url}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
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
    throw new Error("Request failed");
  }

  return res.json();
}

// Manager
export const updateRooms = (hotelID, roomID, token, data) =>
  apiPatchFormData(`/hotels/${hotelID}/rooms/${roomID}`, token, data);
