import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getImageUrl } from "../config/api";
import { createBlog, deleteBlog, getAllBlogs } from "../api/blogs";
import { BlogContext } from "../context/BlogContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("list");
  const { refreshBlogs } = useContext(BlogContext);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const loadBlogs = async () => {
    try {
      const res = await getAllBlogs();
      setBlogs(res.data.blogs || []);
    } catch (error) {
      console.log("error", error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please select an image");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      setLoading(true);
      const res = await createBlog(data);
      toast.success(res.data.message);
      setFormData({
        title: "",
        category: "",
        description: "",
        image: null,
      });
      await loadBlogs();
      await refreshBlogs();
      setActiveTab("list");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create blog";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const removeBlog = async (blogId) => {
    try {
      const res = await deleteBlog(blogId);
      toast.success(res.data.message);
      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
      await refreshBlogs();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete blog";
      toast.error(message);
    }
  };

  return (
    <div className="container-pad py-10 sm:py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl">Writer dashboard</h1>
        <p className="mt-2 text-[var(--ink-soft)]">
          Draft new posts or manage everything you have published.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full shrink-0 rounded-2xl bg-[var(--ink)] p-5 text-white lg:w-56">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/45">
            Menu
          </p>
          <button
            type="button"
            className={`mb-2 w-full cursor-pointer rounded-xl px-4 py-2.5 text-left text-sm transition ${
              activeTab === "post" ? "bg-[var(--ember)]" : "bg-white/10 hover:bg-white/15"
            }`}
            onClick={() => setActiveTab("post")}
          >
            Post a blog
          </button>
          <button
            type="button"
            className={`w-full cursor-pointer rounded-xl px-4 py-2.5 text-left text-sm transition ${
              activeTab === "list" ? "bg-[var(--ember)]" : "bg-white/10 hover:bg-white/15"
            }`}
            onClick={() => setActiveTab("list")}
          >
            Your posts
          </button>
        </aside>

        <div className="min-w-0 flex-1 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
          {activeTab === "post" ? (
            <div>
              <h2 className="font-display text-2xl">Publish a new article</h2>
              <form
                onSubmit={submitHandler}
                className="mt-6 flex max-w-xl flex-col gap-4"
              >
                <input
                  name="title"
                  value={formData.title}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="Title"
                  required
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
                />
                <input
                  name="category"
                  value={formData.category}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="Category (e.g. Technology)"
                  required
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={onChangeHandler}
                  placeholder="Write your article..."
                  required
                  rows={6}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
                />
                <label className="text-sm">
                  <span className="mb-1.5 block font-medium">Cover image</span>
                  <input
                    onChange={fileHandler}
                    type="file"
                    accept="image/*"
                    required
                    className="w-full rounded-xl border border-[var(--line)] px-3 py-2 text-sm"
                  />
                </label>
                <button
                  disabled={loading}
                  className="btn-primary mt-2 w-full cursor-pointer disabled:opacity-60 sm:w-auto"
                >
                  {loading ? "Publishing..." : "Publish blog"}
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="font-display text-2xl">Published posts</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--line)] text-left text-[var(--ink-soft)]">
                      <th className="px-3 py-3 font-medium">Title</th>
                      <th className="px-3 py-3 font-medium">Category</th>
                      <th className="px-3 py-3 font-medium">Image</th>
                      <th className="px-3 py-3 font-medium">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr
                        key={blog._id}
                        className="border-b border-[var(--line)] last:border-0"
                      >
                        <td className="px-3 py-3 font-medium">{blog.title}</td>
                        <td className="px-3 py-3 text-[var(--ink-soft)]">
                          {blog.category}
                        </td>
                        <td className="px-3 py-3">
                          <img
                            src={getImageUrl(blog.image)}
                            alt={blog.title}
                            className="h-12 w-16 rounded-lg object-cover"
                          />
                        </td>
                        <td className="px-3 py-3">
                          <button
                            type="button"
                            className="cursor-pointer text-[var(--ember)] hover:underline"
                            onClick={() => removeBlog(blog._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {blogs.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-3 py-10 text-center text-[var(--ink-soft)]"
                        >
                          No posts yet. Switch to “Post a blog” to publish your first article.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
