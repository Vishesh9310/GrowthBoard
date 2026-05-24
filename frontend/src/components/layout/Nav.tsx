import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// import { Menu, X } from "lucide-react"; // hamburger + close icons
// import { AuthContext } from "../../context/AuthContext";

const Nav: React.FC = () => {
//   const auth = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItemsAuth = [
    { to: "/workspace/dashboard", label: "WorkSpace" },
    { to: "/about", label: "About" },
    { to: "/plans", label: "Plans" },
    { to: "/profile", label: "Profile" },
  ];

  const navItemsGuest = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/plans", label: "Plans" },
    { to: "/login", label: "Login" },
  ];

//   const items = auth?.isAuthenticated ? navItemsAuth : navItemsGuest;

  return (
    <nav className="bg-blue-500 text-white font-bold fixed top-0 left-0 w-full z-[1000] h-14 flex items-center px-6">
      {/* Logo / Brand */}
      <div className="flex-1 text-xl">GrowthBoard</div>

      {/* Desktop Menu
      <div className="hidden md:flex gap-8">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </div> */}

      {/* Mobile Menu Button */}
      {/* <button
        className="md:hidden"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button> */}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-blue-600 flex flex-col items-center gap-4 py-6 md:hidden">
          {/* {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))} */}
        </div>
      )}
    </nav>
  );
};

export default Nav;