import { useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";


const SingleBlog = () => {

  const { id } = useParams();
  console.log("id",id);

  const { blogData } = useContext(StoreContext);
  console.log("blogdata",blogData);

  const blog = blogData.find((b) => b._id === id);
  console.log("single blog",blog);

  return (
    <div className="rounded-md border border-gray-200 p-5 max-w-3xl flex flex-col gap-3 items-center justify-center mx-auto py-8">
      <img
        className="transition-transform duration-300 hover:scale-105"
        src={`VITE_API_URL/images/${blog.image}`}
        alt=""
      />
      <p className="text-2xl font-bold">{blog.title}</p>
      <p className="text-[#4B6BFB]">{blog.category}</p>
      <p>{blog.description}</p>
      <div className="flex gap-2 items-center justify-center">
        <p className="text-lg font-bold">Author:{blog.author.name}</p>
        <img
          className="w-8 h-8 rounded-full"
          src={`VITE_API_URL/images/${blog.author.image}`}
          alt=""
        />
      </div>
      <p>
        {" "}
        {new Date(blog.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
    </div>
  );
};
export default SingleBlog;