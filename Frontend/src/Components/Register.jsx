import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          username,
          password,
        }
      );
      login(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/allTasks");
      toast.success("Successfully Registered and logged in");
    } catch (error) {
      toast.error(
        "Registration failed " + error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black flex items-center justify-center h-screen">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
          >
            Register
          </button>
          <p className="text-gray-300 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-green-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
