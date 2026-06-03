import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { deleteTaskAPI, getTaskByIdAPI, getTasksAPI, postTaskAPI, updateTaskAPI } from "./taskApi";
import type { Task, TaskInput, TaskState } from "./taskType";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await getTasksAPI();
});
export const fetchTaskById = createAsyncThunk("tasks/fetchTaskById", async (id: string) => {
  return await getTaskByIdAPI(id);
});
export const addTask = createAsyncThunk("tasks/addTask", async (formData: TaskInput) => {
  return await postTaskAPI(formData);
});
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, formData }: { id: string; formData: TaskInput }) => {
    return await updateTaskAPI(id, formData);
  }
);
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: string) => {
  return await deleteTaskAPI(id);
});

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  filteredTask: [],
  loading: false,
  error: null,
  message: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    filteredTask: (state, action: PayloadAction<string | null>) => {
      const filter = action.payload;
      state.filteredTask = filter
        ? state.tasks.filter(task => task.status === filter)
        : state.tasks;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
        state.filteredTask = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })

      // Fetch task by ID
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.selectedTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch task";
      })

      // Add new task
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.filteredTask.push(action.payload);
        state.message = "Task added successfully!";
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add task";
      })

      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
        state.message = "Task updated successfully!";
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update task";
      })

      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.loading = false;
        state.tasks = state.tasks.filter((t) => t._id !== action.payload.id);
        state.filteredTask = state.filteredTask.filter((t)=> t._id !== action.payload.id);
        state.message = "Task deleted successfully!";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete task";
      });
  },
});

export const { clearSelectedTask, clearMessage, filteredTask } = taskSlice.actions;
export default taskSlice.reducer;