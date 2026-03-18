import React, { useState } from 'react';
import api from '../utils/api';

const AISuggestions = ({ currentSection, formData, onApplySuggestion }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSuggestions = async () => {
    setLoading(true);
    setError('');
    setSuggestions([]);

    try {
      const response = await api.post('/ai/suggest', {
        type: currentSection,
        content: formData[currentSection] || "",
        jobTitle: "Software Engineer",
        industry: "Technology"
      });

      console.log("AI RESPONSE:", response.data);

      if (response.data.success) {
        setSuggestions([
          {
            title: "AI Suggestion",
            description: response.data.data.suggestion,
            content: response.data.data.suggestion
          }
        ]);
      } else {
        setError(response.data.message);
      }

    } catch (err) {
      console.error("AI Error:", err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (suggestion) => {
    onApplySuggestion(currentSection, suggestion.content);
  };

  if (!currentSection) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          🤖 AI Suggestions for {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
        </h3>

        <button
          onClick={generateSuggestions}
          disabled={loading}
          className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-red-500 text-sm mb-3">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-gray-600 text-sm mb-3">
          Generating AI suggestions...
        </div>
      )}

      {/* SUCCESS */}
      {suggestions.length > 0 && (
        <div className="bg-white p-4 rounded border">
          <p className="text-gray-700 text-sm">
            {suggestions[0].description}
          </p>

          <button
            onClick={() => applySuggestion(suggestions[0])}
            className="mt-3 text-purple-600 text-sm font-medium hover:text-purple-800"
          >
            Use this suggestion
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && suggestions.length === 0 && !error && (
        <p className="text-gray-500 text-sm">
          Click "Generate" to get AI suggestions
        </p>
      )}

      {/* TIPS */}
      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs text-blue-700">
          💡 Add more details in your resume to get better AI suggestions
        </p>
      </div>
    </div>
  );
};

export default AISuggestions;