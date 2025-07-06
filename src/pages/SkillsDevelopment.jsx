import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, BookOpen, ChevronDown } from 'lucide-react';

const SkillsDevelopment = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [expandedState, setExpandedState] = useState({
    moduleId: null,
    submoduleId: null,
  });

  // Data structure remains the same
  const modules = [/* your existing modules data */
    {
      id: 'computer-science',
      name: 'Computer Science & IT',
      submodules: [
        {
          id: 'programming',
          name: 'Programming',
          topics: [
            { id: 'python', name: 'Python', resources: [
              { type: 'youtube', title: 'Python for Beginners', url: 'https://www.youtube.com/watch?v=7wnove7K-ZQ&list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg' },
              { type: 'book', title: 'Python Crash Course', url: 'https://amzn.in/d/fhNLqjA' },
            ]},
            { id: 'java', name: 'Java', resources: [
              { type: 'youtube', title: 'Java Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=rZ41y93P2Qo&list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ' },
              { type: 'book', title: 'Effective Java', url: 'https://amzn.in/d/gyhDN6D' },
            ]},
            { id: 'web-development', name: 'Web Development', resources: [
              { type: 'youtube', title: 'Web Development Full Course', url: 'https://www.youtube.com/watch?v=tVzUXW6siu0&list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w' },
              { type: 'book', title: 'HTML & CSS: Design and Build Websites', url: 'https://amzn.in/d/1FnmPKV' },
            ]},
          ],
        },
        {
          id: 'ai-ml',
          name: 'AI & Machine Learning',
          topics: [
            { id: 'machine-learning', name: 'Machine Learning', resources: [
              { type: 'youtube', title: 'Machine Learning Basics', url: 'https://youtube.com/ml-basics' },
              { type: 'book', title: 'Hands-On Machine Learning', url: 'https://example.com/ml-book' },
            ]},
            { id: 'deep-learning', name: 'Deep Learning', resources: [
              { type: 'youtube', title: 'Deep Learning Tutorial', url: 'https://youtube.com/deep-learning' },
              { type: 'book', title: 'Deep Learning by Ian Goodfellow', url: 'https://example.com/dl-book' },
            ]},
          ],
        },
        {
          id: 'cybersecurity',
          name: 'Cybersecurity',
          topics: [
            { id: 'ethical-hacking', name: 'Ethical Hacking', resources: [
              { type: 'youtube', title: 'Ethical Hacking for Beginners', url: 'https://youtube.com/ethical-hacking' },
              { type: 'book', title: 'The Web Application Hacker\'s Handbook', url: 'https://example.com/hacking-book' },
            ]},
            { id: 'network-security', name: 'Network Security', resources: [
              { type: 'youtube', title: 'Network Security Basics', url: 'https://youtube.com/network-security' },
              { type: 'book', title: 'Network Security Essentials', url: 'https://example.com/network-security-book' },
            ]},
          ],
        },
      ],
    },
    {
      id: 'mechanical-engineering',
      name: 'Mechanical & Electrical Engineering',
      submodules: [
        {
          id: 'cad-design',
          name: 'CAD Design',
          topics: [
            { id: 'solidworks', name: 'SolidWorks', resources: [
              { type: 'youtube', title: 'SolidWorks Tutorial for Beginners', url: 'https://youtube.com/solidworks' },
              { type: 'book', title: 'SolidWorks Bible', url: 'https://example.com/solidworks-book' },
            ]},
            { id: 'autocad', name: 'AutoCAD', resources: [
              { type: 'youtube', title: 'AutoCAD Basics', url: 'https://youtube.com/autocad' },
              { type: 'book', title: 'AutoCAD for Dummies', url: 'https://example.com/autocad-book' },
            ]},
          ],
        },
        {
          id: 'robotics',
          name: 'Robotics',
          topics: [
            { id: 'iot', name: 'IoT', resources: [
              { type: 'youtube', title: 'IoT Explained', url: 'https://youtube.com/iot' },
              { type: 'book', title: 'IoT for Beginners', url: 'https://example.com/iot-book' },
            ]},
            { id: '3d-printing', name: '3D Printing', resources: [
              { type: 'youtube', title: '3D Printing Basics', url: 'https://youtube.com/3d-printing' },
              { type: 'book', title: '3D Printing Handbook', url: 'https://example.com/3d-printing-book' },
            ]},
          ],
        },
        {
          id: 'renewable-energy',
          name: 'Renewable Energy & Sustainability',
          topics: [
            { id: 'solar-energy', name: 'Solar Energy', resources: [
              { type: 'youtube', title: 'Solar Energy Basics', url: 'https://youtube.com/solar-energy' },
              { type: 'book', title: 'Solar Power Your Home For Dummies', url: 'https://example.com/solar-book' },
            ]},
            { id: 'wind-energy', name: 'Wind Energy', resources: [
              { type: 'youtube', title: 'Wind Energy Explained', url: 'https://youtube.com/wind-energy' },
              { type: 'book', title: 'Wind Energy Handbook', url: 'https://example.com/wind-book' },
            ]},
          ],
        },
      ],
    },
    {
      id: 'medicine-healthcare',
      name: 'Medicine & Healthcare',
      submodules: [
        {
          id: 'ai-healthcare',
          name: 'AI in Healthcare',
          topics: [
            { id: 'medical-imaging', name: 'Medical Imaging', resources: [
              { type: 'youtube', title: 'AI in Medical Imaging', url: 'https://youtube.com/medical-imaging' },
              { type: 'book', title: 'Deep Learning for Medical Image Analysis', url: 'https://example.com/medical-imaging-book' },
            ]},
            { id: 'telemedicine', name: 'Telemedicine', resources: [
              { type: 'youtube', title: 'Telemedicine Basics', url: 'https://youtube.com/telemedicine' },
              { type: 'book', title: 'Telemedicine Essentials', url: 'https://example.com/telemedicine-book' },
            ]},
          ],
        },
        {
          id: 'medical-data-analysis',
          name: 'Medical Data Analysis',
          topics: [
            { id: 'health-data', name: 'Health Data Analytics', resources: [
              { type: 'youtube', title: 'Health Data Analysis Basics', url: 'https://youtube.com/health-data' },
              { type: 'book', title: 'Healthcare Data Analytics', url: 'https://example.com/health-data-book' },
            ]},
            { id: 'biostatistics', name: 'Biostatistics', resources: [
              { type: 'youtube', title: 'Biostatistics Tutorial', url: 'https://youtube.com/biostatistics' },
              { type: 'book', title: 'Biostatistics for Dummies', url: 'https://example.com/biostatistics-book' },
            ]},
          ],
        },
      ],
    },
    {
      id: 'business-finance',
      name: 'Business & Finance',
      submodules: [
        {
          id: 'digital-marketing',
          name: 'Digital Marketing',
          topics: [
            { id: 'seo', name: 'SEO', resources: [
              { type: 'youtube', title: 'SEO for Beginners', url: 'https://youtube.com/seo' },
              { type: 'book', title: 'SEO 2023', url: 'https://example.com/seo-book' },
            ]},
            { id: 'social-media', name: 'Social Media Marketing', resources: [
              { type: 'youtube', title: 'Social Media Marketing Basics', url: 'https://youtube.com/social-media' },
              { type: 'book', title: 'Social Media Marketing for Dummies', url: 'https://example.com/social-media-book' },
            ]},
          ],
        },
        {
          id: 'financial-modeling',
          name: 'Financial Modeling',
          topics: [
            { id: 'stock-market', name: 'Stock Market Basics', resources: [
              { type: 'youtube', title: 'Stock Market for Beginners', url: 'https://youtube.com/stock-market' },
              { type: 'book', title: 'The Intelligent Investor', url: 'https://example.com/stock-market-book' },
            ]},
            { id: 'investment', name: 'Investment Strategies', resources: [
              { type: 'youtube', title: 'Investment Basics', url: 'https://youtube.com/investment' },
              { type: 'book', title: 'Common Stocks and Uncommon Profits', url: 'https://example.com/investment-book' },
            ]},
          ],
        },
      ],
    },
    {
      id: 'arts-design',
      name: 'Arts & Design',
      submodules: [
        {
          id: 'ui-ux',
          name: 'UI/UX Design',
          topics: [
            { id: 'figma', name: 'Figma', resources: [
              { type: 'youtube', title: 'Figma Tutorial for Beginners', url: 'https://youtube.com/figma' },
              { type: 'book', title: 'Designing with Figma', url: 'https://example.com/figma-book' },
            ]},
            { id: 'user-research', name: 'User Research', resources: [
              { type: 'youtube', title: 'User Research Basics', url: 'https://youtube.com/user-research' },
              { type: 'book', title: 'Don\'t Make Me Think', url: 'https://example.com/user-research-book' },
            ]},
          ],
        },
        {
          id: 'graphic-design',
          name: 'Graphic Design',
          topics: [
            { id: 'photoshop', name: 'Photoshop', resources: [
              { type: 'youtube', title: 'Photoshop Basics', url: 'https://youtube.com/photoshop' },
              { type: 'book', title: 'Photoshop for Beginners', url: 'https://example.com/photoshop-book' },
            ]},
            { id: 'illustrator', name: 'Illustrator', resources: [
              { type: 'youtube', title: 'Illustrator Tutorial', url: 'https://youtube.com/illustrator' },
              { type: 'book', title: 'Adobe Illustrator Classroom in a Book', url: 'https://example.com/illustrator-book' },
            ]},
          ],
        },
      ],
    },
    {
      id: 'agriculture-environment',
      name: 'Agriculture & Environmental Studies',
      submodules: [
        {
          id: 'smart-farming',
          name: 'Smart Farming',
          topics: [
            { id: 'precision-agriculture', name: 'Precision Agriculture', resources: [
              { type: 'youtube', title: 'Precision Agriculture Explained', url: 'https://youtube.com/precision-agriculture' },
              { type: 'book', title: 'Precision Agriculture Basics', url: 'https://example.com/precision-agriculture-book' },
            ]},
            { id: 'hydroponics', name: 'Hydroponics', resources: [
              { type: 'youtube', title: 'Hydroponics for Beginners', url: 'https://youtube.com/hydroponics' },
              { type: 'book', title: 'Hydroponics: The Beginner\'s Guide', url: 'https://example.com/hydroponics-book' },
            ]},
          ],
        },
        {
          id: 'climate-change',
          name: 'Climate Change Solutions',
          topics: [
            { id: 'carbon-footprint', name: 'Carbon Footprint Reduction', resources: [
              { type: 'youtube', title: 'Reducing Carbon Footprint', url: 'https://youtube.com/carbon-footprint' },
              { type: 'book', title: 'The Carbon Footprint Handbook', url: 'https://example.com/carbon-footprint-book' },
            ]},
            { id: 'renewable-energy', name: 'Renewable Energy', resources: [
              { type: 'youtube', title: 'Renewable Energy Basics', url: 'https://youtube.com/renewable-energy' },
              { type: 'book', title: 'Renewable Energy Essentials', url: 'https://example.com/renewable-energy-book' },
            ]},
          ],
        },
      ],
    },
    {
      id: 'science-research',
      name: 'Science & Research',
      submodules: [
        {
          id: 'biotechnology',
          name: 'Biotechnology',
          topics: [
            { id: 'genetic-engineering', name: 'Genetic Engineering', resources: [
              { type: 'youtube', title: 'Genetic Engineering Basics', url: 'https://youtube.com/genetic-engineering' },
              { type: 'book', title: 'Genetic Engineering: Principles and Methods', url: 'https://example.com/genetic-engineering-book' },
            ]},
            { id: 'biopharma', name: 'Biopharmaceuticals', resources: [
              { type: 'youtube', title: 'Biopharmaceuticals Explained', url: 'https://youtube.com/biopharma' },
              { type: 'book', title: 'Biopharmaceuticals: Biochemistry and Biotechnology', url: 'https://example.com/biopharma-book' },
            ]},
          ],
        },
        {
          id: 'nanotechnology',
          name: 'Nanotechnology',
          topics: [
            { id: 'nano-materials', name: 'Nanomaterials', resources: [
              { type: 'youtube', title: 'Nanomaterials Basics', url: 'https://youtube.com/nano-materials' },
              { type: 'book', title: 'Nanomaterials: Synthesis and Applications', url: 'https://example.com/nano-materials-book' },
            ]},
            { id: 'nano-medicine', name: 'Nanomedicine', resources: [
              { type: 'youtube', title: 'Nanomedicine Explained', url: 'https://youtube.com/nano-medicine' },
              { type: 'book', title: 'Nanomedicine: Principles and Perspectives', url: 'https://example.com/nano-medicine-book' },
            ]},
          ],
        },
      ],
    },
  ];

  const handleModuleClick = (module) => {
    setSelectedModule(selectedModule?.id === module.id ? null : module);
    setExpandedState({ moduleId: null, submoduleId: null }); // Reset expanded state when a new module is selected
  };

  const handleSubmoduleClick = (moduleId, submoduleId) => {
    setExpandedState((prev) =>
      prev.moduleId === moduleId && prev.submoduleId === submoduleId
        ? { moduleId: null, submoduleId: null } // Collapse if already expanded
        : { moduleId, submoduleId } // Expand the clicked submodule
    );
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setExpandedState({ moduleId: null, submoduleId: null });
  };
  return (
    <div className="min-h-[calc(100vh-64px)] bg-black py-12 px-4 mt-16">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Skills Development
          </h1>
          <p className="text-gray-400 mt-2">
            Explore and learn across various departments and disciplines
          </p>
        </div>

        {/* Render modules or submodules based on selection */}
        <AnimatePresence mode="wait">
          {!selectedModule ? (
            // Show all modules
            <motion.div
              key="modules"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {modules.map((module) => (
                <motion.div
                  key={module.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-zinc-900/50 rounded-xl border border-emerald-500/20 backdrop-blur-sm overflow-hidden cursor-pointer"
                  onClick={() => handleModuleClick(module)}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/10 rounded-lg">
                        <BookOpen className="text-emerald-400" size={24} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-200">{module.name}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Show submodules of selected module
            <motion.div
              key="submodules"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleBackToModules}
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-6"
              >
                <ChevronLeft size={20} />
                <span>Back to Departments</span>
              </button>

              <h2 className="text-3xl font-semibold text-gray-200 mb-6">{selectedModule.name}</h2>

              {/* Single column layout for submodules */}
              <div className="grid grid-cols-1 gap-6">
                {selectedModule.submodules.map((submodule) => (
                  <div
                    key={submodule.id}
                    className="bg-[#111] rounded-xl overflow-hidden"
                  >
                    <button
                      className="w-full px-6 py-4 flex justify-between items-center cursor-pointer text-left hover:bg-opacity-80"
                      onClick={() => handleSubmoduleClick(selectedModule.id, submodule.id)}
                    >
                      <h3 className="text-xl font-semibold text-white">{submodule.name}</h3>
                      <motion.div
                        animate={{
                          rotate:
                            expandedState.moduleId === selectedModule.id &&
                            expandedState.submoduleId === submodule.id
                              ? 180
                              : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="text-emerald-400" size={20} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedState.moduleId === selectedModule.id &&
                        expandedState.submoduleId === submodule.id && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 space-y-4">
                              {submodule.topics.map((topic) => (
                                <div key={topic.id} className="bg-black/50 rounded-lg p-4">
                                  <h4 className="text-lg font-medium text-emerald-400 mb-3">
                                    {topic.name}
                                  </h4>
                                  <div className="space-y-2">
                                    {topic.resources.map((resource, index) => (
                                      <a
                                        key={index}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors"
                                      >
                                        {resource.type === 'youtube' ? '🎥 ' : '📚 '}
                                        <span className="text-sm">{resource.title}</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillsDevelopment;