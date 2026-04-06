import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../features/tasks/taskSlice";
import { useState } from "react";
import {Draggable } from "@hello-pangea/dnd";
import ReactDOM from "react-dom";

const TaskCard = ({ task, column, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (!newTitle.trim()) return;

    dispatch(
      editTask({
        column,
        id: task.id,
        title: newTitle,
      })
    );

    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => {
        const child = (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white border border-gray-200 p-4 rounded-xl mb-3 transition-all duration-200
            ${
              snapshot.isDragging
                ? "shadow-2xl scale-105 rotate-1 bg-blue-50"
                : "shadow-md"
            }`}
            style={{
              ...provided.draggableProps.style,
              zIndex: snapshot.isDragging ? 9999 : "auto",
            }}
          >
            {isEditing ? (
              <>
                <textarea
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border rounded-lg p-2 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-700 font-medium mb-2 break-words whitespace-pre-wrap leading-relaxed">
                  {task.title}
                </p>

                <div className="flex gap-3 text-xs font-semibold">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      dispatch(deleteTask({ column, id: task.id }))
                    }
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        );

        return snapshot.isDragging
          ? ReactDOM.createPortal(child, document.body)
          : child;
      }}
    </Draggable>
  );
};

export default TaskCard;