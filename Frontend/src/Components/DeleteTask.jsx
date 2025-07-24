import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DeleteTask = ({ taskId, onTaskDeleted }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/task/deleteTask/${taskId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      navigate("/allTasks");
      toast.success("Task deleted successfully");
      onTaskDeleted();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(
        "Failed to delete task: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div>
      <svg
        className="w-6 h-6 text-red-600 hover:text-red-300 transition duration-200 cursor-pointer"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        onClick={handleDelete}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export default DeleteTask;
