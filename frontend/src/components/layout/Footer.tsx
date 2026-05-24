import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Footer:React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      {/* Top Note */}
      <div className="text-center border-b border-gray-700 mb-6 pb-6">
        <p>
          Built by <strong>Vishesh</strong> • Not a final product • Contributions welcome 🚀
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Logo & Name */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <div>
            <h2 className="text-xl font-bold text-white">GrowthBoard</h2>
            <p className="text-sm mt-1">Empowering Career Growth</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/workspace/dashboard" className="hover:text-white transition">Dashboard</a>
          <a
            href="https://linktr.ee/Vishesh9310"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 text-xl">
          <a href="https://github.com/Vishesh9310" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-white transition" />
          </a>
          <a href="https://linkedin.com/in/vishesh9310" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-white transition" />
          </a>
          <a href="https://instagram.com/vishesh9310_" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-white transition" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} SkillSync Pro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;