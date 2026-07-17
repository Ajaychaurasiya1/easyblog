import { Link } from "react-router-dom";
import { getImageUrl } from "../config/api";

const BlogCard = ({
  id,
  title,
  category,
  image,
  author_name,
  author_image,
  date,
}) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(18,21,26,0.08)]">
      <Link to={`/blog/${id}`} className="relative block aspect-[16/10] overflow-hidden">
        <img
          src={getImageUrl(image)}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--teal)]">
          {category}
        </p>
        <Link to={`/blog/${id}`}>
          <h3 className="mt-2 font-display text-xl leading-snug text-[var(--ink)] transition group-hover:text-[var(--ember)]">
            {title}
          </h3>
        </Link>
        <div className="mt-auto flex items-center gap-3 pt-5">
          <img
            className="h-8 w-8 rounded-full object-cover border border-[var(--line)]"
            src={getImageUrl(author_image)}
            alt={author_name}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--ink)]">
              {author_name}
            </p>
            <p className="text-xs text-[var(--ink-soft)]">
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
