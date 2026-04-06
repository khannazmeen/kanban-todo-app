import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!title.trim()) return;

    dispatch(
      addTask({
        id: uuidv4(),
        title,
      })
    );

    setTitle("");
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new task..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <button
        onClick={handleAdd}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md transition"
      >
        + Add Task
      </button>
    </div>
  );
};

export default AddTask;