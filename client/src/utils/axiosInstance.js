import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // REQUIRED for cookies
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await api.post("/auth/refresh");
        sessionStorage.setItem(
          "accessToken",
          refreshRes.data.accessToken
        );

        error.config.headers.Authorization =
          `Bearer ${refreshRes.data.accessToken}`;

        return api(error.config);
      } catch {
        sessionStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
