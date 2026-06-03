import api from '../../services/api';
import type { TaskInput } from './taskType';

export const getTasksAPI = async() => {
    const res = await api.get('/tasks');
    return res.data;
};

export const getTaskByIdAPI = async(id: string) => {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
};

export const postTaskAPI = async(formData : TaskInput) => {
    const res = await api.post('/tasks',formData);
    return res.data;
};

export const updateTaskAPI = async(id: string, formData: TaskInput) => {
    const res = await api.put(`/tasks/${id}`, formData);
    return res.data;
};

export const deleteTaskAPI = async(id: string) => {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
};