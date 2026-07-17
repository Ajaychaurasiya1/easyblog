import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../api/auth";
import { getErrorMessage } from "../api/errors";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please select a profile image");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name.trim());
      data.append("email", formData.email.trim());
      data.append("password", formData.password);
      data.append("image", formData.image);

      const res = await registerUser(data);

      if (res.data.success) {
        toast.success(res.data.message || "Account created");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Signup failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-pad flex justify-center py-14 sm:py-20">
      <div className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-white p-7 shadow-sm sm:p-9">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--ember)]">
          Join the community
        </p>
        <h1 className="mt-2 font-display text-3xl text-[var(--ink)]">
          Create your Velthrix account
        </h1>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Publish articles, build an audience, and keep your writing in one place.
        </p>
        <form onSubmit={submitHandler} className="mt-7 flex flex-col gap-4">
          <label className="text-sm">
            <span className="mb-1.5 block font-medium">Name</span>
            <input
              onChange={onChangeHandler}
              name="name"
              value={formData.name}
              type="text"
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1.5 block font-medium">Email</span>
            <input
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1.5 block font-medium">Password</span>
            <input
              onChange={onChangeHandler}
              name="password"
              value={formData.password}
              type="password"
              placeholder="Create a password"
              required
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1.5 block font-medium">Profile image</span>
            <input
              onChange={fileHandler}
              accept="image/*"
              type="file"
              required
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-sm outline-none file:mr-3 file:rounded-full file:border-0 file:bg-[var(--ink)] file:px-3 file:py-1 file:text-xs file:text-white"
            />
          </label>
          <button
            disabled={loading}
            className="btn-primary mt-2 w-full cursor-pointer disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--ink-soft)]">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[var(--ember)]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
