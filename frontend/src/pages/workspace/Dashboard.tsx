import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

// Components
import Greeting from '../../components/dashboard/Greeting';
import SkillChart from '../../components/dashboard/SkillChart';
import TaskSummary from '../../components/dashboard/TaskSummary';
import CertificationCount from '../../components/dashboard/CertificationCount';
import Projectlist from '../../components/dashboard/Projectlist';
import Achievement from '../../components/dashboard/Achievement';
import Goals from '../../components/dashboard/Goals'

// Redux hooks
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUser } from '../../features/users/userSlice';

const DashBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading user...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="w-full h-fit space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Greeting name={user?.fullname || 'User'} />
        <button className="text-xl p-2 rounded-lg hover:bg-gray-100 transition">
          <FiMenu />
        </button>
      </div>

      <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
        {/* Skills Chart */}
        <div className='p-4 rounded-xl border border-gray-200'>
          <h1 className="font-semibold text-lg mb-3">Skill Status</h1>
          <SkillChart />
        </div>

        {/*<section className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 rounded-xl border border-gray-200">
           Goals */}
          <div className='p-4 rounded-xl border border-gray-200'>
            <h1 className="font-semibold text-lg mb-3">Goals</h1>
            <Goals />
          </div>

          {/* Blog */}
          {/* <section>
            <h1 className="font-semibold text-lg mb-3">Blog</h1>
            <Blogs />
          </section> 
        </section>*/}
      </div>

      {/* Tasks & Projects & Certificate */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-5">
          <div className="p-4 rounded-xl border border-gray-200 space-y-3">
            <h1 className="font-semibold text-lg">Tasks</h1>
            <TaskSummary />
          </div>

          <div className="p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-semibold text-lg">Projects</h1>
              <NavLink to="/workspace/projects" className="font-semibold text-blue-600 hover:underline"> Edit</NavLink>
            </div>
            <Projectlist />
          </div>
        </div>

        {/* Certification Session */}
        <div className="p-4 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-semibold text-lg">Skill Tracker</h1>
            <NavLink to="/workspace/skills" className="font-semibold text-blue-600 hover:underline">Edit</NavLink>
          </div>
          <CertificationCount />
        </div>
      </section>

      {/* Achievements */}
      <section className="p-4 rounded-xl border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-semibold text-lg">Achievements</h1>
          <NavLink to="/workspace/achievement" className="font-semibold text-blue-600 hover:underline"> Edit</NavLink>
        </div>
        <Achievement />
      </section>
    </div>
  );
};

export default DashBoard;
``