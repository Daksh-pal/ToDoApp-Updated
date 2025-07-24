import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = ({ taskId }) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/task/updateTask/${id}`,
        { title, description }
      );
      navigate("/allTasks");
      toast.success("Task Edited successfully");
    } catch (error) {
      console.error("Error Editing task: ", error);
      toast.error(
        "Failed to Edit task: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black flex flex-col items-center h-screen">
      <h2 className="text-3xl font-bold text-white my-10">Update Task</h2>
      <form
        onSubmit={handleEdit}
        className="bg-gray-900 rounded-lg shadow-md p-6 w-full max-w-md"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          type="text"
          placeholder="Updated Title"
          className="w-full p-2 mb-4 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring focus:ring-green-500"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          type="text"
          placeholder="Updated Description"
          className="w-full p-2 mb-4 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring focus:ring-green-500"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
