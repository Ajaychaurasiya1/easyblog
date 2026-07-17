import { useContext, useMemo, useState } from "react";
import BlogCard from "../components/BlogCard";
import { BlogContext } from "../context/BlogContext";

const Blogs = () => {
  const { blogData } = useContext(BlogContext);
  const [active, setActive] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(blogData.map((b) => b.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [blogData]);

  const filtered =
    active === "All"
      ? blogData
      : blogData.filter((b) => b.category === active);

  return (
    <div>
      <section className="border-b border-[var(--line)] bg-gradient-to-b from-white to-[var(--paper)]">
        <div className="container-pad py-14 sm:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--ember)]">
            Archive
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl text-[var(--ink)]">
            All blogs
          </h1>
          <p className="section-lead mt-4">
            Browse every published article. Filter by topic or dive straight into
            the latest writing from our authors.
          </p>
        </div>
      </section>

      <section className="container-pad py-10 sm:py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active === cat
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-white text-[var(--ink-soft)] hover:border-[var(--ink)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[var(--line)] px-6 py-16 text-center text-[var(--ink-soft)]">
            No articles in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((blog) => (
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
      </section>
    </div>
  );
};

export default Blogs;
