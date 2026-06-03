import api from '../../services/api';

const handleError = (err: any) => {
    if (err.response) {
        throw err.response.data || err.message;
    }
    throw err.message;
};

export const getAchievementAPI = async () => {
    try {
        const res = await api.get('/achievements');
        return res.data;
    } catch (err) {
        throw handleError(err);
    }
};

export const getAchievementByIdAPI = async (id: string) => {
    try {
        const res = await api.get(`/achievements/${id}`);
        return res.data;
    } catch (err) {
        throw handleError(err);
    }
};

export const addAchievementAPI = async (formData: FormData) => {
    try {
        const res = await api.post('/achievements', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (err) {
        throw handleError(err);
    }
};

export const updateAchievementsByIdAPI = async (id: string, formData: FormData) => {
    try {
        const res = await api.put(`/achievements/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (err) {
        throw handleError(err);
    }
};

export const deleteAchievementByIdAPI = async (id: string) => {
    try {
        const res = await api.delete(`/achievements/${id}`);
        return res.data;
    } catch (err) {
        throw handleError(err);
    }
};