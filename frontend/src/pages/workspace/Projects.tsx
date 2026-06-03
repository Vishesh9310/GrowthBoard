import React, { useEffect, useState } from "react";
import ProjectForm from "../../components/project/ProjectForm";
import ProjectList from "../../components/project/ProjectList";
import { deleteProject, fetchProjects } from "../../features/projects/projectSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, loading, projects, message } = useAppSelector(state => state.project);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteProject(id));
    setShowMessage(true);
  };

  setTimeout(() => {
    setShowMessage(false);
  }, 1500);

  if (loading) return <p className="text-green-500">Loading...</p>;
  if (error) return <p className="text-red-500">Something went wrong</p>

  return (
    <div className="mx-auto">
      {showMessage && <p className="text-green-600 mt-2 w-fit mx-auto">{message}</p>}
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-blue-600">
          Showcase Your Projects
        </h1>
        <p className="text-gray-600 mt-2 text-base">
          Add your personal or team projects, upload screenshots, include
          repository links, tags, and collaborators to highlight your work
          beautifully.
        </p>
      </div>

      <div className="bg-white rounded-2xl space-y-10 shadow-sm p-6 mb-10 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Project
        </h2>
        <ProjectForm />
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Uploaded Projects
        </h2>
        <ProjectList projects={projects} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Projects;
