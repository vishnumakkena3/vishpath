import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Plus, Trash2, Eye, Save } from 'lucide-react';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: ''
    },
    education: [{
      institution: '',
      degree: '',
      field: '',
      gradYear: ''
    }],
    experience: [{
      company: '',
      position: '',
      duration: '',
      description: ''
    }],
    skills: []
  });
  const [skillsInput, setSkillsInput] = useState('');

  const handlePersonalInfoChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: value
      }
    }));
  };

  const handleEducationChange = (index, key, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [key]: value } : edu
      )
    }));
  };

  const handleAddEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', field: '', gradYear: '' }]
    }));
  };

  const handleRemoveEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleExperienceChange = (index, key, value) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [key]: value } : exp
      )
    }));
  };

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }));
  };

  const handleRemoveExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
    if (e.target.value.endsWith(',')) {
      const newSkill = e.target.value.slice(0, -1).trim();
      if (newSkill && !formData.skills.includes(newSkill)) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
        }));
        setSkillsInput('');
      }
    }
  };
  const handleSkillsKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newSkill = skillsInput.trim();
      if (newSkill && !formData.skills.includes(newSkill)) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
        }));
        setSkillsInput('');
      }
    }
  };
  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(formData));
    alert('Resume saved successfully!');
  };

  const ResumePreview = ({ data, onClose }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-auto p-8"
      >
        <div className="max-w-4xl mx-auto bg-white text-black rounded-xl p-8 my-8">
          {/* Personal Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
            <div className="text-gray-600 mt-2">
              <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
              <p>{data.personalInfo.location}</p>
              {data.personalInfo.linkedIn && <p>LinkedIn: {data.personalInfo.linkedIn}</p>}
            </div>
          </div>
  
          {/* Education */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{edu.institution}</h3>
                <p>{edu.degree} in {edu.field}</p>
                <p className="text-gray-600">{edu.gradYear}</p>
              </div>
            ))}
          </div>
  
          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{exp.company}</h3>
                <p>{exp.position}</p>
                <p className="text-gray-600">{exp.duration}</p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
  
          {/* Skills */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
  
        {/* Actions */}
        <div className="fixed bottom-8 right-8 flex gap-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600"
          >
            Print Resume
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700"
          >
            Close Preview
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-200 py-12 px-4 mt-16">
      {previewMode && (
        <ResumePreview 
          data={formData} 
          onClose={() => setPreviewMode(false)} 
        />
      )}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Resume Builder
          </h1>
          <p className="text-gray-400">Create your professional resume with ease</p>
        </div>

        {/* Personal Info */}
        <motion.section 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-emerald-500/20 p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-emerald-400">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(formData.personalInfo).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="block text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  value={value}
                  onChange={(e) => handlePersonalInfoChange(key, e.target.value)}
                  className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 
                           text-gray-300 focus:outline-none focus:border-emerald-500 
                           focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-emerald-500/20 p-6 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-emerald-400">Education</h2>
            <button
              onClick={handleAddEducation}
              className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 
                       text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
            >
              <Plus size={16} /> Add Education
            </button>
          </div>
          {formData.education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <label className="block text-gray-400">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 
                           text-gray-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
                {/* Similar fields for degree, field, gradYear */}
              <div className="space-y-2">
                <label className="block text-gray-400">Graduation Year</label>
                <input
                  type="text"
                  value={edu.gradYear}
                  onChange={(e) => handleEducationChange(index, 'gradYear', e.target.value)}
                  className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 
                           text-gray-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-400">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 
                           text-gray-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-400">Field</label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                  className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 
                           text-gray-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
              {index > 0 && (
                <button
                  onClick={() => handleRemoveEducation(index)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </motion.section>
        {/* Experience Section */}
        <motion.section 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-emerald-500/20 p-6 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-emerald-400">Experience</h2>
            <button
              onClick={handleAddExperience}
              className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 
                        text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
            >
              <Plus size={16} /> Add Experience
            </button>
          </div>
          {formData.experience.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <label className="block text-gray-400">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 
                           text-gray-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-400">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 
                           text-gray-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-400">Duration</label>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                  className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 
                           text-gray-300 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g., Jan 2020 - Present"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-gray-400">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 
                           text-gray-300 focus:outline-none focus:border-emerald-500"
                  rows="3"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
              {index > 0 && (
                <button
                  onClick={() => handleRemoveExperience(index)}
                  className="text-red-400 hover:text-red-500 flex items-center gap-2"
                >
                  <Trash2 size={16} /> Remove Experience
                </button>
              )}
            </div>
          ))}
        </motion.section>

        {/* Skills Section */}
                <motion.section 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-emerald-500/20 p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-emerald-400">Skills</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-gray-400">
                Enter your skills (press Enter or type comma to add)
              </label>
              <input
                type="text"
                value={skillsInput}
                onChange={handleSkillsChange}
                onKeyDown={handleSkillsKeyDown}
                className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 
                        text-gray-300 focus:outline-none focus:border-emerald-500"
                placeholder="e.g., JavaScript"
              />
              <p className="text-xs text-gray-500">
                Tip: Press Enter or type comma (,) to add a skill
              </p>
            </div>
            
            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full 
                           border border-emerald-500/20 flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        skills: prev.skills.filter((_, i) => i !== index)
                      }))
                    }}
                    className="hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPreviewMode(true)}
            className="flex-1 py-3 px-6 bg-emerald-500 text-black rounded-full 
                     hover:bg-emerald-600 transition-colors font-medium"
          >
            <Eye className="inline-block mr-2" size={20} />
            Preview Resume
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex-1 py-3 px-6 bg-zinc-800 text-emerald-400 rounded-full 
                     border border-emerald-500/20 hover:bg-zinc-700 transition-colors font-medium"
          >
            <Save className="inline-block mr-2" size={20} />
            Save Resume
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeBuilder;