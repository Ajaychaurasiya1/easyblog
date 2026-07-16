import api from "./client";

export const getAllBlogs = () => api.get("/blog/all");

export const createBlog = (formData) => api.post("/blog/create", formData);

export const deleteBlog = (blogId) => api.delete(`/blog/delete/${blogId}`);

export const getUserBlogs = () => api.get("/blog/user/blogs");
