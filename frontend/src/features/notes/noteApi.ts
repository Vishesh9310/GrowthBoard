import api from "../../services/api"
import {type NoteInput} from './noteType';

export const getNotesAPI = async () => {
    const res = await api.get('/notes');
    return res.data;
}

export const addNoteAPI = async (note: NoteInput) => {
    const res = await api.post('/notes', note);
    return res.data;
}

export const getNoteByIdAPI = async(id: string) => {
    const res =await api.get(`/notes/${id}`);
    return res.data;
};

export const updateNoteAPI = async(id: string, note: NoteInput)=> {
    const res = await api.put(`/notes/${id}`, note);
    return res.data;
}

export const deleteNoteAPI = async(id: string) => {
    const res = await api.delete(`/notes/${id}`);
    return res.data;
}