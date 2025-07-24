import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/task/addTask",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Task added successfully");
      navigate("/allTasks");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add task");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold text-white my-10">Add New Task</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 rounded-lg shadow-md p-6 w-full max-w-md"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-4 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring focus:ring-green-500"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          type="text"
          placeholder="Description"
          className="w-full p-2 mb-4 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring focus:ring-green-500"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
