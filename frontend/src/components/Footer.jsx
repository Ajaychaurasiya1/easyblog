import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--ink)] text-white">
      <div className="container-pad grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="" className="h-8 brightness-0 invert" />
            <p className="font-display text-2xl">
              Velthrix <span className="font-semibold">Blog</span>
            </p>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
            A home for thoughtful articles on technology, business, and modern
            life. Read deeply, write clearly, and ship ideas that matter.
          </p>
          <p className="mt-4 text-sm text-white/55">
            ajaychaurasiya@gmail.com
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/45">
            Explore
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/75">
            <Link className="hover:text-[var(--ember)] transition" to="/">
              Home
            </Link>
            <Link className="hover:text-[var(--ember)] transition" to="/blogs">
              All blogs
            </Link>
            <Link className="hover:text-[var(--ember)] transition" to="/about">
              About
            </Link>
            <Link className="hover:text-[var(--ember)] transition" to="/contact">
              Contact
            </Link>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/45">
            Topics
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/75">
            <li>Technology</li>
            <li>Business</li>
            <li>Lifestyle</li>
            <li>Learning</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-pad flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Velthrix Blog. Built by Ajay Chaurasiya.</p>
          <p>Privacy · Terms · Community guidelines</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
