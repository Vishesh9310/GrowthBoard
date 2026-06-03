import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bgImg from '../assets/Avtrimg.png';
import { Eye, EyeOff } from 'lucide-react';
// import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login:React.FC = () => {
  const navigate = useNavigate();
  const auth= useContext(AuthContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try{
      //await api.post("/login", {email, password});
      await auth?.login(email, password);
      navigate("/workspace/dashboard");
      setMessage("Login Successful!");
    }catch(err: any){
      console.error("Login error:", err);
      setMessage(err.response?.data?.message || "Invalid email or password");
    }finally{
      setLoading(false);
    }
  }

  return (
     <div
      className="flex items-center justify-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <form
        onSubmit={handleLogin}
        className="p-8 rounded-2xl shadow-lg w-96 h-fit bg-white/30 backdrop-blur-lg border border-white/30 text-black"
      >
        <h2 className="text-2xl font-bold mb-6 text-white text-center drop-shadow">
          Login
        </h2>

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
        <div className="mb-2 relative">
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

        {/* Forgot Password */}
        <div className="mb-6 text-right">
          <Link to="/" className="text-sm hover:text-blue-500">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition-all ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-black bg-white/60 rounded p-1">
            {message}
          </p>
        )}

        {/* Signup link */}
        <p className="mt-4 text-center text-sm text-white">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold hover:text-blue-500 text-white"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login