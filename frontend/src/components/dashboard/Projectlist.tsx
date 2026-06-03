import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProjects } from "../../features/projects/projectSlice";

const ProjectList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects, loading, error } = useAppSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="py-2 space-y-1">
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects found.</p>
      ) : (
        projects.map((project) => (
          <a
            key={project._id}
            href={project.githubLink || "#"}
            target="_blank"
            rel="noreferrer"
            className="flex justify-between items-center py-2 px-3 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition"
          >
            <span className="font-medium">{project.title}</span>
            <span className="text-blue-600 underline truncate max-w-[50%] text-right">
              {project.githubLink ? "View Repo" : "No link"}
            </span>
          </a>
        ))
      )}
    </div>
  );
};

export default ProjectList;
