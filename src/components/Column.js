import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = ({ title, tasks = [], columnId }) => {
    return (
        <div
            className="bg-white p-4 rounded-xl shadow w-full md:w-1/3"
            style={{ position: "relative", zIndex: 1 }}
        >
            <h3
                className={`font-bold text-lg mb-4 pb-2 border-b
        ${columnId === "todo" && "text-blue-600"}
        ${columnId === "inProgress" && "text-yellow-600"}
        ${columnId === "done" && "text-green-600"}
      `}
            >
                {title}
            </h3>

            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ minHeight: "300px", position: "relative" }}
                        className={
                            snapshot.isDraggingOver ? "bg-blue-100 p-2" : "p-2"
                        }
                    >
                        {tasks.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center mt-4">
                                No tasks
                            </p>
                        ) : (
                            tasks.map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    column={columnId}
                                    index={index} 
                                />
                            ))
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;