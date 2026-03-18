const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

/*
==========================
AI SUGGESTIONS
==========================
*/
const generateSuggestions = async (req, res) => {
  try {
    const { type, content, jobTitle, industry } = req.body;

    let prompt = "";

    switch (type) {
      case "summary":
        prompt = `Improve this resume summary:\n${content}`;
        break;

      case "experience":
        prompt = `Improve this experience with impact:\n${content}`;
        break;

      case "education":
        prompt = `Improve this education section:\n${content}`;
        break;

      case "skills":
        prompt = `Suggest better skills based on:\n${content}`;
        break;

      case "personal":
        prompt = `Improve this personal info:\n${JSON.stringify(content)}`;
        break;

      default:
        prompt = `Improve resume content`;
    }

    const completion = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    res.json({
      success: true,
      data: {
        suggestion: completion.choices[0].message.content
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "AI error" });
  }
};

/*
==========================
REAL-TIME AI SUGGESTIONS
==========================
*/
const realtimeSuggestion = async (req, res) => {
  try {
    const { text } = req.body;

    const prompt = `Improve this resume sentence in real-time:\n${text}`;

    const completion = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      max_tokens: 100
    });

    res.json({
      success: true,
      suggestion: completion.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/*
==========================
ATS SCORE
==========================
*/
const calculateATSScore = (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    const resumeText = JSON.stringify(resumeData).toLowerCase();
    const jdWords = jobDescription.toLowerCase().split(/\W+/);

    let match = 0;

    jdWords.forEach(word => {
      if (resumeText.includes(word)) match++;
    });

    const score = Math.round((match / jdWords.length) * 100);

    res.json({ success: true, score });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/*
==========================
JOB MATCHER
==========================
*/
const optimizeResume = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    const prompt = `
Compare resume and job description.
Give:
- score
- missing skills
- improvements

Resume: ${JSON.stringify(resumeData)}
JD: ${jobDescription}
`;

    const completion = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      success: true,
      data: {
        result: completion.choices[0].message.content
      }
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  generateSuggestions,
  realtimeSuggestion,
  calculateATSScore,
  optimizeResume
};