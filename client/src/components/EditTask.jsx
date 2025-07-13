import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditTask = () => {
  const [taskData, setTaskData] = useState({ taskName: "" });
  const navigate = useNavigate();

  const { id } = useParams();

  const fetSingleData = async () => {
    try {
      const response = await fetch(`/api/getsingledata/${id}`);
      const result = await response.json();
      setTaskData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetSingleData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/update-task", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    const result = await response.json();
    if (response.ok) {
      toast.success(result.message);
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center bg-purple-500">
      <div className="max-w-xl w-xl bg-white rounded-xl">
        <h2 className="text-2xl text-center font-bold text-green-500 py-5">
          Edit Task
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col mx-10 ">
          <label className="text-sm py-2 font-semibold" htmlFor="taskName">
            Task Name:
          </label>
          <input
            value={taskData.taskName}
            className="uppercase border border-zinc-400 rounded"
            type="text"
            onChange={(e) =>
              setTaskData({
                ...taskData,
                taskName: e.target.value.toUpperCase(),
              })
            }
          />
          <button className="bg-purple-500 my-3 py-1 rounded font-extrabold text-white hover:bg-purple-700 cursor-pointer">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
