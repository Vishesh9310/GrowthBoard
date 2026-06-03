import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addProjectAPI, deleteProjectAPI, fetchProjectByIdAPI, fetchProjectsAPI, updateProjectAPI, } from "./projectApi";
import type { Project, ProjectInput, ProjectState } from "./projectType";

export const fetchProjects = createAsyncThunk('project/fetchProjects', fetchProjectsAPI);
export const addProject = createAsyncThunk('project/addProject', addProjectAPI);
export const fetchProjectById = createAsyncThunk('project/fetchProjectById', fetchProjectByIdAPI);
export const updateProjectById = createAsyncThunk(
    'project/updateProject',
    // The payload received from the component must be an object { id, project }
    async ({ id, project }: { id: string, project: ProjectInput }) => {
        // Now call the API function with the destructured arguments
        return updateProjectAPI(id, project);
    }
);
export const deleteProject = createAsyncThunk('project/deleteProject', deleteProjectAPI);

const initialState: ProjectState = {
    projects: [],
    selectedProject: null,
    loading: false,
    error: null,
    message: null,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        clearSelectedProject: (state) => {
            state.selectedProject = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<{ projects: Project[] }>) => {
                state.loading = false;
                state.projects = action.payload.projects; // ✅ only array stored
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch projects";
            })
            .addCase(fetchProjectById.fulfilled, (state, action: PayloadAction<Project>) => {
                state.selectedProject = action.payload;
                state.loading = false;
            })
            .addCase(addProject.fulfilled, (state, action: PayloadAction<Project>) => {
                state.projects.push(action.payload);
                state.message = "Project added Successfully";
            })
            .addCase(updateProjectById.fulfilled, (state, action: PayloadAction<Project>) => {
                state.loading = false;
                // Find the index of the project that was updated
                const index = state.projects.findIndex(
                    (project) => project._id === action.payload._id
                );
                if (index !== -1) {
                    // Replace the old project data with the new data
                    state.projects[index] = action.payload;
                    state.message = "Project updated successfully";
                }
            })
            // ✅ IMPROVEMENT: Add pending/rejected cases for update
            .addCase(updateProjectById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update project";
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                const deletedId = action.meta.arg as string;
                state.projects = state.projects.filter((p) => p._id !== deletedId);
                state.message = action.payload?.message || "Project deleted successfully";
            });
    },
});

export const { clearSelectedProject, clearMessage } = projectSlice.actions;
export default projectSlice.reducer;