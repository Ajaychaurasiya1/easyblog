import api from "./client";

export const registerUser = (formData) =>
  api.post("/user/register", formData);

export const loginUser = (credentials) =>
  api.post("/user/login", credentials, {
    headers: { "Content-Type": "application/json" },
  });
