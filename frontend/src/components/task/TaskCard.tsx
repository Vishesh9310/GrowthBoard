import React from 'react';
import type { Task } from '../../features/tasks/taskType';
import { FaTrash } from 'react-icons/fa';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending': return 'bg-gray-400';
    case 'In Progress': return 'bg-yellow-500';
    case 'Completed': return 'bg-green-500';
    default: return 'bg-gray-300';
  }
};

interface TaskCardProps {
  task: Task;
  handleDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleDelete }) => {
  const { _id, title, tags = [], deadline, status } = task;

  return (
    <div className=" h-fit p-4 border rounded space-y-2 overflow-clip">
      {_id && (
        <FaTrash onClick={() => handleDelete(_id)} className='text-red-500 text-md cursor-pointer float-right' />
      )}
      <h2 className="font-semibold text-md h-fit w-full ">{title}</h2>

      <p className="text-sm text-gray-500">Deadline: {deadline}</p>
      <div className="flex flex-wrap gap-2">
        {Array.isArray(tags) && tags.length > 0
          ? (tags.map((tag, i) => (
            <span key={i} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">{tag}</span>)))
          : (<span className="text-gray-400 text-xs italic">No tags</span>)
        }
        <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(status)}`}>{status}</span>
      </div>
    </div>
  );
};

export default TaskCard;
