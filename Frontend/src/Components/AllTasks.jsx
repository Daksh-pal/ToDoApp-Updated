import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteTask from "./DeleteTask";
import { AuthContext } from "../AuthContext";

const AllTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const completionMessages = [
    "✅ Task crushed! You're unstoppable!",
    "🎉 One step closer to your goals!",
    "💪 Great job, keep the momentum going!",
    "🚀 Boom! Another task out of the way!",
    "🌟 You did it! Keep shining!",
    "🔥 That’s how it’s done!",
    "🎯 Nailed it! On to the next one!",
    "🙌 Task complete. You're on fire!",
    "💼 One less thing on your plate!",
    "👏 Bravo! Keep that energy flowing!",
    "🥳 Sweet success! Well done!",
    "🧠 Productivity level: genius!",
    "🫶 Little wins lead to big results!",
    "🔔 Task done. You're making it happen!",
    "✨ Crushing goals like a pro!",
  ];

  const { logout } = useContext(AuthContext);
  const handleAddTask = () => navigate("/addTask");

  const handleEdit = (taskId) => {
    navigate(`/updateTask/${taskId}`);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleComplete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to be logged in to view tasks");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:8080/api/task/done/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
      const randomMessage =
        completionMessages[
          Math.floor(Math.random() * completionMessages.length)
        ];
      toast(randomMessage, {
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to complete task: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You need to be logged in to view tasks");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8080/api/task/allTasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      toast.error(
        "Failed to fetch tasks: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-950 to-black min-h-screen flex flex-col items-center px-4 py-6 font-sans">
      {/* Top Bar */}
      <div className="flex justify-between items-center w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Your Tasks
        </h2>
        <button
          onClick={handleLogout}
          className="py-1.5 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md shadow transition duration-300"
        >
          Logout
        </button>
      </div>
      <div className="text-white">
        <input
          type="text"
          placeholder="Search tasks..."
          className="mb-4 px-4 py-2 w-full max-w-md rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-full max-w-4xl bg-gray-900/80 backdrop-blur-md rounded-lg shadow-lg p-4 overflow-hidden border border-gray-800">
        {filteredTasks.length === 0 ? (
          <p className="text-base text-gray-400 text-center py-12 italic">
            No tasks found. <br /> Start by adding a new task!
          </p>
        ) : (
          <ul className="space-y-4 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {filteredTasks.map((task) => (
              <li
                key={task._id}
                className={`border border-gray-800 rounded-md p-4 bg-gray-800 hover:border-gray-600 hover:shadow-md transition duration-200 ${
                  task.state ? "opacity-50" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3
                      className={`text-lg font-semibold text-white ${
                        task.state ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p
                      className={`mt-0.5 text-sm ${
                        task.state
                          ? "line-through text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {task.description}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handleEdit(task._id)}
                      disabled={task.state}
                      className="text-yellow-400 hover:text-yellow-300 text-sm font-medium px-2 py-1 rounded hover:bg-yellow-900/30 transition"
                    >
                      Edit
                    </button>
                    {/* Checkbox */}
                    <button
                      onClick={() => handleComplete(task._id)}
                      disabled={task.state}
                      className="text-yellow-400 hover:text-yellow-300 text-sm font-medium px-2 py-1 rounded hover:bg-yellow-900/30 transition"
                    >
                      Complete
                    </button>
                    <DeleteTask taskId={task._id} onTaskDeleted={fetchTasks} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={handleAddTask}
        className="mt-8 py-2 px-6 bg-green-500 text-white text-sm font-semibold rounded-full hover:bg-green-600 transition duration-300 shadow"
      >
        + Add New Task
      </button>
    </div>
  );
};

export default AllTasks;
