import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/BlogCard";
import { getImageUrl } from "../config/api";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

const getWordCount = (text = "") =>
  text.trim().split(/\s+/).filter(Boolean).length;

const getReadTime = (text = "") => {
  const words = getWordCount(text);
  return Math.max(1, Math.ceil(words / 200));
};

const splitContent = (description = "") => {
  const paragraphs = description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length > 1) {
    return {
      intro: paragraphs[0],
      body: paragraphs.slice(1),
      takeaways: paragraphs.slice(1, 4).map((p) => p.split(".")[0] + "."),
    };
  }

  const sentences = description
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length <= 1) {
    return { intro: description, body: [], takeaways: [] };
  }

  return {
    intro: sentences[0],
    body: sentences.slice(1).reduce((acc, sentence, i) => {
      const groupIndex = Math.floor(i / 2);
      if (!acc[groupIndex]) acc[groupIndex] = [];
      acc[groupIndex].push(sentence);
      return acc;
    }, []).map((group) => group.join(" ")),
    takeaways: sentences.slice(1, 4),
  };
};

const SingleBlog = () => {
  const { id } = useParams();
  const { blogData } = useContext(BlogContext);
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const blog = blogData.find((b) => b._id === id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Blog not found</h1>
        <p className="text-gray-600 mb-6">
          The article you are looking for may have been removed or does not exist.
        </p>
        <Link
          to="/blogs"
          className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 duration-300"
        >
          Back to all blogs
        </Link>
      </div>
    );
  }

  const readTime = getReadTime(blog.description);
  const wordCount = getWordCount(blog.description);
  const { intro, body, takeaways } = splitContent(blog.description);
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(blog.title);

  const relatedBlogs = blogData
    .filter((b) => b._id !== blog._id && b.category === blog.category)
    .slice(0, 3);

  const fallbackRelated = blogData
    .filter((b) => b._id !== blog._id)
    .slice(0, 3);

  const suggestions = relatedBlogs.length > 0 ? relatedBlogs : fallbackRelated;

  const categoryCount = blogData.filter(
    (b) => b.category === blog.category
  ).length;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100">
        <div
          className="h-full bg-orange-500 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-orange-500 duration-300">
            Home
          </Link>
          <span>/</span>
          <Link to="/blogs" className="hover:text-orange-500 duration-300">
            Blogs
          </Link>
          <span>/</span>
          <span className="text-[#4B6BFB]">{blog.category}</span>
          <span>/</span>
          <span className="text-gray-700 truncate max-w-[200px] sm:max-w-xs">
            {blog.title}
          </span>
        </nav>

        <Link
          to="/blogs"
          className="inline-flex items-center gap-1 text-gray-600 hover:text-orange-500 duration-300 mb-8"
        >
          ← Back to all blogs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <div>
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-block bg-[#4B6BFB]/10 text-[#4B6BFB] text-sm font-semibold px-3 py-1 rounded-full">
                  {blog.category}
                </span>
                <span className="text-sm text-gray-500">
                  {categoryCount} article{categoryCount !== 1 ? "s" : ""} in this category
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {blog.title}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-6 border-l-4 border-orange-500 pl-4">
                {intro}
              </p>

              <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    src={getImageUrl(blog.author.image)}
                    alt={blog.author.name}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {blog.author.name}
                    </p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>

                <span className="hidden sm:block w-px h-8 bg-gray-200" />

                <p className="text-sm text-gray-500">
                  Published{" "}
                  <span className="text-gray-700 font-medium">
                    {formatDate(blog.createdAt)}
                  </span>
                </p>

                {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                  <>
                    <span className="hidden sm:block w-px h-8 bg-gray-200" />
                    <p className="text-sm text-gray-500">
                      Updated{" "}
                      <span className="text-gray-700 font-medium">
                        {formatDate(blog.updatedAt)}
                      </span>
                    </p>
                  </>
                )}

                <span className="hidden sm:block w-px h-8 bg-gray-200" />

                <p className="text-sm text-gray-500">{readTime} min read</p>

                <span className="hidden sm:block w-px h-8 bg-gray-200" />

                <p className="text-sm text-gray-500">{wordCount} words</p>
              </div>
            </header>

            <div className="mb-10 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <img
                className="w-full max-h-[480px] object-cover"
                src={getImageUrl(blog.image)}
                alt={blog.title}
              />
              <p className="text-xs text-gray-400 px-4 py-2 bg-gray-50 border-t border-gray-100">
                Featured image for &ldquo;{blog.title}&rdquo;
              </p>
            </div>

            {body.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Full article
                </h2>
                <div className="space-y-5">
                  {body.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base sm:text-lg text-gray-700 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {body.length === 0 && intro !== blog.description && (
              <section className="mb-10">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {blog.description}
                </p>
              </section>
            )}

            {takeaways.length > 0 && (
              <section className="mb-10 bg-orange-50 border border-orange-100 rounded-xl p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Key takeaways
                </h2>
                <ul className="space-y-3">
                  {takeaways.map((point, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-gray-700 leading-relaxed"
                    >
                      <span className="text-orange-500 font-bold shrink-0">
                        {index + 1}.
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mb-10">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Share this article
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-orange-500 hover:text-orange-500 duration-300 cursor-pointer"
                >
                  {copied ? "Link copied!" : "Copy link"}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-orange-500 hover:text-orange-500 duration-300"
                >
                  Share on X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-orange-500 hover:text-orange-500 duration-300"
                >
                  Share on LinkedIn
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-orange-500 hover:text-orange-500 duration-300"
                >
                  Share on Facebook
                </a>
              </div>
            </section>

            <aside className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
              <p className="text-sm uppercase tracking-wide text-gray-500 mb-3">
                About the author
              </p>
              <div className="flex items-start gap-4">
                <img
                  className="w-16 h-16 rounded-full object-cover border border-gray-200 shrink-0"
                  src={getImageUrl(blog.author.image)}
                  alt={blog.author.name}
                />
                <div>
                  <p className="text-lg font-bold text-gray-800">
                    {blog.author.name}
                  </p>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    Writer at Velthrix Blog covering {blog.category.toLowerCase()}{" "}
                    topics. Passionate about sharing insights and helping readers
                    stay informed.
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    Author ID: {blog.author.id?.slice(-6) ?? "N/A"}
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div className="border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">
                Article details
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Category</dt>
                  <dd className="font-medium text-[#4B6BFB] text-right">
                    {blog.category}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Published</dt>
                  <dd className="font-medium text-gray-800 text-right">
                    {formatDate(blog.createdAt)}
                  </dd>
                </div>
                {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Last updated</dt>
                    <dd className="font-medium text-gray-800 text-right">
                      {formatDate(blog.updatedAt)}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Reading time</dt>
                  <dd className="font-medium text-gray-800 text-right">
                    {readTime} min
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Word count</dt>
                  <dd className="font-medium text-gray-800 text-right">
                    {wordCount}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Author</dt>
                  <dd className="font-medium text-gray-800 text-right">
                    {blog.author.name}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {[blog.category, "Velthrix Blog", "Articles"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">
                Quick share
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCopyLink}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 duration-300 cursor-pointer"
                >
                  {copied ? "✓ Link copied" : "Copy article link"}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 duration-300"
                >
                  Post on X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 duration-300"
                >
                  Share on LinkedIn
                </a>
              </div>
            </div>

            <div className="bg-orange-500 rounded-xl p-5 text-white">
              <h3 className="font-bold text-lg mb-2">Explore more</h3>
              <p className="text-sm text-orange-100 mb-4 leading-relaxed">
                Discover more articles on {blog.category.toLowerCase()} and other
                topics on Velthrix Blog.
              </p>
              <Link
                to="/blogs"
                className="inline-block bg-white text-orange-500 text-sm font-semibold px-4 py-2 rounded-full hover:bg-orange-50 duration-300"
              >
                Browse all blogs
              </Link>
            </div>
          </aside>
        </div>

        {suggestions.length > 0 && (
          <section className="mt-12 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {relatedBlogs.length > 0
                ? `More in ${blog.category}`
                : "You might also like"}
            </h2>
            <p className="text-gray-500 mb-6">
              Continue reading with these related articles
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((item) => (
                <BlogCard
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  image={item.image}
                  category={item.category}
                  author_name={item.author.name}
                  author_image={item.author.image}
                  date={item.createdAt}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
};

export default SingleBlog;
