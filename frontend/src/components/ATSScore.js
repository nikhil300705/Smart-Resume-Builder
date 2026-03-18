import React, { useEffect, useState } from "react";

const ATSScore = ({ formData }) => {
  const [score, setScore] = useState(0);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    calculateScore();
  }, [formData]);

  const calculateScore = () => {
    let s = 0;
    let feedback = [];

    const text = JSON.stringify(formData).toLowerCase();

    const keywords = [
      "react",
      "node",
      "mongodb",
      "express",
      "api",
      "javascript",
      "sql",
      "aws"
    ];

    keywords.forEach(k => {
      if (text.includes(k)) s += 5;
    });

    if (formData.summary.length > 50) {
      s += 20;
    } else {
      feedback.push("Add a stronger summary");
    }

    if (formData.experience.length > 0) {
      s += 25;
    } else {
      feedback.push("Add work experience");
    }

    if (formData.education.length > 0) s += 15;

    if (formData.skills.technical.length > 0) {
      s += 15;
    } else {
      feedback.push("Add technical skills");
    }

    if (formData.personalInfo.fullName) s += 5;
    if (formData.personalInfo.email) s += 5;

    setScore(Math.min(s, 100));
    setTips(feedback);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-2">ATS Score</h3>

      <div className="text-3xl font-bold text-blue-600">
        {score}/100
      </div>

      {tips.length > 0 && (
        <ul className="mt-3 text-sm text-red-600">
          {tips.map((t, i) => (
            <li key={i}>• {t}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ATSScore;