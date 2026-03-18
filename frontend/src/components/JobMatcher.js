import React, { useState } from "react";

const JobMatcher = ({ formData }) => {
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/ai/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          resumeData: formData,
          jobDescription: jobDesc
        })
      });

      const data = await res.json();

      if (data.success) {
        setResult(data.data.result);
      }

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-2">Job Matcher</h3>

      <textarea
        placeholder="Paste job description..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={handleMatch}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Match Resume"}
      </button>

      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
};

export default JobMatcher;