import React, { useEffect } from 'react';
import TaskForm from '../../components/task/TaskForm';
import TaskFilter from '../../components/task/TaskFilter';
import TaskCard from '../../components/task/TaskCard';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTask, fetchTasks } from '../../features/tasks/taskSlice';

const TaskManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error, message, filteredTask } = useAppSelector(state => state.task);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if(!id) return;
    dispatch(deleteTask(id));
  };

  return (
    <div className="space-y-6 p-4">
      <TaskForm />
      <TaskFilter tasks={tasks} loading={loading} message={message} error={error} />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredTask.map((task) => (
          <TaskCard key={task._id || task.title} task={task} handleDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
