import api from '../../services/api';
import type { SkillInput } from './skillType';

export const fetchSkillAPI = async () => {
  const res = await api.get("/skills");
  return res.data;
};

export const getSkillByIdAPI = async (id: string) => {
  const res = await api.get(`/skills/${id}`);
  return res.data;
};

export const addSkillAPI = async (skill: SkillInput) => {
  const res = await api.post('/skills', skill);
  return res.data; 
};

export const updateSkillAPI = async (id: string, skill: SkillInput) => {
  const res = await api.put(`/skills/${id}`, skill);
  return res.data;
};

export const deleteSkillAPI = async (id: string) => {
  const res = await api.delete(`/skills/${id}`);
  return res.data; 
};
