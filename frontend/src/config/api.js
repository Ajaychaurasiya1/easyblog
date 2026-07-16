const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = (filename) =>
  filename ? `${API_BASE_URL}/images/${filename}` : "";

export default API_BASE_URL;
