import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/blogs", label: "Blogs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-300 ${
      isActive ? "text-[var(--ember)]" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
    }`;

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--line)]/80 bg-[rgba(248,249,251,0.85)] backdrop-blur-md">
      <div className="container-pad flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={assets.logo} alt="Velthrix" className="h-8 w-auto" />
          <span className="hidden font-display text-2xl sm:inline">
            Velthrix <span className="font-semibold">Blog</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClass} end={link.to === "/"}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 sm:flex">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-full bg-[var(--ink)] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Dashboard
              </Link>
              <button
                onClick={logoutUser}
                className="btn-primary !py-2 !px-5 text-sm cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary !py-2 !px-6 text-sm">
              Sign in
            </Link>
          )}
        </div>

        <button
          type="button"
          className="sm:hidden rounded-md border border-[var(--line)] px-3 py-1.5 text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--paper)] px-4 py-4 sm:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={linkClass}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[var(--ink)] px-5 py-2 text-center text-sm text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    setOpen(false);
                  }}
                  className="btn-primary text-sm cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="btn-primary text-sm text-center"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
