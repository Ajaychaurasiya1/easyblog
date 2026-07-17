import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { loginUser as loginApi } from "../api/auth";
import { getErrorMessage } from "../api/errors";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginApi({
        email: formData.email.trim(),
        password: formData.password,
      });
      if (res.data.success) {
        const { user, token } = res.data;
        auth?.loginUser(user, token);
        toast.success(res.data.message || "Login successful");
        navigate("/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Login failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-pad flex justify-center py-14 sm:py-20">
      <div className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-white p-7 shadow-sm sm:p-9">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--ember)]">
          Welcome back
        </p>
        <h1 className="mt-2 font-display text-3xl text-[var(--ink)]">
          Sign in to Velthrix Blog
        </h1>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Access your dashboard, publish posts, and manage your profile.
        </p>
        <form onSubmit={submitHandler} className="mt-7 flex flex-col gap-4">
          <label className="text-sm">
            <span className="mb-1.5 block font-medium">Email</span>
            <input
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1.5 block font-medium">Password</span>
            <input
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              type="password"
              placeholder="Your password"
              required
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
            />
          </label>
          <button
            disabled={loading}
            className="btn-primary mt-2 w-full cursor-pointer disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--ink-soft)]">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-[var(--ember)]">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
