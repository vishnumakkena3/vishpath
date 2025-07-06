import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import useNebulaScene from '../components/useNebulaScene';
import { motion } from 'framer-motion';
// import s from './SignUp.module.css'; // Import the CSS module

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const canvasRef = useNebulaScene();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/signup', { email, password });
            alert(response.data.message); // Use response.data.message
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during signup');
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
            <h2 className="text-2xl font-semibold text-white mb-6 bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
              Sign up for Career Advisor
            </h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
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
    
              <button
                type="submit"
                className="w-full py-2 px-4 bg-emerald-500 text-black rounded-full hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium transition-colors"
              >
                Login
              </button>
            </form>
    
            <p className="mt-6 text-center text-gray-400">
              Already have an account?{" "}
              <Link 
                to="/signup" 
                className="text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                Log in
              </Link>
            </p>
          </motion.div>
          </div>
      );
};

export default SignUp;