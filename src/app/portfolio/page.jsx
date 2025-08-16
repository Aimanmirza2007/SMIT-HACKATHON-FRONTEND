"use client";
import { useEffect, useState } from "react";

export default function PortfolioPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) setUser(userData);
  }, []);

  if (!user)
    return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-teal-900 to-black text-white px-4 py-10 flex justify-center  items-start">
      <div className="max-w-xl w-full bg-[#111] p-8 rounded-xl shadow-lg border border-teal-700 ">
        {/* Profile Image */}

        {user.image && (
          <div className="flex justify-center mb-6">
            <img
              src={user.image}
              alt="Profile"
              className="w-60 h-60 rounded-full border-4 border-teal-500 shadow-md"
            />
          </div>
        )}

        {/* Name and Email */}

        <div className="text-center">
          <h1 className="text-3xl font-bold text-teal-400">{user.name}</h1>

          <p className="text-gray-400 text-xl">{user.email}</p>
        </div>

        {/* GitHub Link */}

        {user.github && (
          <div className="text-center mt-6">
            <a
              href={user.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-teal-600  px-5 py-5 text-lg "
            >
              View GitHub Profile
            </a>
          </div>
        )}

        {/* Skills Section */}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-teal-300">Skills</h2>

          <div className="flex flex-wrap flex-col gap-3">
            {user.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-teal-600 px-6 py-3 rounded-full text-lg font-medium shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
