import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTasks } from '../../features/tasks/taskSlice';

const TaskSummary: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.task.tasks);

  useEffect(()=> {
    dispatch(fetchTasks());
  },[dispatch]);

  const pendingTasks = tasks.filter(task => task.status === 'Pending');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <div>
      <div className='w-full flex justify-between mb-4 text-center'>
        <p className='w-1/3'>⏳ Pending: {pendingTasks.length}</p>
        <p className='w-1/3'>🛠️ In Progress: {inProgressTasks.length}</p>
        <p className='w-1/3'>✅ Completed: {completedTasks.length}</p>
      </div>

      <div className='w-full flex justify-between text-center'>
        <div className='w-1/3' >
          {pendingTasks.map((task) => (
            <p key={task._id} className='py-1 text-gray-600 overflow-clip h-8'>{task.title}</p>
          ))}
        </div>
        <div className='w-1/3'>
          {inProgressTasks.map((task) => (
            <p key={task._id} className='py-1 text-yellow-600 overflow-clip h-8'>{task.title}</p>
          ))}
        </div>
        <div className='w-1/3'>
          {completedTasks.map((task) => (
            <p key={task._id} className='py-1 text-green-600 line-through overflow-clip h-8'>{task.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
