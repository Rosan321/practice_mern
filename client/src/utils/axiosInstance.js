import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // ❌ DO NOT refresh if refresh itself failed
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axiosInstance.post("/auth/refresh");
        sessionStorage.setItem("token", refreshRes.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch {
        sessionStorage.clear();
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
