import React, { useState, useEffect } from 'react';
import PersonalInfo from './PersonalInfo';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Summary from './Summary';
import AISuggestions from './AISuggestions';
import ATSScore from './ATSScore';
import JobMatcher from './JobMatcher';
import html2pdf from "html2pdf.js";

const ResumeForm = ({ resume, onSave }) => {

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
    skills: { technical: [], soft: [] }
  });

  const [loadingPDF, setLoadingPDF] = useState(false);

  // =========================
  // 🔥 LOAD FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const saved = localStorage.getItem("resumeData");

    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // =========================
  // 🔥 AUTO SAVE
  // =========================
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
  }, [formData]);

  // =========================
  // LOAD EDIT DATA (FROM BACKEND)
  // =========================
  useEffect(() => {
    if (resume) {
      setFormData({
        personalInfo: resume.personalInfo || {},
        summary: resume.summary || '',
        experience: resume.experience || [],
        education: resume.education || [],
        skills: resume.skills || { technical: [], soft: [] }
      });
    }
  }, [resume]);

  // =========================
  // UPDATE FUNCTIONS
  // =========================
  const updatePersonalInfo = (data) =>
    setFormData(prev => ({ ...prev, personalInfo: data }));

  const updateSummary = (data) =>
    setFormData(prev => ({ ...prev, summary: data }));

  const updateExperience = (data) =>
    setFormData(prev => ({ ...prev, experience: data }));

  const updateEducation = (data) =>
    setFormData(prev => ({ ...prev, education: data }));

  const updateSkills = (data) =>
    setFormData(prev => ({ ...prev, skills: data }));

  // =========================
  // 📄 PDF DOWNLOAD (IMPROVED)
  // =========================
  const downloadPDF = async () => {
    setLoadingPDF(true);

    const element = document.getElementById("resume-preview");

    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(opt).from(element).save();

    setLoadingPDF(false);
  };

  // =========================
  // RENDER SECTION
  // =========================
  const renderSection = () => {
    switch (activeTab) {

      case 'personal':
        return (
          <PersonalInfo
            personalInfo={formData.personalInfo}
            setPersonalInfo={updatePersonalInfo}
          />
        );

      case 'summary':
        return (
          <Summary
            summary={formData.summary}
            setSummary={updateSummary}
          />
        );

      case 'experience':
        return (
          <Experience
            experience={formData.experience}
            setExperience={updateExperience}
          />
        );

      case 'education':
        return (
          <Education
            education={formData.education}
            setEducation={updateEducation}
          />
        );

      case 'skills':
        return (
          <Skills
            skills={formData.skills}
            setSkills={updateSkills}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">

      {/* =========================
          TABS
      ========================= */}
      <div className="border-b">
        <nav className="flex flex-wrap">
          {['personal','summary','experience','education','skills'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <div className="p-6">

        {/* PDF AREA */}
        <div id="resume-preview">
          {renderSection()}
        </div>

        {/* ATS SCORE */}
        <ATSScore formData={formData} />

        {/* JOB MATCHER */}
        <JobMatcher formData={formData} />

      </div>

      {/* =========================
          AI SUGGESTIONS
      ========================= */}
      <div className="border-t p-6 bg-gray-50">
        <AISuggestions
          currentSection={activeTab}
          formData={formData}
          onApplySuggestion={(section, content) => {
            if (section === 'personal') updatePersonalInfo(content);
            if (section === 'summary') updateSummary(content);
            if (section === 'experience') updateExperience(content);
            if (section === 'education') updateEducation(content);
            if (section === 'skills') updateSkills(content);
          }}
        />
      </div>

      {/* =========================
          ACTION BUTTONS
      ========================= */}
      <div className="border-t p-6 space-y-3">

        <button
          onClick={() => onSave(formData)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Resume
        </button>

        <button
          onClick={downloadPDF}
          disabled={loadingPDF}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loadingPDF ? "Generating PDF..." : "Download PDF"}
        </button>

      </div>

    </div>
  );
};

export default ResumeForm;