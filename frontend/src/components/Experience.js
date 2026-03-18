import React, { useState } from 'react';
import { Plus, Trash2, Calendar, MapPin, Building } from 'lucide-react';

const Experience = ({ experience = [], setExperience }) => {

  const experiences = experience || [];

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
      alert('Please fill Job Title & Company');
      return;
    }

    const experienceData = {
      ...formData,
      achievements: formData.achievements.filter(a => a.trim() !== ''),
      endDate: formData.isCurrentJob ? 'Present' : formData.endDate
    };

    if (editingIndex !== null) {
      const updated = [...experiences];
      updated[editingIndex] = experienceData;
      setExperience(updated);
    } else {
      setExperience([...experiences, experienceData]);
    }

    resetForm();
  };

  const handleEdit = (index) => {
    const exp = experiences[index];
    setFormData({
      ...exp,
      isCurrentJob: exp.endDate === 'Present',
      endDate: exp.endDate === 'Present' ? '' : exp.endDate,
      achievements: exp.achievements?.length ? exp.achievements : ['']
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperience(updated);
  };

  const formatDate = (date) => {
    if (!date || date === 'Present') return date;
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Work Experience</h2>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={20} />
          Add Experience
        </button>
      </div>

      {/* LIST */}
      {experiences.length > 0 ? (
        experiences.map((exp, index) => (
          <div key={index} className="bg-white p-4 border rounded shadow-sm">

            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">{exp.jobTitle}</h3>

                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building size={14} /> {exp.company}
                  </span>

                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {exp.location}
                    </span>
                  )}

                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleEdit(index)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(index)} className="text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {exp.description && <p className="mt-2">{exp.description}</p>}

            {exp.achievements?.length > 0 && (
              <ul className="list-disc pl-5 mt-2">
                {exp.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            )}

          </div>
        ))
      ) : (
        <div className="text-center py-10 border-dashed border-2">
          No experience added
        </div>
      )}

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl font-bold mb-4">
              {editingIndex !== null ? 'Edit Experience' : 'Add Experience'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="month"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                />

                <input
                  type="month"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  disabled={formData.isCurrentJob}
                  className="border p-2 rounded"
                />
              </div>

              <label className="flex gap-2">
                <input
                  type="checkbox"
                  name="isCurrentJob"
                  checked={formData.isCurrentJob}
                  onChange={handleInputChange}
                />
                Current Job
              </label>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />

              {/* Achievements */}
              {formData.achievements.map((a, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={a}
                    onChange={(e) => handleAchievementChange(i, e.target.value)}
                    className="flex-1 border p-2 rounded"
                  />
                  <button type="button" onClick={() => removeAchievement(i)}>X</button>
                </div>
              ))}

              <button type="button" onClick={addAchievement} className="text-blue-600">
                + Add Achievement
              </button>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded">
                  Cancel
                </button>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save
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