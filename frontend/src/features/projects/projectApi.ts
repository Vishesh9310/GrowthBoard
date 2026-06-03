import api from '../../services/api';
import type { ProjectInput } from './projectType';

export const fetchProjectsAPI = async () => {
  const res = await api.get('/projects');
  return res.data;
};

export const fetchProjectByIdAPI = async (id: string) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

export const addProjectAPI = async (project: ProjectInput) => {
  const formData = new FormData();

  formData.append("title", project.title);
  formData.append("desc", project.desc);
  formData.append("githubLink", project.githubLink);

  project.tags.forEach((tag) => formData.append("tags", tag));
  project.collaboration.forEach((id) => formData.append("collaboration", id));

  if (project.file) {
    formData.append("file", project.file);
  }

  const res = await api.post("/projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateProjectAPI = async(id: string , project: ProjectInput) => {
  const formData = new FormData();

  formData.append("title", project.title);
  formData.append("desc", project.desc);
  formData.append("githubLink", project.githubLink);

  project.tags.forEach((tag) => formData.append("tags", tag));
  project.collaboration.forEach((id) => formData.append("collaboration", id));

  if(project.file){
    formData.append("file", project.file);
  }

  const res = await api.put(`/projects/${id}`,formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteProjectAPI = async (id: string) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};