import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import s from "./Profile.module.css";

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    educationLevel: "",
    academicBackground: {
      stream: "",
      subjects: [{ name: "", marks: "" }],
    },
    careerInterests: [""],
    skills: [""],
    totalMarks: 0,
    percentage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !user.token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        // Initialize if needed and calculate marks
        const data = response.data || formData;
        if (
          !Object.prototype.hasOwnProperty.call(
            data.academicBackground.subjects[0],
            "marks"
          )
        ) {
          data.academicBackground.subjects =
            data.academicBackground.subjects.map((subject) =>
              typeof subject === "string"
                ? { name: subject, marks: "" }
                : subject
            );
        }

        calculateTotalAndPercentage(data);
        setFormData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const calculateTotalAndPercentage = (data) => {
    const subjects = data.academicBackground.subjects;
    const validMarks = subjects.filter(
      (subj) => !isNaN(parseInt(subj.marks)) && subj.name.trim() !== ""
    );

    const totalMarks = validMarks.reduce(
      (sum, subj) => sum + parseInt(subj.marks),
      0
    );
    const percentage =
      validMarks.length > 0
        ? (totalMarks / (validMarks.length * 100)) * 100
        : 0;

    data.totalMarks = totalMarks;
    data.percentage = percentage.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("http://localhost:3001/profile", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };

    calculateTotalAndPercentage(newFormData);
    setFormData(newFormData);
  };

  // Handle subject change with name and marks
  const handleSubjectChange = (index, field, value) => {
    const newFormData = { ...formData };
    newFormData.academicBackground.subjects = [
      ...formData.academicBackground.subjects,
    ];
    newFormData.academicBackground.subjects[index] = {
      ...newFormData.academicBackground.subjects[index],
      [field]: value,
    };

    calculateTotalAndPercentage(newFormData);
    setFormData(newFormData);
  };

  // Handle other dynamic fields
  const handleDynamicChange = (index, field, value) => {
    if (field === "careerInterests" || field === "skills") {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].map((item, i) => (i === index ? value : item)),
      }));
    }
  };

  const addSubject = () => {
    setFormData((prev) => ({
      ...prev,
      academicBackground: {
        ...prev.academicBackground,
        subjects: [
          ...prev.academicBackground.subjects,
          { name: "", marks: "" },
        ],
      },
    }));
  };

  const addField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeSubject = (index) => {
    const newFormData = { ...formData };
    newFormData.academicBackground.subjects =
      formData.academicBackground.subjects.filter((_, i) => i !== index);

    calculateTotalAndPercentage(newFormData);
    setFormData(newFormData);
  };

  const removeField = (index, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  if (loading) return <div className={s.loadingContainer}>Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 p-6 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="border-none bg-zinc-900/50 shadow-2xl p-6 rounded-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Your Profile
            </h1>
          </div>
          <div>
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-200">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Education & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-200">
                    Education Level
                  </label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-gray-400"
                  >
                    <option value="">Select</option>
                    <option value="School">School Student</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="JobSeeker">Job Seeker</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-200">
                    Gender
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                        className="w-4 h-4 text-emerald-500 bg-zinc-800 border-zinc-700 focus:ring-emerald-500/50"
                      />
                      <span className="text-sm text-gray-200">Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                        className="w-4 h-4 text-emerald-500 bg-zinc-800 border-zinc-700 focus:ring-emerald-500/50"
                      />
                      <span className="text-sm text-gray-200">Female</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Academic Stream */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-200">
                  Academic Stream
                </label>
                <input
                  type="text"
                  name="stream"
                  value={formData.academicBackground.stream}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      academicBackground: {
                        ...formData.academicBackground,
                        stream: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-gray-400"
                />
              </div>

              {/* Subjects & Marks */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-200">
                  Subjects & Marks (out of 100)
                </label>
                {formData.academicBackground.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="text"
                      value={subject.name}
                      placeholder="Subject name"
                      onChange={(e) =>
                        handleSubjectChange(index, "name", e.target.value)
                      }
                      className="flex-grow px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-gray-400"
                    />
                    <input
                      type="number"
                      value={subject.marks}
                      placeholder="Marks"
                      min="0"
                      max="100"
                      onChange={(e) =>
                        handleSubjectChange(index, "marks", e.target.value)
                      }
                      className="w-24 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSubject}
                  className="px-4 py-2 text-sm border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/10 transition-colors"
                >
                  + Add Subject
                </button>
              </div>

              {/* Results Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-200">
                    Total Marks
                  </label>
                  <input
                    type="text"
                    value={formData.totalMarks}
                    readOnly
                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-200">
                    Percentage
                  </label>
                  <input
                    type="text"
                    value={`${formData.percentage}%`}
                    readOnly
                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white"
                  />
                </div>
              </div>

              {/* Career Interests */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-200">
                  Career Interests
                </label>
                {formData.careerInterests.map((interest, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="text"
                      value={interest}
                      placeholder="Enter career interest"
                      onChange={(e) =>
                        handleDynamicChange(index, "careerInterests", e.target.value)
                      }
                      className="flex-grow px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => removeField(index, "careerInterests")}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField("careerInterests")}
                  className="px-4 py-2 text-sm border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/10 transition-colors"
                >
                  + Add Career Interest
                </button>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-200">
                  Skills
                </label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="text"
                      value={skill}
                      placeholder="Enter skill"
                      onChange={(e) =>
                        handleDynamicChange(index, "skills", e.target.value)
                      }
                      className="flex-grow px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => removeField(index, "skills")}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField("skills")}
                  className="px-4 py-2 text-sm border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/10 transition-colors"
                >
                  + Add Skill
                </button>
              </div>



              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium transition-all"
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
