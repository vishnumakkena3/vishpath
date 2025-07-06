import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { marked } from "marked";
import '../styles/markdown.css'
const CareerAssessment = () => {
  const user = useAuth();
  const [formData, setFormData] = useState({
    partTimeJob: "",
    absenceDays: "",
    extracurricularActivities: "",
    weeklySelfStudyHours: "",
    learningStyle: "",
    careerGoals: "",
    studentPreferredField: "",
    interestedDomain: "",
    parentPreferredField: "",
    financialSupport: "",
    observedStrengths: [],
    teacherRecommendedField: "",
    personalityType: "",
    stressHandling: "",
    interestAreas: {
      technicalScientific: 0,
      creativeArtistic: 0,
      socialInterpersonal: 0,
      businessManagement: 0,
      researchAnalysis: 0,
    },
  });

  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMultiSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData({
      ...formData,
      observedStrengths: selectedOptions,
    });
  };

  const handleInterestAreaChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      interestAreas: {
        ...formData.interestAreas,
        [name]: parseInt(value, 10),
      },
    });
  };

  const prepareDataForSubmission = () => {
    return {
      userId: user?.id,
      partTimeJob: formData.partTimeJob,
      absenceDays: formData.absenceDays,
      extracurricularActivities: formData.extracurricularActivities,
      weeklySelfStudyHours: formData.weeklySelfStudyHours,
      learningStyle: formData.learningStyle,
      careerGoals: formData.careerGoals,
      studentPreferredField: formData.studentPreferredField, // Added studentPreferredField
      parentPreferredField: formData.parentPreferredField,
      financialSupport: formData.financialSupport,
      teacherRecommendedField: formData.teacherRecommendedField,
      personalityType: formData.personalityType,
      stressHandling: formData.stressHandling,
      interestAreas: formData.interestAreas,
      observedStrengths: formData.observedStrengths,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setPrediction("");

    try {
      const submissionData = prepareDataForSubmission();

      const response = await fetch("http://localhost:3001/career_prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            "Failed to get career prediction. Please try again."
        );
      }

      const data = await response.json();
      setPrediction(data.recommendation);
    } catch (err) {
      setError(
        err.message || "Failed to get career prediction. Please try again."
      );
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const parseMarkdown = (content) => {
    marked.setOptions({
      breaks: true,
      gfm: true,
      sanitize: false,
      pedantic: false,
      headerIds: false
    });
    return {
      __html: marked(content)
    };
  };
  const getDomainOptions = () => {
    switch (formData.studentPreferredField) {
      case "engineering":
        return [
          { value: "computers", label: "Computers" },
          { value: "mechanical", label: "Mechanical" },
          { value: "electrical", label: "Electrical" },
          { value: "civil", label: "Civil" },
        ];
      case "medicine":
        return [
          { value: "generalPractice", label: "General Practice" },
          { value: "surgery", label: "Surgery" },
          { value: "pediatrics", label: "Pediatrics" },
          { value: "cardiology", label: "Cardiology" },
        ];
      case "arts":
        return [
          { value: "literature", label: "Literature" },
          { value: "music", label: "Music" },
          { value: "fineArts", label: "Fine Arts" },
          { value: "performingArts", label: "Performing Arts" },
        ];
      case "business":
        return [
          { value: "finance", label: "Finance" },
          { value: "marketing", label: "Marketing" },
          { value: "humanResources", label: "Human Resources" },
          { value: "entrepreneurship", label: "Entrepreneurship" },
        ];
      default:
        return [];
    }
  };

  const domainOptions = getDomainOptions();

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 mt-20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-4">
              Career Assessment
            </h2>
            <p className="text-lg text-gray-400">
              Discover your ideal career path with our AI-powered assessment
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <motion.div
              className="space-y-4 p-6 bg-zinc-900/50 rounded-xl border border-emerald-500/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-300">Part-Time Job</label>
                  <select
                    name="partTimeJob"
                    value={formData.partTimeJob}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300">Absence Days</label>
                  <input
                    type="number"
                    name="absenceDays"
                    value={formData.absenceDays}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300">
                    Extracurricular Activities
                  </label>
                  <select
                    name="extracurricularActivities"
                    value={formData.extracurricularActivities}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="sports">Sports</option>
                    <option value="music">Music</option>
                    <option value="debate">Debate</option>
                    <option value="volunteering">Volunteering</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300">
                    Weekly Self-Study Hours
                  </label>
                  <input
                    type="number"
                    name="weeklySelfStudyHours"
                    value={formData.weeklySelfStudyHours}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Educational Preferences Section */}
            <motion.div
              className="space-y-4 p-6 bg-zinc-900/50 rounded-xl border border-pink-500/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                Educational Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-300">
                    Student's Preferred Field
                  </label>
                  <select
                    name="studentPreferredField"
                    value={formData.studentPreferredField}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-pink-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-pink-500"
                    required
                  >
                    <option value="">Select Field</option>
                    <option value="engineering">Engineering</option>
                    <option value="medicine">Medicine</option>
                    <option value="arts">Arts</option>
                    <option value="business">Business</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300">Interested Domain</label>
                  <select
                    name="interestedDomain"
                    value={formData.interestedDomain}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-pink-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-pink-500"
                    required
                    disabled={!formData.studentPreferredField}
                  >
                    <option value="">Select Domain</option>
                    {domainOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {!formData.studentPreferredField && (
                    <p className="text-xs text-gray-400 mt-1">
                      Select a field first to see available domains
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="text-gray-300">
                    Career Goals and Aspirations
                  </label>
                  <textarea
                    name="careerGoals"
                    value={formData.careerGoals}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-zinc-800 border border-pink-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-pink-500"
                    placeholder="Describe your long-term career goals..."
                  />
                </div>
              </div>
            </motion.div>
            {/* Domain Preferences Section */}
            <motion.div
              className="space-y-4 p-6 bg-zinc-900/50 rounded-xl border border-emerald-500/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Domain Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-300">
                    Parent's Preferred Field
                  </label>
                  <select
                    name="parentPreferredField"
                    value={formData.parentPreferredField}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Field</option>
                    <option value="engineering">Engineering</option>
                    <option value="medicine">Medicine</option>
                    <option value="arts">Arts</option>
                    <option value="business">Business</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300">
                    Financial Support from Parents
                  </label>
                  <select
                    name="financialSupport"
                    value={formData.financialSupport}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-emerald-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="full">Full Support</option>
                    <option value="partial">Partial Support</option>
                    <option value="minimal">Minimal Support</option>
                    <option value="none">No Support</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Teacher Assessment Section */}
            <motion.div
              className="space-y-4 p-6 bg-zinc-900/50 rounded-xl border border-pink-500/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                Teacher Assessment
              </h3>
              {/* Update the Teacher Assessment section with improved multiple selection */}
              <div className="col-span-2 space-y-4">
                <label className="text-gray-300">Observed Strengths</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: "problemSolving", label: "Problem Solving" },
                    { id: "creativity", label: "Creativity" },
                    { id: "leadership", label: "Leadership" },
                    { id: "communication", label: "Communication" },
                    { id: "analytical", label: "Analytical Thinking" },
                    { id: "teamwork", label: "Teamwork" },
                    { id: "technical", label: "Technical Skills" },
                    { id: "research", label: "Research Abilities" },
                  ].map((strength) => (
                    <motion.div
                      key={strength.id}
                      className="relative"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="checkbox"
                        id={strength.id}
                        name="observedStrengths"
                        value={strength.id}
                        checked={formData.observedStrengths.includes(
                          strength.id
                        )}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            observedStrengths: e.target.checked
                              ? [...prev.observedStrengths, value]
                              : prev.observedStrengths.filter(
                                  (s) => s !== value
                                ),
                          }));
                        }}
                        className="peer hidden"
                      />
                      <label
                        htmlFor={strength.id}
                        className="block w-full p-3 text-sm text-gray-300 bg-zinc-800 border border-pink-500/20 rounded-lg cursor-pointer
                          peer-checked:bg-pink-500/10 peer-checked:border-pink-500 peer-checked:text-white
                          hover:bg-pink-500/5 transition-colors text-center"
                      >
                        {strength.label}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Personal Assessment Section */}
            <motion.div
              className="space-y-4 p-6 bg-zinc-900/50 rounded-xl border border-purple-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Personal Assessment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-300">Personality Type</label>
                  <select
                    name="personalityType"
                    value={formData.personalityType}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-purple-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-purple-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="introvert">Introvert</option>
                    <option value="extrovert">Extrovert</option>
                    <option value="ambivert">Ambivert</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300">Stress Handling</label>
                  <select
                    name="stressHandling"
                    value={formData.stressHandling}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-purple-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-purple-500"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="average">Average</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>
            </motion.div>
            {/* Interest Areas Section */}
            <motion.div
              className="space-y-4 p-6 bg-zinc-900/50 rounded-xl border border-purple-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Interest Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(formData.interestAreas).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-gray-300">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <input
                      type="number"
                      name={key}
                      min="1"
                      max="5"
                      value={value}
                      onChange={handleInterestAreaChange}
                      className="w-full bg-zinc-800 border border-purple-500/20 rounded-lg p-2 text-gray-300 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-3 px-6 bg-emerald-500 text-black rounded-full hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Get Career Recommendations"
              )}
            </motion.button>
          </form>

          {/* Results Section */}
          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-zinc-900/50 rounded-xl border border-emerald-500/20"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-4">
                Career Recommendation
              </h3>
              <div
                className="markdown-content prose prose-invert max-w-none"
                dangerouslySetInnerHTML={parseMarkdown(prediction)}
              />
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
            >
              {error}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CareerAssessment;
