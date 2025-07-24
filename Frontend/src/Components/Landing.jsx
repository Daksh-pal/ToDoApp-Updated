import React from "react";
import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa"; // Optional icon

const Landing = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="text-center bg-gray-900 backdrop-blur-md p-10 rounded-xl shadow-2xl max-w-xl w-full border border-gray-700">
        <h1 className="text-xl md:text-2xl font-extrabold text-white mb-4 transition hover:scale-105">
          Take Control of Your Day —{" "}
          <span className="text-green-400">One Task at a Time</span>
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Stay organized. Track your tasks. Boost your productivity.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
        >
          <FaRocket className="text-white" />
          Start Your Journey
        </Link>
      </div>
    </div>
  );
};

export default Landing;
