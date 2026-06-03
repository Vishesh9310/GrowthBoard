import React, { useState } from 'react'
import api from "../services/api";
import bgImg from '../assets/Avtrimg.png';
import {Eye, EyeOff} from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'

const Signup:React.FC = () => {
  const navigate = useNavigate();
  
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      await api.post("/register",{fullname, email, password});
      setMessage("Signup successful! Please Login");
      setTimeout(()=> navigate("/login"),1500);
    }catch(err: any){
      setMessage(err.response?.data?.message || "Error signing up");
    }
  }

  return (
    <div
      className="flex items-center justify-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <form
        onSubmit={handleSignup}
        className="p-8 rounded-2xl shadow-lg w-96 h-fit bg-white/30 backdrop-blur-lg border border-white/30 text-black"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow">
          Sign Up
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full p-2 placeholder-gray-700 text-black focus:ring-2 focus:ring-blue-400 rounded-lg outline-none bg-white/70"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 placeholder-gray-700 text-black focus:ring-2 focus:ring-blue-400 rounded-lg outline-none bg-white/70"
            required
          />
        </div>

        {/* Password + Eye Button */}
        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 placeholder-gray-700 text-black focus:ring-2 focus:ring-blue-400 rounded-lg outline-none bg-white/70"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-black bg-white/60 rounded p-1">
            {message}
          </p>
        )}

        {/* Already have an account? */}
        <p className="mt-4 text-center text-sm">Already have an account?{" "}
          <Link to="/login" className="font-semibold hover:text-blue-500 text-white">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup