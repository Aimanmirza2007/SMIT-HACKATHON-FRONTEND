"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_ATLAS_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Login response:", data); // 👀 Check the response
    if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
      alert(`Welcome, ${data.user.name}`);
      console.log(data.user.name);
      
      router.push("/portfolio");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-700 via-[#000000] to-teal-800 px-4 ">
      <div className="relative z-10 max-w-md w-full bg-transparent border border-teal-700 text-white mt-20 p-8 rounded-xl shadow-2xl shadow-teal-800/100  backdrop-blur-md animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-600 animate-slideDown">
          Create an Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-teal-400"
            >
              Email Address
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-black border border-teal-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-teal-400"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 bg-black border border-teal-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            />
          </div>

          <div className="text-sm text-center text-pink-200">
            You dont't have an account
            <Link
              href="/signup"
              className="ml-1 underline hover:text-teal-400 transition"
            >
              Signup
            </Link>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-teal-700 hover:bg-teal-800 transition-colors text-white py-3 rounded-md font-semibold shadow-md"
          >
            Login
          </button>
        </form>
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }

        .animate-slideDown {
          animation: slideDown 1s ease-out;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
