import React, { useState } from 'react';
import { FileText, Lightbulb, Wand2 } from 'lucide-react';

const Summary = ({ summary, setSummary }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    setSummary(e.target.value);
  };

  const generateAISummary = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI generation - replace with actual API call
      setTimeout(() => {
        const aiSuggestions = [
          "Results-driven professional with 5+ years of experience in software development and team leadership. Proven track record of delivering high-quality solutions and driving process improvements.",
          "Experienced software engineer with expertise in full-stack development, cloud technologies, and agile methodologies. Passionate about creating innovative solutions that drive business growth.",
          "Dynamic professional with strong analytical skills and a passion for problem-solving. Demonstrated ability to work effectively in fast-paced environments and deliver exceptional results."
        ];
        setSuggestions(aiSuggestions);
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating AI summary:', error);
      setIsGenerating(false);
    }
  };

  const useSuggestion = (suggestion) => {
    setSummary(suggestion);
    setSuggestions([]);
  };

  const tips = [
    "Keep it concise (2-3 sentences)",
    "Highlight your key achievements",
    "Include relevant years of experience",
    "Mention your core skills",
    "Tailor it to the job you're applying for"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Professional Summary</h2>
        <button
          onClick={generateAISummary}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <Wand2 size={20} />
          {isGenerating ? 'Generating...' : 'AI Generate'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Input */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Summary
            </label>
            <textarea
              value={summary || ''}
              onChange={handleInputChange}
              placeholder="Write a compelling professional summary that highlights your key qualifications, experience, and career objectives. This should be a brief overview of who you are professionally and what you bring to the table."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="mt-2 text-sm text-gray-500">
              {summary ? summary.length : 0} characters
            </div>
          </div>

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <Wand2 size={18} />
                AI Generated Suggestions
              </h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white border border-purple-200 rounded-lg p-3 hover:bg-purple-50 transition-colors cursor-pointer"
                    onClick={() => useSuggestion(suggestion)}
                  >
                    <p className="text-gray-700 text-sm leading-relaxed">{suggestion}</p>
                    <button className="mt-2 text-purple-600 text-xs font-medium hover:text-purple-800">
                      Use this suggestion
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-3"></div>
              <p className="text-gray-600">Generating AI-powered summary suggestions...</p>
            </div>
          )}
        </div>

        {/* Tips Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <Lightbulb size={18} />
              Writing Tips
            </h3>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                  <span className="block w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Example Section */}
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <FileText size={18} />
              Example
            </h3>
            <p className="text-sm text-green-700 leading-relaxed">
              "Experienced software engineer with 5+ years in full-stack development. 
              Proven track record of leading cross-functional teams and delivering 
              scalable solutions that increased user engagement by 40%."
            </p>
          </div>
        </div>
      </div>

      {/* Character Counter and Guidelines */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Recommended length: 200-400 characters</span>
            <span className={`font-medium ${
              summary && summary.length > 400 ? 'text-red-600' : 
              summary && summary.length > 200 ? 'text-green-600' : 'text-gray-500'
            }`}>
              Current: {summary ? summary.length : 0}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              summary && summary.length > 400 ? 'bg-red-400' : 
              summary && summary.length > 200 ? 'bg-green-400' : 'bg-gray-400'
            }`}></div>
            <span className="text-sm text-gray-600">
              {summary && summary.length > 400 ? 'Too long' : 
               summary && summary.length > 200 ? 'Good length' : 'Too short'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;