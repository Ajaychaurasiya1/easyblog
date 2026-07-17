import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "https://easyblog-r43p.onrender.com").replace(
  /\/$/,
  ""
);

const api = axios.create({
  baseURL,
  timeout: 60000,
});

api.interceptors.request.use((config) => {
  const url = config.url || "";
  const isAuthRoute =
    url.includes("/user/login") || url.includes("/user/register");

  // Let the browser set multipart boundary for FormData
  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    if (config.headers) {
      if (typeof config.headers.delete === "function") {
        config.headers.delete("Content-Type");
      } else {
        delete config.headers["Content-Type"];
        delete config.headers["content-type"];
      }
    }
  }

  if (!isAuthRoute) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
