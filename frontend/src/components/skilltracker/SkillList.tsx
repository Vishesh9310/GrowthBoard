import React from "react";
import type { Skill } from "../../features/skills/skillType";
import { Link } from "react-router-dom";

type Props = {
  skills: Skill[];
  handleDelete: (id: string) => void;
}

const SkillList: React.FC<Props> = ({skills, handleDelete}) => {
  return (
    <div className="mt-4 space-y-2">
      {skills.map((skill,index) => {
        if(!skill) return null;

        return(
        <div key={skill._id || index} className="flex justify-between items-center p-2 border rounded">
          <div>
            <p className="font-semibold">{skill.name}</p>
            <p className="text-sm text-gray-500">Proficiency: {skill.proficiency}</p>
            <p className="text-sm text-gray-500">Last Used: {skill.dateOfCompletion}</p>
          </div>
          <div className="space-x-2">
            <Link to={`/workspace/skills/update/${skill._id}`} className="px-3 py-1 bg-yellow-400 text-white rounded">Edit</Link>
            <button onClick={()=>handleDelete(skill._id)} className="px-3 py-1 bg-red-500 text-white rounded"> Delete</button>
          </div>
        </div>);
      })}
    </div>
  )
}

export default SkillList;
