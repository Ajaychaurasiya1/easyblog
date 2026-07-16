import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { uploadSingle } from "../middlewares/multer.js";
import {
  allBlogs,
  createBlog,
  deleteBlog,
  userBlogs,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, uploadSingle("image"), createBlog);
router.get("/all", allBlogs);
router.delete("/delete/:id", isAuthenticated, deleteBlog);
router.get("/user/blogs", isAuthenticated, userBlogs);

export default router;
