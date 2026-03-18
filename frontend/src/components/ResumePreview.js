import React, { useState } from "react";

const ResumePreview = ({
  resumeData = {},
  onClose = () => {},
  onDownload = () => {},
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const {
    personalInfo = {},
    summary = "",
    experience = [],
    education = [],
    skills = [],
  } = resumeData || {};

  const handleDownload = () => {
    onDownload(resumeData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Resume Preview</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Download PDF
            </button>
            <button
              onClick={() => {
                setVisible(false);
                onClose();
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <div className="p-8 bg-gray-50">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
            
            {/* Personal Info */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {personalInfo?.fullName || "Your Name"}
              </h1>

              <div className="flex flex-wrap justify-center text-gray-600 gap-4">
                {personalInfo?.email && <span>📧 {personalInfo.email}</span>}
                {personalInfo?.phone && <span>📱 {personalInfo.phone}</span>}
                {personalInfo?.address && <span>📍 {personalInfo.address}</span>}
              </div>

              <div className="flex flex-wrap justify-center text-gray-600 gap-4 mt-2">
                {personalInfo?.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
                {personalInfo?.website && <span>🌐 {personalInfo.website}</span>}
              </div>
            </div>

            {/* Summary */}
            {summary && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold border-b-2 border-blue-600 pb-1 mb-3">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              </div>
            )}

            {/* Experience */}
            {Array.isArray(experience) && experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold border-b-2 border-blue-600 pb-1 mb-4">
                  Work Experience
                </h2>

                {experience.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {exp?.jobTitle}
                        </h3>
                        <p className="text-blue-600">{exp?.company}</p>
                      </div>
                      <div className="text-right text-gray-600">
                        <p>{exp?.location}</p>
                        <p className="text-sm">
                          {exp?.startDate} - {exp?.endDate || "Present"}
                        </p>
                      </div>
                    </div>

                    {exp?.description && (
                      <div className="mt-2 text-gray-700">
                        {exp.description
                          .split("\n")
                          .map((line, i) => (
                            <p key={i}>• {line}</p>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {Array.isArray(education) && education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold border-b-2 border-blue-600 pb-1 mb-4">
                  Education
                </h2>

                {education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {edu?.degree}
                        </h3>
                        <p className="text-blue-600">
                          {edu?.institution}
                        </p>
                        {edu?.gpa && (
                          <p className="text-gray-600">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-gray-600">
                        <p>{edu?.location}</p>
                        <p className="text-sm">
                          {edu?.graduationDate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {Array.isArray(skills) && skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold border-b-2 border-blue-600 pb-1 mb-4">
                  Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill?.name || skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
