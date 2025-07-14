import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { email, password } = loginData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/login-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();
    if (response.ok) {
      toast.success(result.message);
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center bg-purple-500">
      <div className="max-w-xl w-xl bg-white rounded-xl">
        <h2 className="text-2xl text-center font-bold text-green-500 py-5">
          Login to continue..
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-20 gap-2 py-4"
        >
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="outline-none focus:outline-3 focus:outline-green-400 px-2 py-1 border border-zinc-300 rounded"
            placeholder="example@gmail.com"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <label className="font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="outline-none focus:outline-3 focus:outline-green-400 px-2 py-1 border border-zinc-300 rounded"
            placeholder="********"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <button className="mt-3 bg-green-500 rounded py-1 font-extrabold text-white hover:bg-green-700 cursor-pointer">
            Login
          </button>
          <p className="text-center py-2 capitalize">
            Don't have an Account-
            <Link
              className="text-blue-900 font-bold underline"
              to={"/register"}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
