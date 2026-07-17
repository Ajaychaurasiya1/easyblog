export const getErrorMessage = (error, fallback = "Something went wrong") => {
  if (!error) return fallback;

  if (!error.response) {
    if (error.code === "ECONNABORTED") {
      return "Server is taking too long. Please try again in a moment.";
    }
    return "Cannot reach the server. Check your connection and try again.";
  }

  const data = error.response.data;
  if (typeof data === "string" && data.trim()) {
    // Express sometimes returns plain HTML/text "Bad Request"
    if (data.includes("Bad Request")) {
      return "Invalid request. Please check your details and try again.";
    }
    return data.length < 200 ? data : fallback;
  }

  return data?.message || error.message || fallback;
};
