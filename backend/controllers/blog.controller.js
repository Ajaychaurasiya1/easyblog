import Blog from "../models/blog.model.js";
import fs from "fs";

export const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ blogs, success: true, message: "All blogs" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    // ✅ safety check
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const image_filename = req.file.filename;

    const blog = await Blog.create({
      title,
      category,
      description,
      image: image_filename,
      author: {
        id: req.user._id,
        name: req.user.name,
        image: req.user.image,
      },
    });

    return res.status(201).json({
      message: "Blog created",
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    // ✅ check first
    if (!blog) {
      return res.status(404).json({ message: "Blog not found", success: false });
    }

    if (blog.author.id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized", success: false });
    }

    // ✅ safe image delete
    const imagePath = `uploads/${blog.image}`;
    if (blog.image && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await blog.deleteOne();

    return res.status(200).json({
      message: "Blog deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const singleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    return res.status(200).json({
      message: "Blog found",
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const userBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ "author.id": req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
