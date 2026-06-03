import React from 'react';
import ProgressBar from './ProgressBar';
import { useAppSelector } from '../../app/hooks';

const CertificationCount: React.FC = () => {
  const achievements = useAppSelector(state => state.achievement.achievements);
  const skills = useAppSelector((state) => state.skill.skills);

  const getSkillName = (id: string) => {
    const skill = skills.find(s => String(s._id) === String(id));
    return skill ? skill.name : "Unknown Skill";
  }

  const countBySkill = achievements.reduce<Record<string, number>>((acc, achieve) => {
    const skillid = String(achieve.skillId);
    acc[skillid] = (acc[skillid] || 0) + 1;
    return acc;
  }, {});

  if(achievements.length === 0){
    return (
      <div className='py-5 text-center text-gray-500'>
        No certifications found.
      </div>
    )
  }

  return (
    <div className='py-5 space-y-3'>
      <h3 className='flex justify-between border-b-1 border-gray-300'><span>Skill</span><span>Certification Count</span></h3>
      <ul className='space-y-3'>

        {Object.entries(countBySkill).map(([skillId, count]) => (
          <li key={skillId} className='space-y-2'>
            <div className='flex justify-between'>
              <span>{getSkillName(skillId)}</span>
              <span>{count}</span>
            </div>
            <ProgressBar value={count}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificationCount;
