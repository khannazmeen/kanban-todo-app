import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: [],
  inProgress: [],
  done: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setTasks: (state, action) => {
      state.todo = action.payload.todo;
      state.inProgress = action.payload.inProgress;
      state.done = action.payload.done;
      state.loading = false;
    },

    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addTask: (state, action) => {
      state.todo.push(action.payload);
    },

    deleteTask: (state, action) => {
      const { column, id } = action.payload;
      state[column] = state[column].filter((t) => t.id !== id);
    },

    editTask: (state, action) => {
      const { column, id, title } = action.payload;
      const task = state[column].find((t) => t.id === id);
      if (task) task.title = title;
    },

    moveTask: (state, action) => {
      const { sourceCol, destCol, sourceIndex, destIndex } =
        action.payload;

      const [movedTask] = state[sourceCol].splice(sourceIndex, 1);
      state[destCol].splice(destIndex, 0, movedTask);
    },
  },
});

export const {
  setTasks,
  addTask,
  deleteTask,
  moveTask,
  editTask,
  setLoading,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;