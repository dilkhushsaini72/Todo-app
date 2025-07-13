import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import EditTask from "./EditTask";

const TaskList = ({ taskuPdate }) => {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = async () => {
    try {
      const response = await fetch("/api/show-task");
      const result = await response.json();

      setTaskData(result.data);
      if (response.ok) {
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllTasks();
  }, [taskuPdate]);

  const deleteTaskHandle = async (id) => {
    const response = await fetch("/api/delete-task", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();
    if (response.ok) {
      toast.success(result.message);
      getAllTasks();
    }
  };

  if (taskData.length == 0) {
    return (
      <p className="text-center text-2xl font-bold text-white capitalize">
        No task Available
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {taskData.map((item, idx) => (
        <div key={item._id} className="relative shadow-lg bg-white p-5 rounded">
          <p className="text-2xl font-extrabold text-blue-500">
            {idx + 1}. <span className="text-black">{item.taskName}</span>
          </p>
          <div className="text-sm font-semibold">
            <p className="flex gap-2">
              Created On
              <span className="text-fuchsia-500">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </p>
            <p className="flex gap-2">
              Updated On
              <span className="text-fuchsia-500">
                {new Date(item.updatedAt).toLocaleString()}
              </span>
            </p>
          </div>

          <button
            // onClick={() => navigate(`/${item._id}`)}
            className="absolute right-3 top-3 text-green-400 transition hover:scale-115 hover:text-green-300 cursor-pointer"
          >
            <Link to={`/edit/${item._id}`}>
              <FaEdit />
            </Link>
          </button>
          <button
            onClick={() => deleteTaskHandle(item._id)}
            className="absolute right-3 bottom-3 text-red-500 transition hover:scale-115 hover:text-red-300 cursor-pointer"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
