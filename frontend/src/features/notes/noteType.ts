export interface Note{
    _id: string;
    title: string;
    desc: string;
}

export interface NoteInput {
    title: string;
    desc: string;
};

export interface NoteState{
    notes: Note[],
    selectedNote: Note | null,
    loading: boolean,
    error: string | null,
    message: string | null;
}
