import api from '../../services/api';
import type { ProfileInput } from './profileType';


export const fetchProfileAPI = async() => {
    const res = await api.get('/profile');
    return res.data;
}

export const updateProfileAPI = async(data: ProfileInput) => {
    const res = await api.put('/profile', data);
    return res.data;
}