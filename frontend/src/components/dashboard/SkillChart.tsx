import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchSkills } from '../../features/skills/skillSlice';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SkillChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { skills, loading, error } = useAppSelector((state) => state.skill);

  const data = Array.isArray(skills)
    ? skills.map((skill) => ({
        name: skill.name || 'Unknown Skill',
        value: Number(skill.proficiency) || 0,
      }))
    : [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  if (loading) return <p className="text-gray-500 text-sm mt-2">Loading skills...</p>;
  if (error) return <p className="text-red-500 text-sm mt-2">Error: {error}</p>;
  if (!data.length) return <p className="text-gray-500 text-sm mt-2">No skill data available.</p>;

  return (
    <div className="w-full min-h-[16rem] flex justify-center items-center">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;
