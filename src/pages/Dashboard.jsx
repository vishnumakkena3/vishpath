import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useThreeScene from "../components/useThreeScene";
const Dashboard = () => {
  const navigate = useNavigate();
  const canvasRef = useThreeScene();
  // const rendererRef = useRef(null);
  // const sceneRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    {
      title: "Career Assessment",
      description:
        "Discover your ideal career paths with our AI-powered assessment tool",
      path: "/career-assessment",
      buttonText: "Take Assessment",
      iconEmoji: "🎯",
    },
    {
      title: "Resume Builder",
      description:
        "Create a professional resume that stands out with our advanced builder",
      path: "/resume-builder",
      buttonText: "Build Resume",
      iconEmoji: "📝",
    },
    {
      title: "Skills Development",
      description:
        "Master the skills that matter with personalized learning paths",
      path: "/skills-development",
      buttonText: "Explore Skills",
      iconEmoji: "📚",
    },
    {
      title: "Interview Preparation",
      description:
        "Ace your interviews with AI-powered mock interviews and feedback",
      path: "/interview-prep",
      buttonText: "Prepare Now",
      iconEmoji: "🎤",
    },
    {
      title: "Career Roadmaps",
      description: "Navigate your career journey with expert-curated roadmaps",
      path: "/roadmaps",
      buttonText: "View Roadmaps",
      iconEmoji: "🗺",
    },
  ];


  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const handleCardClick = async (path) => {
    try {
      navigate(path);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-black overflow-hidden">
      <div className="relative z-10 min-h-screen">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-90vh -z-10"
          style={{position: 'fixed'}}
        />
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6 mt-40">
            <motion.h1
              className="text-6xl font-bold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                VishPath
              </span>
            </motion.h1>

            <motion.h2
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
                Craft Your Future
              </span>
              <span className="text-white">
                {" "}
                with AI-Powered Career Advisor
              </span>
            </motion.h2>

            <motion.p
              className="text-gray-400 text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              Your personalized AI companion for educational guidance, career
              planning, and professional development.
            </motion.p>
          </div>
        </div>
      </div>
      <div className="relative z-10 container mx-auto px-4 pb-24">
        <h2 className="text-3xl font-semibold text-white text-center my-12">
          Explore Our Features
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`relative bg-zinc-950 rounded-xl overflow-hidden border border-emerald-500/20 backdrop-blur-sm shadow-lg ${
                activeCard === index ? "ring-2 ring-emerald-500" : ""
              }`}
              variants={cardVariants}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{card.iconEmoji}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-400 mb-6">{card.description}</p>
                <motion.button
                  className="w-full py-2 px-4 bg-emerald-500 text-black rounded-full hover:bg-emerald-600 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(card.path)}
                >
                  {card.buttonText}
                </motion.button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="relative z-10 container mx-auto px-4 pb-24">
        <h2 className="text-3xl font-bold text-white text-center my-12">
          Userflow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mx-16">
          {/* Left Side - Title */}
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-4">
              AI Career Advisor
            </h3>
            <p className="text-gray-400 text-lg">
              Your intelligent companion for personalized career guidance and
              professional growth
            </p>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Enter your details in the profile section",
                description:
                  "Build your comprehensive profile for personalized guidance",
              },
              {
                step: "2",
                title: "AI-powered career analysis",
                description:
                  "Get data-driven insights about suitable career paths",
              },
              {
                step: "3",
                title: "Discuss with the AI bot regarding your career",
                description:
                  "Engage in meaningful conversations about your aspirations",
              },
              {
                step: "4",
                title: "Start taking action",
                description:
                  "Follow personalized recommendations and begin your journey",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-4 bg-zinc-900/50 rounded-xl border border-emerald-500/20"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-white font-medium">{step.title}</h4>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Second Userflow - Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16 mx-16">
          {/* Left Side - Title */}
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent mb-4">
              Career Roadmaps
            </h3>
            <p className="text-gray-400 text-lg">
              Expert-curated learning paths for your career growth
            </p>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Select Your Desired Career",
                description:
                  "Choose from a wide range of career paths that match your interests",
              },
              {
                step: "2",
                title: "Get Step-by-Step Roadmap",
                description:
                  "Receive a detailed pathway customized to your career goals",
              },
              {
                step: "3",
                title: "Resource Recommendations",
                description:
                  "Access curated books, courses, and learning materials",
              },
              {
                step: "4",
                title: "Follow Your Path",
                description:
                  "Track your progress and grow your career systematically",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-4 bg-zinc-900/50 rounded-xl border border-pink-500/20"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-black rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-white font-medium">{step.title}</h4>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Third Userflow - Interview Prep Bot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16 mx-16">
          {/* Left Side - Title */}
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-4">
              Interview Prep Bot
            </h3>
            <p className="text-gray-400 text-lg">
              Master your interview skills with AI-powered practice sessions
            </p>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Select Role & Job Description",
                description:
                  "Choose your target role and provide the job description for tailored prep",
              },
              {
                step: "2",
                title: "Practice with AI",
                description:
                  "Engage in realistic interview scenarios with our AI interviewer",
              },
              {
                step: "3",
                title: "Get Realtime Feedback",
                description:
                  "Receive instant analysis on your responses and communication style",
              },
              {
                step: "4",
                title: "Build Interview Confidence",
                description:
                  "Improve your skills and approach real interviews with confidence",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-4 bg-zinc-900/50 rounded-xl border border-purple-500/20"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-black rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-white font-medium">{step.title}</h4>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="relative z-10 py-24 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              About Us
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              VishPath is your AI-powered career companion, designed to guide
              students and professionals through their educational and career
              journeys. Our platform combines cutting-edge artificial
              intelligence with comprehensive career resources to provide
              personalized guidance and support.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative z-10 py-24 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Meet the Team
            </h2>
            <p className="text-gray-400 text-lg mb-16">
              The minds behind VishPath
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Developer 1 */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-48 h-48 mx-auto overflow-hidden rounded-full border-4 border-purple-500/20">
                  <img
                    src="chintu.jpg"
                    alt="Developer 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Vishnu Vardhan Makkena
                </h3>
                <p className="text-gray-400">Full Stack Developer</p>
                <p className="text-gray-400 text-sm px-8">
                  With a passion for building and a hunger to learn,
                  I enjoy exploring the intersection of web development and
                  AI to create things that matter.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://github.com/vishnumakkena3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vishnu-vardhan-makkena-2515aa282/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  </a>
                </div>
              </motion.div>

              {/* Developer 2 */}
              <motion.div
                className=""
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="">
                  <img
                    src=""
                    alt=""
                    className=""
                  />
                </div>
                <h3 className="">
                  
                </h3>
                <p className=""></p>
                <p className="">
                  
                </p>
                <div className="">
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <svg
                      className=""
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule=""
                        d=""
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Contact Section */}
      <div className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Have questions or suggestions? We'd love to hear from you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-zinc-900/50 rounded-xl border border-emerald-500/20">
                <h3 className="text-white text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-400">contact@VishPath.com</p>
              </div>
              <div className="p-6 bg-zinc-900/50 rounded-xl border border-pink-500/20">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Location
                </h3>
                <p className="text-gray-400">Nellore, Andhra Pradesh, India</p>
              </div>
              <div className="p-6 bg-zinc-900/50 rounded-xl border border-purple-500/20">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Social
                </h3>
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 VishPath. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
