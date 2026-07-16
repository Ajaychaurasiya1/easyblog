import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { loginUser as loginApi } from "../api/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginApi(formData);
      if (res.data.success) {
        const { user, token } = res.data;
        loginUser(user, token);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full bg-pink-200 py-12 mx-auto flex items-center justify-center">
      <div className=" w-full bg-white max-w-md p-5 mx-auto py-6 border border-gray-200 shadow-md ">
        <h1 className=" text-lg font-bold text-center text-gray-700">
          Login into your account!
        </h1>
        <form
          onSubmit={submitHandler}
          action=""
          className=" flex flex-col gap-5 mt-5 w-full"
        >
          <input
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Enter your email"
            required
            className=" w-full p-2 border border-gray-300 rounded outline-none"
          />
          <input
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Enter your password"
            required
            className=" w-full p-2 border border-gray-300 rounded outline-none"
          />

          <button
            disabled={loading}
            className=" bg-orange-600 text-white px-6 py-2 w-full cursor-pointer disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Signin"}
          </button>
        </form>
        <p className=" text-center mt-4">
          Don't have an account?{" "}
          <Link to={"/register"} className=" text-orange-600 cursor-pointer">
            Register Here
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
