import React from "react";
import type { Project } from "../../features/projects/projectType";
import { FaEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

type Props = {
  projects: Project[];
  handleDelete: (id: string) => void;
}

const ProjectList: React.FC<Props> = ({ projects, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {projects.length === 0
        ? (<p className="text-gray-500">No projects found.</p>)
        : (projects.map((project) => (
          <div key={project._id} className="border p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition overflow-hidden">

            {/* Edit Button */}
            <NavLink to={`update/${project._id}`}><FaEdit className="text-blue-400 w-5 h-5 float-right" /></NavLink>

            {/* Image Display */}
            {project.file
              ? (<img src={`http://localhost:5000/${project.file}`} alt="Screenshot" className="w-full h-40 object-cover rounded" />)
              : (<div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-lg text-gray-400">No Image</div>)
            }

            {/* Project Details */}
            <h3 className="text-lg font-semibold mt-3">{project.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{project.desc}</p>
            <p className="text-pink-900">{project.file}</p>
            {/* Tags Display */}
            {project.tags && project.tags.length > 0 && (
              <p className="text-sm">
                <strong>Tags:</strong>{" "}
                <span className="text-gray-700">{project.tags.join(", ")}</span>
              </p>
            )}

            {/* GitHub Link */}
            {project.githubLink && (
              <p className="text-sm mt-1">
                <strong>Repo:</strong>{" "}
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-blue-600 underline"> {project.githubLink}</a>
              </p>
            )}

            {/* Collaborators Display */}
            {project.collaboration && project.collaboration.length > 0 && (
              <p className="text-sm mt-1">
                <strong>Collaborators:</strong>{" "}
                {project.collaboration.map((col) =>
                  typeof col === "object"
                    ? `${col.fullname} (${col.email})`
                    : col
                )
                  .join(", ")}
              </p>
            )}

            {/* Delete Button (future use) */}
            <div className="w-full">
              <button onClick={() => handleDelete(project._id)} className="w-fit float-right hover:bg-red-500 bg-gray-200 hover:text-white text-red-500 rounded-lg px-2 py-1 mt-3 text-sm ">Delete</button>
            </div>
          </div>
        ))
        )}
    </div>
  );
};

export default ProjectList;
