import api from '../../services/api';

export const fetchUserAPI = async () => {
    try {
        const res = await api.get("/profile");
        return res.data;
    } catch (error: any) {
        console.error("Error fetching user:", error.response?.data || error.message);
        throw error;
    }
};