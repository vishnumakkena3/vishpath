import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import useNebulaScene from "../components/useNebulaScene";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const canvasRef = useNebulaScene();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE}/login`, {
        email,
        password,
      });
      login(response.data.token);
      // localStorage.setItem('token', response.data.token);
      navigate("/dashboard");
    } catch (err) {
      seterror(err.response?.data?.error || "An error occurred during login");
    }
  };
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center p-4">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ position: 'fixed' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-zinc-950/80 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-8 shadow-lg relative z-10"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 text-red-500">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-gray-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>
  
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-gray-500 transition-colors"
                placeholder="Enter your password"
              />
            </div>
  
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-emerald-500 text-black rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Login
            </motion.button>
          </form>
  
          <p className="mt-4 text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-emerald-400 hover:text-emerald-300">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    );
  };
  
  export default Login;
