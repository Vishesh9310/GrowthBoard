import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAchievements } from '../../features/achievements/achievementSlice';

const Achievement:React.FC = () => {
  const dispatch = useAppDispatch();
  const {error, loading, achievements} = useAppSelector(state => state.achievement);

  const skills = useAppSelector(state => state.skill.skills);

  useEffect(() => {
    dispatch(fetchAchievements());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;

  const getSkillName = (id: string | number | undefined): string => {
    const skill = skills.find(s => String(s._id) === String(id));
    return skill? skill.name : 'Unknown Skill';
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {(!achievements || achievements.length === 0)
      ? (<p>No Achievements found.</p>)
      : (achievements.map(res => (
        <div key={res._id} className="border rounded p-2 shadow border-blue-300 hover:bg-blue-200">
          {res.preview && <img src={res.preview} alt="Resource" className="h-32 w-full object-contain" />}
          <p className="text-sm mt-1">Skill: {getSkillName(res.skillId)}</p>
          <p className="text-xs text-gray-500">Date: {res.date}</p>
        </div>
      )))}
    </div>
  );
};

export default Achievement;