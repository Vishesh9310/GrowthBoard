import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addNoteAPI, deleteNoteAPI, getNoteByIdAPI, getNotesAPI, updateNoteAPI } from "./noteApi";
import type { Note, NoteInput, NoteState } from "./noteType";

export const fetchNotes = createAsyncThunk('notes/getNotes/', getNotesAPI);
export const fetchNoteById = createAsyncThunk('notes/getNote/',
    async (id: string) => {
        const response = await getNoteByIdAPI(id);
        return response
    });
export const createNote = createAsyncThunk('notes/createNote/',
    async (note: NoteInput) => {
        const response = await addNoteAPI(note);
        return response;
    });
export const updateNote = createAsyncThunk('notes/updateNote/',
    async ({ id, note }: { id: string, note: NoteInput }) => {
        return updateNoteAPI(id, note);
    });
export const deleteNote = createAsyncThunk('notes/deleteNote/',
    async (id: string) => {
        await deleteNoteAPI(id);
        return id;
    }
);

const initialState: NoteState = {
    notes: [],
    selectedNote: null,
    loading: false,
    error: null,
    message: null,
};

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: ({
        clearSelectedNote: (state) => {
            state.selectedNote = null;
        },
        clearMessage: (state) => {
            state.message = null;
        }
    }),
    extraReducers: (builder) => {
        builder
            // 🔹 FETCH ALL NOTES
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.notes = action.payload?.data || [];
                state.message = action.payload?.message || null;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch notes";
            })

            // 🔹 FETCH NOTE BY ID
            .addCase(fetchNoteById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNoteById.fulfilled, (state, action: PayloadAction<Note>) => {
                state.loading = false;
                state.selectedNote = action.payload;
            })
            .addCase(fetchNoteById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch note";
            })

            // 🔹 CREATE NOTE
            .addCase(createNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.loading = false;
                const newNote = action.payload?.data;
                if (newNote) {
                    state.notes.unshift(newNote); // add on top
                }
                state.message = action.payload?.message || "Note created successfully";
            })

            .addCase(createNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create note";
            })

            // 🔹 UPDATE NOTE
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.loading = false;
                const index = state.notes.findIndex(
                    (note) => note._id === action.payload._id
                );
                if (index !== -1) state.notes[index] = action.payload;
                if (state.selectedNote?._id === action.payload._id)
                    state.selectedNote = action.payload;
                state.message = "Note updated successfully";
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update note";
            })

            // 🔹 DELETE NOTE
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = state.notes.filter(note => note._id !== action.payload);
                state.message = "Note deleted successfully";
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete note";
            });
    }
});

export const { clearSelectedNote, clearMessage } = noteSlice.actions;
export default noteSlice.reducer;