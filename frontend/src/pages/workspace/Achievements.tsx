import React, { useEffect, useState } from 'react';
import Form from '../../components/achievement/Form';
import List from '../../components/achievement/List';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addAchievement, deleteAchievement, fetchAchievements } from '../../features/achievements/achievementSlice';
import { fetchSkills } from '../../features/skills/skillSlice';

const Achievements: React.FC = () => {
  const dispatch = useAppDispatch();
  const {message, error, loading, achievements} = useAppSelector(state => state.achievement);
  const skills = useAppSelector((state) => state.skill.skills);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(()=>{
    dispatch(fetchSkills());
    dispatch(fetchAchievements());
  },[dispatch]);

  const handleAdd = (data: FormData) => {
    dispatch(addAchievement(data));
    setShowMessage(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteAchievement(id));
    setShowMessage(true);
  };

  const timer = setTimeout(()=>{
    setShowMessage(false);
  },1500);

  clearTimeout(timer);

  if (loading) return <p className="text-green-500">Loading...</p>;
  if (error) return <p className="text-red-500">Something went wrong</p>

  return (
    <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
      {showMessage && <p className='text-green-500 w-fit mx-auto'>{message}</p>}
      <h1 className='text-3xl font-semibold text-blue-500 mb-8 border-b pb-2'>Achievement Management</h1>
      <div className='bg-white shadow-lg rounded-xl p-6 border border-gray-200'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Upload New Resource</h2>
        <p className='text-sm text-gray-500 mb-4'>Attach documentation or a certificate for a new skill achievement.</p>
        <Form handleAdd={handleAdd} skills={skills}/>
      </div>

      <div className='bg-white shadow-lg rounded-xl p-6 border border-gray-200'>
        <h2 className='text-xl font-semibold text-gray-800 mb-6'>My Achievements List</h2>
        <List achievements={achievements} skills={skills} handleDelete={handleDelete}/>
      </div>
    </div>
  );
};

export default Achievements;