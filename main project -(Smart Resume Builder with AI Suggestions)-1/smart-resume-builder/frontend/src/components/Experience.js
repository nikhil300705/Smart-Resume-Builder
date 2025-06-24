import React, { useState } from 'react';
import { Plus, Trash2, Calendar, MapPin, Building } from 'lucide-react';

const Experience = ({ experiences, setExperiences }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false,
    description: '',
    achievements: ['']
  });

  const resetForm = () => {
    setFormData({
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: '',
      achievements: ['']
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const removeAchievement = (index) => {
    if (formData.achievements.length > 1) {
      const newAchievements = formData.achievements.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        achievements: newAchievements
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.jobTitle || !formData.company) {
      alert('Please fill in required fields (Job Title and Company)');
      return;
    }

    const experienceData = {
      ...formData,
      achievements: formData.achievements.filter(achievement => achievement.trim() !== ''),
      endDate: formData.isCurrentJob ? 'Present' : formData.endDate
    };

    if (editingIndex !== null) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editingIndex] = experienceData;
      setExperiences(updatedExperiences);
    } else {
      setExperiences([...experiences, experienceData]);
    }

    resetForm();
  };

  const handleEdit = (index) => {
    const exp = experiences[index];
    setFormData({
      ...exp,
      isCurrentJob: exp.endDate === 'Present',
      endDate: exp.endDate === 'Present' ? '' : exp.endDate,
      achievements: exp.achievements.length > 0 ? exp.achievements : ['']
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      const updatedExperiences = experiences.filter((_, i) => i !== index);
      setExperiences(updatedExperiences);
    }
  };

  const formatDate = (date) => {
    if (!date || date === 'Present') return date;
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Experience
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{exp.jobTitle}</h3>
                <div className="flex items-center gap-4 text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <Building size={16} />
                    <span>{exp.company}</span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-800 px-3 py-1 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            {exp.description && (
              <p className="text-gray-700 mb-3">{exp.description}</p>
            )}
            
            {exp.achievements && exp.achievements.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        
        {experiences.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Building size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No work experience added yet</p>
            <p className="text-gray-400">Click "Add Experience" to get started</p>
          </div>
        )}
      </div>

      {/* Experience Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingIndex !== null ? 'Edit Experience' : 'Add New Experience'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State/Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    disabled={formData.isCurrentJob}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                  <div className="mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isCurrentJob"
                        checked={formData.isCurrentJob}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Current Job</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Brief description of your role and responsibilities..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Achievements
                </label>
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => handleAchievementChange(index, e.target.value)}
                      placeholder="Describe a key achievement or responsibility..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.achievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAchievement(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAchievement}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Achievement
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingIndex !== null ? 'Update Experience' : 'Add Experience'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;