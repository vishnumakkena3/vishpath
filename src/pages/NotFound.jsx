import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <motion.div 
                className="max-w-2xl w-full text-center space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Animated 404 Text */}
                <motion.h1 
                    className="text-8xl md:text-9xl font-bold"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 15 
                    }}
                >
                    <span className="bg-gradient-to-r from-emerald-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                        404
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-lg max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved to another location.
                </p>

                {/* Animated Decorative Elements */}
                <div className="relative h-32">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`absolute left-1/2 w-4 h-4 rounded-full ${
                                i === 0 ? 'bg-emerald-500' : 
                                i === 1 ? 'bg-pink-500' : 
                                'bg-purple-500'
                            }`}
                            animate={{
                                y: [0, -20, 0],
                                x: [0, i * 20 - 20, 0],
                                opacity: [1, 0.5, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-emerald-500 text-black rounded-full font-medium hover:bg-emerald-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Go Back Home
                    </motion.button>
                    
                    <motion.button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-zinc-800 text-white rounded-full font-medium hover:bg-zinc-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Previous Page
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;