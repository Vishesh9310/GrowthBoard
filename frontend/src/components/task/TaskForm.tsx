import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addTask, fetchTasks } from '../../features/tasks/taskSlice';
import type { TaskInput } from '../../features/tasks/taskType';

const statusOptions = ['Pending', 'In Progress', 'Completed'];

const TaskForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    title: '',
    tags: '',
    deadline: '',
    status: 'Pending',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: TaskInput = {
      title: formData.title.trim(),
      tags: (formData.tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      deadline: formData.deadline || null,
      status: formData.status,
    };

    try {
      await dispatch(addTask(newTask)).unwrap();
      await dispatch(fetchTasks());
      setFormData({ title: '', tags: '', deadline: '', status: 'Pending' });
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
