import { useAuth } from "../context/AuthContext";

export function useApi() {
  const { token, logout } = useAuth();

  const request = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      logout();
      throw new Error("Unauthorized");
    }

    return res.json();
  };

  return { request };
}
