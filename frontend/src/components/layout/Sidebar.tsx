import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdNotes,
  // MdAdminPanelSettings,
} from "react-icons/md";
import { BiLineChart } from "react-icons/bi";
import { HiOutlineFolderOpen } from "react-icons/hi";
import { FaPowerOff, FaTrophy } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { RiTaskLine } from "react-icons/ri";
import { AuthContext } from "../../context/AuthContext";

const Sidebar: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: <MdDashboard />, to: "/workspace/dashboard" },
    { name: "Skill Tracker", icon: <BiLineChart />, to: "/workspace/skills" },
    { name: "Projects", icon: <HiOutlineFolderOpen />, to: "/workspace/projects" },
    { name: "Achievements", icon: <FaTrophy />, to: "/workspace/achievement" },
    { name: "Learning Roadmap", icon: <GiRoad />, to: "/workspace/learningroadmap" },
    { name: "Task Manager", icon: <RiTaskLine />, to: "/workspace/taskmanager" },
    { name: "Note", icon: <MdNotes />, to: "/workspace/note" },
    // { name: "Admin Panel", icon: <MdAdminPanelSettings />, to: "/workspace/adminpanel" },
  ];

  const handleLogout = () => {
    auth?.logout(); // context se logout
    navigate("/login"); // redirect login page
  };

  return (
    <div className="h-fit p-6 w-64 bg-white shadow-lg flex flex-col">
      {/* Logo */}
      <h1 className="font-bold text-3xl mb-8 bg-gradient-to-l to-violet-600 via-blue-600 from-cyan-500 bg-clip-text text-transparent">
        GrowthBoard
      </h1>

      {/* Sidebar Nav Items */}
      <ul className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 text-lg font-semibold text-red-600 hover:text-red-800"
      >
        <FaPowerOff /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
