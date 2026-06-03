import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Skill, SkillInput } from "./skillType";
import { addSkillAPI, deleteSkillAPI, fetchSkillAPI, getSkillByIdAPI, updateSkillAPI } from "./skillApi";
import type { SkillState } from "./skillType";

export const fetchSkills = createAsyncThunk('skill/fetchSkills', fetchSkillAPI);
export const getSkillById = createAsyncThunk('skill/getSkillById', getSkillByIdAPI);
export const addSkill = createAsyncThunk('skill/addSkill', addSkillAPI);
export const updateSkill = createAsyncThunk(
  'skill/updateSkillById',
  async ({ id, skill }: { id: string; skill: SkillInput }) => await updateSkillAPI(id, skill)
);
export const deleteSkill = createAsyncThunk('skill/deleteSkill', deleteSkillAPI);

const initialState: SkillState = {
  skills: [],
  selectedSkill: null,
  loading: false,
  error: null,
  message: null,
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    clearSelectedSkill: (state) => {
      state.selectedSkill = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch skills
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action: PayloadAction<Skill[]>) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch skills";
      })

      // Get by ID
      .addCase(getSkillById.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.loading = false;
        state.selectedSkill = action.payload;
      })

      // Add
      .addCase(addSkill.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.skills.push(action.payload);
        state.message = "Skill added successfully!";
      })

      // Update
      .addCase(updateSkill.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.skills = state.skills.map((s) =>
          s._id === action.payload._id ? action.payload : s
        );
        state.message = "Skill updated successfully!";
      })

      // Delete
      .addCase(deleteSkill.fulfilled, (state, action) => {
        const deletedId = action.meta.arg as string;
        state.skills = state.skills.filter((s) => s._id !== deletedId);
        state.message = action.payload?.message || "Skill deleted successfully!";
      });
  },
});

export const { clearSelectedSkill, clearMessage } = skillSlice.actions;
export default skillSlice.reducer;