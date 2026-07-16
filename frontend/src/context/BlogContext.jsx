import { createContext, useEffect, useState } from "react";
import { getAllBlogs } from "../api/blogs";

export const BlogContext = createContext(null);

const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState([]);

  const refreshBlogs = async () => {
    try {
      const res = await getAllBlogs();
      setBlogData(res.data.blogs || []);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    refreshBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogData, setBlogData, refreshBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
