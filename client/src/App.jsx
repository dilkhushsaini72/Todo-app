import React, { useState } from "react";
import { toast } from "react-hot-toast";
import TaskList from "./components/TaskList";

const App = () => {
  const [taskName, setTaskName] = useState("");
  const [taskUpdate, setTaskUpdate] = useState(false);

  const submitHandle = async (e) => {
    e.preventDefault();

    const trimmed = taskName.trim().toUpperCase();
    if (!trimmed) {
      toast.error("Please add Task..");
      return;
    }

    const taskData = { task: trimmed };

    const response = await fetch("/api/create-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success(result.message);
      setTaskName("");
      setTaskUpdate(!taskUpdate);
    } else {
      toast.error(result.message);
    }
  };

  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  return (
    <div className="min-h-screen pb-10 bg-gradient-to-tl to-purple-500 from-blue-500">
      <h2 className="text-center text-2xl font-bold uppercase py-5">
        Todo App
      </h2>
      <div className="shadow-lg max-w-2xl mx-auto bg-white  rounded-xl">
        <form onSubmit={submitHandle} className="flex justify-center py-5">
          <input
            className="border border-zinc-500 rounded-l px-3"
            type="text"
            placeholder="Write Something.."
            value={taskName}
            onChange={handleChange}
          />
          <button className="bg-green-500 rounded-r font-bold text-white px-2 py-1">
            Add
          </button>
        </form>
      </div>
      <div className="max-w-2xl mx-auto mt-5">
        <TaskList taskuPdate={taskUpdate} />
      </div>
    </div>
  );
};

export default App;
