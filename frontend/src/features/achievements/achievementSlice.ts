import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addAchievementAPI, deleteAchievementByIdAPI, getAchievementAPI, getAchievementByIdAPI, updateAchievementsByIdAPI } from "./achievementApi";
import type { Achievement, AchievementState } from "./achievementType";

export const updateAchievementsById = createAsyncThunk<Achievement,{ id: string, formData: FormData }>('achievement/updateAchivement', async ({ id, formData }) => {
    return updateAchievementsByIdAPI(id, formData);
});

export const deleteAchievement = createAsyncThunk<{ id: string; message: string }, string >('achievements/deleteachievement', async (id) => {
    const res = await deleteAchievementByIdAPI(id);
    return { ...res, id };
});

export const fetchAchievements = createAsyncThunk('achievement/fetchAchievement', getAchievementAPI);
export const fetchAchievementById = createAsyncThunk('achievement/fetchachievementById', getAchievementByIdAPI);
export const addAchievement = createAsyncThunk<Achievement, FormData>('achievement/addAchievement', addAchievementAPI);

const initialState: AchievementState = {
    achievements: [],
    selectedAchivement: null,
    loading: false,
    error: null,
    message: null,
};

const AchievementSlice = createSlice({
    name: 'achievement',
    initialState,
    reducers: {
        clearSelectedAchievement: (state) => {
            state.selectedAchivement = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAchievements.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAchievements.fulfilled, (state, action: PayloadAction<Achievement[]>) => {
                state.loading = false;
                state.achievements = action.payload;
            })
            .addCase(fetchAchievements.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch Achievments";
            })

           .addCase(fetchAchievementById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedAchivement = null;
            })
            .addCase(fetchAchievementById.fulfilled, (state, action: PayloadAction<Achievement>) => {
                state.loading = false;
                state.selectedAchivement = action.payload;
            })
            .addCase(fetchAchievementById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch achievement details";
            })
            
            .addCase(addAchievement.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = "Uploading achievement...";
            })
            .addCase(addAchievement.fulfilled, (state, action: PayloadAction<Achievement>) => {
                state.loading = false;
                state.achievements.push(action.payload);
                state.message = "Achievement added Successfully";
            })
            .addCase(addAchievement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add achievement.";
                state.message = `Error: ${state.error}`;
            })

             .addCase(updateAchievementsById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = "Updating achievement...";
            })
            .addCase(updateAchievementsById.fulfilled, (state, action: PayloadAction<Achievement>) => {
                state.loading = false;
                // 1. Update the list of achievements
                const index = state.achievements.findIndex(a => a._id === action.payload._id);
                if (index !== -1) {
                    state.achievements[index] = action.payload;
                }
                // 2. Update the selected achievement if it was the one updated
                if (state.selectedAchivement?._id === action.payload._id) {
                    state.selectedAchivement = action.payload;
                }
                state.message = "Achievement updated successfully";
            })
            .addCase(updateAchievementsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update achievement.";
                state.message = `Error: ${state.error}`;
            })

            .addCase(deleteAchievement.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = "Deleting achievement...";
            })
            .addCase(deleteAchievement.fulfilled, (state, action: PayloadAction<{ id: string; message: string }>) => {
                state.loading = false;
                // Filter the list to remove the deleted achievement
                state.achievements = state.achievements.filter(a => a._id !== action.payload.id);
                // Clear selected achievement if it was the one deleted
                if (state.selectedAchivement?._id === action.payload.id) {
                    state.selectedAchivement = null;
                }
                state.message = action.payload.message || "Achievement deleted successfully";
            })
            .addCase(deleteAchievement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete achievement.";
                state.message = `Error: ${state.error}`;
            });
    },
});

export const { clearSelectedAchievement, clearMessage } = AchievementSlice.actions;
export default AchievementSlice.reducer;