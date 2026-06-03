import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import skillReducer from '../features/skills/skillSlice';
import projectReducer from '../features/projects/projectSlice';
import achievementReducer from '../features/achievements/achievementSlice';
import taskReducer from '../features/tasks/taskSlice';
import noteReducer from '../features/notes/noteSlice';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
    reducer:{
        user: userReducer,
        skill: skillReducer,
        project: projectReducer,
        achievement: achievementReducer,
        task: taskReducer,
        note: noteReducer,
        profile: profileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;