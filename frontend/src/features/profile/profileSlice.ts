import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Profile, ProfileState, ProfileInput } from "./profileType";
import { fetchProfileAPI, updateProfileAPI } from "./profileApi";

// ✅ Thunk: Fetch Profile
export const fetchProfile = createAsyncThunk<Profile>(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchProfileAPI();
      const profileData = res.user ? res.user : res;

      return profileData as Profile;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// ✅ Thunk: Update Profile
export const updateProfile = createAsyncThunk<Profile, ProfileInput>(
  "profile/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateProfileAPI(data);

      // Backend might return { message, user }
      const profileData = res.user ? res.user : res;

      return profileData as Profile;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// ✅ Initial State
const initialState: ProfileState = {
  profile: {
    _id: "",
    fullname: "",
    email: "",
    contact: null,
    city: null,
    state: null,
    country: null,
    zipcode: null,
    skill: [],
    project: [],
    tasks: [],
    note: [],
    picture: "",
  },
  loading: false,
  error: null,
  message: null,
};

// ✅ Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileMessage(state) {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.loading = false;
          state.profile = action.payload;
          state.message = "Profile updated successfully";
        }
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfileMessage } = profileSlice.actions;
export default profileSlice.reducer;
