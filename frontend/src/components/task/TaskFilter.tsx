import React from 'react';
import { filteredTask } from '../../features/tasks/taskSlice';
import { useAppDispatch } from '../../app/hooks';
import type { Task } from '../../features/tasks/taskType';

interface Props {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const TaskFilter: React.FC<Props> = ({ tasks, loading, error, message }) => {
  const dispatch = useAppDispatch();

  if (loading) {
    return <p className="text-blue-600">Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (message) {
    return <p className="text-green-600">Message: {message}</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks available.</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filteredTask(e.target.value));
  };

  return (
    <select onChange={handleChange} className="border p-2">
      <option value="">All</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  );
};

export default TaskFilter;
