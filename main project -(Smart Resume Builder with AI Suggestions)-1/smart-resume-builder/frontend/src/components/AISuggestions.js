import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const AISuggestions = ({ currentSection, formData, onApplySuggestion }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentSection && formData) {
      generateSuggestions();
    }
  }, [currentSection, formData]);

  const generateSuggestions = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/ai/suggestions', {
        section: currentSection,
        data: formData[currentSection] || formData,
        context: formData
      });
      
      setSuggestions(response.data.suggestions || []);
    } catch (err) {
      setError('Failed to generate AI suggestions');
      console.error('AI suggestions error:', err);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (suggestion) => {
    onApplySuggestion(currentSection, suggestion.content);
  };

  const getSectionIcon = (section) => {
    const icons = {
      personal: '👤',
      summary: '📝',
      experience: '💼',
      education: '🎓',
      skills: '⚡'
    };
    return icons[section] || '💡';
  };

  if (!currentSection) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <span className="mr-2">🤖</span>
          AI Suggestions for {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
          <span className="ml-2">{getSectionIcon(currentSection)}</span>
        </h3>
        <button
          onClick={generateSuggestions}
          disabled={loading}
          className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors duration-200 text-sm"
        >
          {loading ? 'Generating...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-2 text-gray-600">Generating AI suggestions...</span>
        </div>
      ) : suggestions.length > 0 ? (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2">
                    {suggestion.title || `Suggestion ${index + 1}`}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {suggestion.description}
                  </p>
                  {suggestion.preview && (
                    <div className="bg-gray-50 rounded p-3 text-sm text-gray-700 italic">
                      "{suggestion.preview}"
                    </div>
                  )}
                </div>
                <button
                  onClick={() => applySuggestion(suggestion)}
                  className="ml-3 bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>No AI suggestions available for this section yet.</p>
          <p className="text-sm mt-1">Fill in some information to get personalized suggestions!</p>
        </div>
      )}

      {/* Tips for better suggestions */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-medium text-blue-800 mb-1">💡 Pro Tips:</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Add more details to get better AI suggestions</li>
          <li>• Include specific achievements and metrics</li>
          <li>• Mention relevant skills and technologies</li>
          <li>• Be specific about your role and responsibilities</li>
        </ul>
      </div>
    </div>
  );
};

export default AISuggestions;