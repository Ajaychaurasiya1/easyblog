const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://easyblog-r43p.onrender.com"
).replace(/\/$/, "");

/** Resolve API upload filenames or Vite-imported / absolute image URLs. */
export const getImageUrl = (image) => {
  if (!image) return "";
  if (
    typeof image === "string" &&
    (image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("/") ||
      image.startsWith("data:") ||
      image.startsWith("blob:"))
  ) {
    return image;
  }
  return `${API_BASE_URL}/images/${image}`;
};

export default API_BASE_URL;
