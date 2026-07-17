import { useContext } from "react";
import BlogCard from "./BlogCard";
import { BlogContext } from "../context/BlogContext";

const LatestBlogs = () => {
  const { blogData } = useContext(BlogContext);
  const posts = [...blogData].slice(0, 6);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="section-title">Latest on the blog</h2>
          <p className="section-lead mt-2">
            Fresh essays and notes from the Velthrix community.
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--line)] bg-white/60 px-6 py-12 text-center text-[var(--ink-soft)]">
          No posts yet. Be the first to publish from your dashboard.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              image={blog.image}
              category={blog.category}
              author_name={blog.author.name}
              author_image={blog.author.image}
              date={blog.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestBlogs;
