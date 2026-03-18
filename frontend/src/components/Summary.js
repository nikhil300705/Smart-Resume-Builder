import React, { useState, useEffect } from 'react';
import { FileText, Lightbulb, Wand2 } from 'lucide-react';

const Summary = ({ summary, setSummary }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [liveSuggestion, setLiveSuggestion] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  // =========================
  // HANDLE INPUT (REAL-TIME AI)
  // =========================
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSummary(value);

    // clear previous timeout
    if (typingTimeout) clearTimeout(typingTimeout);

    // debounce API call (important 🔥)
    const timeout = setTimeout(async () => {
      if (value.length < 20) return;

      try {
        const response = await fetch("http://localhost:5001/api/ai/realtime", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: value })
        });

        const data = await response.json();

        if (data.success) {
          setLiveSuggestion(data.suggestion);
        }

      } catch (err) {
        console.log("Realtime error:", err);
      }
    }, 800); // delay

    setTypingTimeout(timeout);
  };

  // =========================
  // AI GENERATE BUTTON
  // =========================
  const generateAISummary = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch("http://localhost:5001/api/ai/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "summary",
          content: summary,
          jobTitle: "Software Engineer",
          industry: "Technology"
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuggestions([data.data.suggestion]);
      }

    } catch (error) {
      console.error("AI Error:", error);
    }

    setIsGenerating(false);
  };

  // =========================
  // APPLY SUGGESTION
  // =========================
  const useSuggestion = (text) => {
    setSummary(text);
    setSuggestions([]);
    setLiveSuggestion("");
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

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Professional Summary
        </h2>

        <button
          onClick={generateAISummary}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
        >
          <Wand2 size={20} />
          {isGenerating ? 'Generating...' : 'AI Generate'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2">

          {/* TEXTAREA */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <label className="text-sm font-medium text-gray-700">
              Professional Summary
            </label>

            <textarea
              value={summary || ''}
              onChange={handleInputChange}
              rows={6}
              className="w-full mt-2 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-sm text-gray-500 mt-1">
              {summary?.length || 0} characters
            </p>
          </div>

          {/* 🔥 REAL-TIME AI */}
          {liveSuggestion && (
            <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded">
              <h4 className="font-semibold text-green-800 mb-2">
                ⚡ Live AI Suggestion
              </h4>

              <p className="text-sm text-gray-700">
                {liveSuggestion}
              </p>

              <button
                onClick={() => useSuggestion(liveSuggestion)}
                className="mt-2 text-green-600 text-sm font-medium"
              >
                Use this
              </button>
            </div>
          )}

          {/* AI BUTTON RESULTS */}
          {suggestions.length > 0 && (
            <div className="mt-4 bg-purple-50 border p-4 rounded">
              <h4 className="font-semibold text-purple-800 mb-2">
                AI Suggestions
              </h4>

              {suggestions.map((s, i) => (
                <div key={i} className="mb-3">
                  <p className="text-sm">{s}</p>
                  <button
                    onClick={() => useSuggestion(s)}
                    className="text-purple-600 text-sm mt-1"
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* LOADING */}
          {isGenerating && (
            <p className="mt-3 text-gray-500">
              Generating AI summary...
            </p>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div>

          <div className="bg-blue-50 p-4 rounded border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Lightbulb size={18} /> Tips
            </h3>

            <ul className="text-sm space-y-2">
              {tips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 bg-green-50 p-4 rounded border">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText size={18} /> Example
            </h3>

            <p className="text-sm mt-2">
              Experienced software engineer with 5+ years in full-stack development.
              Proven track record of delivering scalable solutions.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Summary;