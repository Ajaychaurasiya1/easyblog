import { createContext, useEffect, useState } from "react";
import { getAllBlogs } from "../api/blogs";
import { dummyBlogs } from "../data/dummyBlogs";

export const BlogContext = createContext(null);

const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState(dummyBlogs);

  const refreshBlogs = async () => {
    try {
      const res = await getAllBlogs();
      const apiBlogs = res.data.blogs || [];
      // Curated dummy articles first so the landing page always has content
      const dummyIds = new Set(dummyBlogs.map((b) => b._id));
      const liveOnly = apiBlogs.filter((b) => !dummyIds.has(b._id));
      setBlogData([...dummyBlogs, ...liveOnly]);
    } catch (error) {
      console.log("Error fetching blogs:", error);
      setBlogData(dummyBlogs);
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
