import toast from "react-hot-toast";

export async function fetchData(token, url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized. Please login again.");
      }
      const message = res.statusText;
      throw new Error(message || "Failed to fetch data");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    toast.error(err.message || "Something went wrong");
    throw err;
  }
}
