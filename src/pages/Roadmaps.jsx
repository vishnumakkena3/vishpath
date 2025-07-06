import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Book, Eye } from 'lucide-react'; // Replaced Download with Eye

const Roadmaps = () => {
  const roadmaps = [
    { id: 'frontend', name: 'Frontend Developer', pdfUrl: '/pdfs/backend.pdf' },
    { id: 'backend', name: 'Backend Developer', pdfUrl: '/pdfs/backend.pdf' },
    { id: 'devops', name: 'DevOps Engineer', pdfUrl: '/pdfs/devops.pdf' },
    { id: 'ai-engineer', name: 'AI Engineer', pdfUrl: '/pdfs/ai-engineer.pdf' },
    { id: 'data-analyst', name: 'Data Analyst', pdfUrl: '/pdfs/data-analyst.pdf' },
    { id: 'ios', name: 'iOS Developer', pdfUrl: '/pdfs/ios.pdf' },
    { id: 'blockchain', name: 'Blockchain Developer', pdfUrl: '/pdfs/blockchain.pdf' },
    { id: 'qa', name: 'QA Engineer', pdfUrl: '/pdfs/qa.pdf' },
    { id: 'software-architect', name: 'Software Architect', pdfUrl: '/pdfs/software-architect.pdf' },
    { id: 'cyber-security', name: 'Cyber Security', pdfUrl: '/pdfs/cyber-security.pdf' },
    { id: 'ux-design', name: 'UX Design', pdfUrl: '/pdfs/ux-design.pdf' },
    { id: 'game-developer', name: 'Game Developer', pdfUrl: '/pdfs/game-developer.pdf' },
    { id: 'technical-writer', name: 'Technical Writer', pdfUrl: '/pdfs/technical-writer.pdf' },
    { id: 'mlops', name: 'MLOps', pdfUrl: '/pdfs/mlops.pdf' },
    { id: 'product-manager', name: 'Product Manager', pdfUrl: '/pdfs/product-manager.pdf' },
    { id: 'engineering-manager', name: 'Engineering Manager', pdfUrl: '/pdfs/engineering-manager.pdf' },
    { id: 'developer-relations', name: 'Developer Relations', pdfUrl: '/pdfs/developer-relations.pdf' },
    { id: 'dsa', name: 'Data Structures & Algorithms', pdfUrl: '/pdfs/datastructures-and-algorithms.pdf' },
    { id: 'prompt-engineering', name: 'Prompt Engineering', pdfUrl: '/pdfs/prompt-engineering.pdf' },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black py-12 px-4 mt-16">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Career Roadmaps
          </h1>
          <p className="text-gray-400 mt-2">
            Explore detailed roadmaps for various career paths in tech.
          </p>
        </div>

        {/* Roadmap Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {roadmaps.map((roadmap) => (
            <motion.div
              key={roadmap.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900/50 rounded-xl border border-emerald-500/20 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg">
                    <Book className="text-emerald-400" size={24} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-200">{roadmap.name}</h2>
                </div>
                <div className="mt-4">
                  <a
                    href={roadmap.pdfUrl}
                    target="_blank" // Open PDF in a new tab
                    rel="noopener noreferrer" // Security best practice
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                  >
                    <Eye size={18} /> {/* Replaced Download with Eye */}
                    <span>View Roadmap</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Roadmaps;