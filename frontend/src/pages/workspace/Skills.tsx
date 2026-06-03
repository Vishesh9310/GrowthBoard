import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { fetchSkills, deleteSkill } from "../../features/skills/skillSlice";
import SkillList from "../../components/skilltracker/SkillList";
import SkillForm from "../../components/skilltracker/SkillForm";

const Skills: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const { skills, loading, error, message } = useSelector(
    (state: RootState) => state.skill
  );

  // Fetch skills on mount
  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]); // include dispatch

  // Delete handler
  const handleDelete = (id: string) => {
    dispatch(deleteSkill(id));
    setShowMessage(true);
  };

  setTimeout(()=>{
    setShowMessage(false);
  },1500);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {showMessage && <p className="text-green-600 mt-2 w-fit mx-auto">{message}</p>}
      <h2 className="text-xl font-bold mb-4">Skill Tracker</h2>
      <SkillForm handleMessage={setShowMessage}/> 
      <h3 className="text-lg font-semibold mt-6">Uploaded Resources</h3>
      <SkillList skills={skills} handleDelete={handleDelete} />
    </div>
  );
};

export default Skills;
