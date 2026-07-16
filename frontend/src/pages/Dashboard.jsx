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
    <div className="flex h-auto">
      <div className="w-64 border border-gray-300  text-white p-6">
        <h2 className="text-lg font-semibold mb-6 text-white">Dashboard</h2>
        <button
          className={`w-full text-left py-2 px-4 mb-2 rounded ${
            activeTab === "post" ? "bg-orange-500" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("post")}
        >
          Post a Blog
        </button>
        <button
          className={`w-full text-left py-2 px-4 rounded ${
            activeTab === "list" ? "bg-orange-500" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("list")}
        >
          List of Blogs
        </button>
      </div>

      <div className="flex-1 p-6">
        {activeTab === "post" ? (
          <div>
            <h2 className="text-xl font-bold">Post a new blog</h2>
            <div className="mt-8">
              <form
                onSubmit={submitHandler}
                className="w-1/2 flex flex-col gap-3"
              >
                <input
                  name="title"
                  value={formData.title}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="title"
                  required
                  className="border border-gray-300 rounded-md p-2 outline-none w-full"
                />
                <input
                  name="category"
                  value={formData.category}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="category"
                  required
                  className="border border-gray-300 rounded-md p-2 outline-none w-full"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={onChangeHandler}
                  placeholder="description"
                  required
                  className="border border-gray-300 rounded-md p-2 outline-none w-full"
                />

                <div>
                  <label htmlFor="">Choose Image</label>
                  <input
                    onChange={fileHandler}
                    type="file"
                    accept="image/*"
                    required
                    className="border border-gray-300 rounded-md p-2 outline-none w-full"
                  />
                </div>
                <button
                  disabled={loading}
                  className="bg-black text-white w-full rounded-full border-none cursor-pointer py-2 disabled:opacity-60"
                >
                  {loading ? "Posting..." : "post blog"}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-4 h-auto">
            <h2 className="text-xl font-semibold mb-4">List of Blogs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Category</th>
                    <th className="border px-4 py-2">Image</th>
                    <th className="border px-4 py-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="text-center">
                      <td className="border px-4 py-2">{blog.title}</td>
                      <td className="border px-4 py-2">{blog.category}</td>
                      <td className="border px-4 py-2">
                        <img
                          src={getImageUrl(blog.image)}
                          alt={blog.title}
                          className="w-16 h-16 object-cover mx-auto"
                        />
                      </td>
                      <td
                        className="border px-4 py-2 cursor-pointer"
                        onClick={() => removeBlog(blog._id)}
                      >
                        X
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
