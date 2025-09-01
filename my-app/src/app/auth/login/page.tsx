"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import TopNavbar from "../components/topNavBar";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post<{ token: string }>("http://localhost:3000/auth/login", { email, password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setMessage("Login successful!");
        router.replace("/rolecheck");
      } else {
        setMessage("Login failed: No token received.");
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.message
          ? error.response.data.message
          : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl px-10 py-12 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-extrabold text-center text-black-700 mb-2 tracking-wide">
            Staff Login
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Welcome back! Please login to your staff account.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-neutral w-full mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {message && (
            <div className={`mt-4 text-center text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}

          <div className="flex justify-center mt-1">
            <a
              href="/auth/forgot-password"
              className="text-xs text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;