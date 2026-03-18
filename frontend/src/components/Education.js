import React, { useState } from 'react';
import { Plus, Trash2, Calendar, GraduationCap } from 'lucide-react';

const Education = ({ education = [], setEducation }) => {
  const [educationList, setEducationList] = useState(education);

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
      gpa: '',
      achievements: [],
      description: ''
    };
    const updated = [...educationList, newEducation];
    setEducationList(updated);
    setEducation(updated);
  };

  const updateEducation = (id, field, value) => {
    const updated = educationList.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducationList(updated);
   setEducation(updated);

  };

  const removeEducation = (id) => {
    const updated = educationList.filter(edu => edu.id !== id);
    setEducationList(updated);
    setEducation(updated);

  };

  const addAchievement = (id) => {
    const updated = educationList.map(edu =>
      edu.id === id 
        ? { ...edu, achievements: [...edu.achievements, ''] }
        : edu
    );
    setEducationList(updated);
    setEducation(updated);

  };

  const updateAchievement = (eduId, achievementIndex, value) => {
    const updated = educationList.map(edu =>
      edu.id === eduId
        ? {
            ...edu,
            achievements: edu.achievements.map((ach, idx) =>
              idx === achievementIndex ? value : ach
            )
          }
        : edu
    );
    setEducationList(updated);
    setEducation(updated);

  };

  const removeAchievement = (eduId, achievementIndex) => {
    const updated = educationList.map(edu =>
      edu.id === eduId
        ? {
            ...edu,
            achievements: edu.achievements.filter((_, idx) => idx !== achievementIndex)
          }
        : edu
    );
    setEducationList(updated);
    setEducation(updated);
;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      {educationList.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No education entries yet</p>
          <button
            onClick={addEducation}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {educationList.map((edu, index) => (
            <div key={edu.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Education #{index + 1}
                </h3>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University of California, Berkeley"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                    placeholder="Computer Science"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    End Date
                  </label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    disabled={edu.currentlyStudying}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={edu.currentlyStudying}
                    onChange={(e) => {
                      updateEducation(edu.id, 'currentlyStudying', e.target.checked);
                      if (e.target.checked) {
                        updateEducation(edu.id, 'endDate', '');
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Currently studying here</span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder="Relevant coursework, projects, or additional details..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Achievements & Honors
                  </label>
                  <button
                    onClick={() => addAchievement(edu.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Achievement</span>
                  </button>
                </div>
                
                {edu.achievements.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => updateAchievement(edu.id, achievementIndex, e.target.value)}
                      placeholder="Dean's List, Magna Cum Laude, etc."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => removeAchievement(edu.id, achievementIndex)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Education;