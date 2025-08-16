"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    github: "",
    skills: [""],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // For skills input
  const handleSkillChange = (index, value) => {
    const newSkills = [...form.skills];
    newSkills[index] = value;
    setForm({ ...form, skills: newSkills });
  };

  const addSkill = () => {
    setForm({ ...form, skills: [...form.skills, ""] });
  };

  const removeSkill = (index) => {
    const newSkills = form.skills.filter((_, i) => i !== index);
    setForm({ ...form, skills: newSkills });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload removing empty skills
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      github: form.github,
      image: form.image, // ✅ add this
      skills: form.skills.filter((skill) => skill.trim() !== ""),
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_ATLAS_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful!");
      router.push("/");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-700 via-[#000000] to-teal-800 px-4 ">
      <div className="relative z-10 max-w-md w-full bg-transparent border border-teal-700 text-white mt-20 p-8 rounded-xl shadow-2xl shadow-teal-800/100  backdrop-blur-md animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-600 animate-slideDown">
          Create an Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-semibold text-teal-400"
            >
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              value={form.name}
              placeholder="Your full name"
              required
              className="w-full px-4 py-2 bg-black border border-teal-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            />
          </div>

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
              value={form.email}
              placeholder="you@example.com"
              required
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
              value={form.password}
              placeholder="Create a password"
              required
              className="w-full px-4 py-2 bg-black border border-teal-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            />
          </div>

          {/* Github */}
          <div>
            <label
              htmlFor="github"
              className="block mb-1 font-semibold text-teal-400"
            >
              GitHub Profile URL
            </label>
            <input
              onChange={handleChange}
              type="url"
              id="github"
              name="github"
              value={form.github}
              placeholder="https://github.com/yourusername"
              className="w-full px-4 py-2 bg-black border border-teal-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label
              htmlFor="profilePic"
              className="block mb-1 font-semibold text-teal-400"
            >
              Upload Profile Picture
            </label>
            <input
              onChange={handleImageUpload}
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              className="w-full text-white"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block mb-1 font-semibold text-teal-400">
              Skills
            </label>
            {form.skills.map((skill, idx) => (
              <div key={idx} className="flex mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(idx, e.target.value)}
                  placeholder="Enter a skill"
                  className="flex-grow px-4 py-2 bg-black border border-teal-500 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                />
                {form.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill(idx)}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-3 rounded-r-md transition"
                    aria-label="Remove skill"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="mt-1 text-teal-400 underline hover:text-teal-600"
            >
              + Add Skill
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-teal-700 hover:bg-teal-800 transition-colors text-white py-3 rounded-md font-semibold shadow-md"
          >
            Signup
          </button>
        </form>

        <div className="mt-4 text-center text-pink-200">
          Already have an account?
          <Link
            href="/"
            className="ml-1 underline hover:text-teal-400 transition"
          >
            Login
          </Link>
        </div>
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
