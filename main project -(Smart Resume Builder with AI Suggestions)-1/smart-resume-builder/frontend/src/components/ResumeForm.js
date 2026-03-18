import React, { useState, useEffect } from 'react';
import PersonalInfo from './PersonalInfo';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Summary from './Summary';
import AISuggestions from './AISuggestions';

const ResumeForm = ({ resumeData, onSave, onPreview }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: []
  });

  useEffect(() => {
    if (resumeData) {
      setFormData(resumeData);
    }
  }, [resumeData]);

  const handleSectionUpdate = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'summary', label: 'Summary', icon: '📝' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⚡' }
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfo
            data={formData.personalInfo}
            onChange={(data) => handleSectionUpdate('personalInfo', data)}
          />
        );
      case 'summary':
        return (
          <Summary
            data={formData.summary}
            onChange={(data) => handleSectionUpdate('summary', data)}
          />
        );
      case 'experience':
        return (
          <Experience
            data={formData.experience}
            onChange={(data) => handleSectionUpdate('experience', data)}
          />
        );
      case 'education':
        return (
          <Education
            data={formData.education}
            onChange={(data) => handleSectionUpdate('education', data)}
          />
        );
      case 'skills':
        return (
          <Skills
            data={formData.skills}
            onChange={(data) => handleSectionUpdate('skills', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {renderActiveSection()}
      </div>

      {/* AI Suggestions */}
      <div className="border-t border-gray-200 p-6 bg-gray-50">
        <AISuggestions
          currentSection={activeTab}
          formData={formData}
          onApplySuggestion={(section, suggestion) => {
            handleSectionUpdate(section, suggestion);
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 p-6 bg-white">
        <div className="flex justify-between space-x-4">
          <button
            onClick={() => onPreview(formData)}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Preview Resume
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Save Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;