import React from "react";
import { NavLink } from "react-router-dom";
import type { Achievement } from "../../features/achievements/achievementType";
import type { Skill } from "../../features/skills/skillType";

type Props = {
  skills: Skill[];
  achievements: Achievement[];
  handleDelete: (id: string) => void;
};

const List: React.FC<Props> = ({skills, achievements,  handleDelete}) => {
  
  const getSkillName = (id?: string | number): string => {
    const skill = skills.find((s) => String(s._id) === String(id));
    return skill ? skill.name : "Unknown Skill";
  };

  return (
    <div className="p-4">
      {(!achievements || achievements.length === 0) ? (
        <p className="text-gray-500 text-center">No achievements found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement._id}
              className="bg-blue-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <p className="text-sm">
                <span className="font-semibold">Skill:</span>{" "}
                {getSkillName(achievement.skillId)}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Achieve Date:</span>{" "}
                {new Date(achievement.date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Created:</span>{" "}
                {new Date(achievement.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Updated:</span>{" "}
                {new Date(achievement.updatedAt).toLocaleDateString()}
              </p>

              {/* ✅ File Preview (Image or Link) */}
              {achievement.file && (
                <>
                  {achievement.file.endsWith(".pdf") ? (
                    <a
                      href={`http://localhost:5000/achievements/${achievement.file.replace(/\\/g, "/")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-blue-600 underline text-sm"
                    >
                      📄 View PDF
                    </a>
                  ) : (
                    <img
                      src={`http://localhost:5000/achievements/${achievement.file.replace(/\\/g, "/")}`}
                      alt={getSkillName(achievement.skillId)}
                      className="rounded-lg mt-3 w-full object-cover"
                    />
                  )}
                </>
              )}

              {/* ✅ Action Buttons */}
              <div className="flex justify-between mt-3">
                <NavLink to={`update/${achievement._id}`} className='bg-yellow-100 px-3 py-1 rounded-md hover:bg-yellow-300 text-black hover:text-white font-semibold'>
                  Edit
                </NavLink>
                <button onClick={()=>handleDelete(achievement._id)} className="bg-red-200 px-3 py-1 rounded-md hover:bg-red-400 text-black hover:text-white font-semibold">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
