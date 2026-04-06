import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  moveTask,
  setTasks,
  setLoading,
  setError,
} from "../features/tasks/taskSlice";
import Column from "../components/Column";
import AddTask from "../components/AddTask";
import { fetchTasks } from "../api/taskApi";

const Board = () => {
  const dispatch = useDispatch();
  const { todo, inProgress, done, loading, error } =
    useSelector((state) => state.tasks);

  useEffect(() => {
    const loadTasks = async () => {
      if (todo.length || inProgress.length || done.length) return;

      try {
        dispatch(setLoading());

        const data = await fetchTasks();

        const formatted = {
          todo: data.map((t) => ({
            id: t.id.toString(),
            title: t.title,
          })),
          inProgress: [],
          done: [],
        };

        dispatch(setTasks(formatted));
      } catch {
        dispatch(setError("Failed to load tasks"));
      }
    };

    loadTasks();
  }, [dispatch, todo.length, inProgress.length, done.length]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    dispatch(
      moveTask({
        sourceCol: source.droppableId,
        destCol: destination.droppableId,
        sourceIndex: source.index,
        destIndex: destination.index,
      })
    );
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        <span className="animate-pulse">Loading tasks...</span>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10 font-semibold">
        <p>Something went wrong</p>
        <p className="text-sm mt-1">{error}</p>

        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-1 bg-red-400 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-6">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Kanban Board
      </h2>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <AddTask />
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col md:flex-row gap-6 mt-8 items-start">
            <Column title="Todo" tasks={todo} columnId="todo" />
            <Column
              title="In Progress"
              tasks={inProgress}
              columnId="inProgress"
            />
            <Column title="Done" tasks={done} columnId="done" />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;