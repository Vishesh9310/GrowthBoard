import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import type { ProjectInput } from '../../features/projects/projectType';
import { addProject, fetchProjects } from '../../features/projects/projectSlice';

const ProjectForm = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState<ProjectInput>({
    title: '',
    desc: '',
    tags: [], // frontend uses string[]
    githubLink: '',
    collaboration: [], // array of user IDs
    file: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === 'file' && files && files.length > 0) {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else if (name === 'tags') {
      setFormData((prev) => ({
        ...prev,
        tags: value.split(',').map((t) => t.trim()),
      }));
    } else if (name === 'collaboration') {
      setFormData((prev) => ({
        ...prev,
        collaboration: value.split(',').map((id) => id.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addProject(formData)).unwrap();
      setMessage('✅ Project added successfully');
      setFormData({
        title: '',
        desc: '',
        tags: [],
        githubLink: '',
        collaboration: [],
        file: null,
      });
      dispatch(fetchProjects());
    } catch (err) {
      setMessage('❌ Failed to add project: ');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-md shadow"
    >
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="desc"
        placeholder="Description"
        value={formData.desc}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags.join(', ')}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="url"
        name="githubLink"
        placeholder="GitHub Repo Link"
        value={formData.githubLink}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="collaboration"
        placeholder="Collaborator IDs (comma separated)"
        value={formData.collaboration.join(', ')}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Project
      </button>

      {message && <p className="text-center text-gray-700">{message}</p>}
    </form>
  );
};

export default ProjectForm;
