import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";

const loadState = () => {
  try {
    const data = localStorage.getItem("tasks");
    return data ? { tasks: JSON.parse(data) } : undefined;
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  localStorage.setItem(
    "tasks",
    JSON.stringify(store.getState().tasks)
  );
});