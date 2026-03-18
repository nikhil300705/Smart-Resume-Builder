const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate AI suggestions for resume content
const generateSuggestions = async (req, res) => {
  try {
    const { type, content, jobTitle, industry } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'Type is required'
      });
    }

    let prompt = '';
    let maxTokens = 200;

    switch (type) {
      case 'summary':
        prompt = `Create a professional summary for a ${jobTitle || 'professional'} ${industry ? `in ${industry}` : ''}. 
        Make it compelling, concise (2-3 sentences), and highlight key strengths. Focus on achievements and value proposition.`;
        maxTokens = 150;
        break;
        
      case 'experience':
        prompt = `Improve this job experience description for a ${jobTitle || 'professional'}: "${content}". 
        Make it more impactful using:
        - Strong action verbs
        - Quantifiable achievements
        - Specific technologies/tools
        - Business impact
        Format as bullet points.`;
        maxTokens = 250;
        break;
        
      case 'skills':
        prompt = `Suggest 10-12 relevant skills for a ${jobTitle || 'professional'} ${industry ? `in ${industry}` : ''}. 
        Include both technical and soft skills. Format as a comma-separated list.`;
        maxTokens = 100;
        break;
        
      case 'project':
        prompt = `Improve this project description: "${content}". 
        Make it more professional and highlight:
        - Technical challenges solved
        - Technologies used
        - Impact/results
        Keep it concise but impactful.`;
        maxTokens = 200;
        break;
        
      case 'objective':
        prompt = `Create a career objective for a ${jobTitle || 'professional'} ${industry ? `in ${industry}` : ''}. 
        Make it specific, goal-oriented, and show value to employers. 1-2 sentences.`;
        maxTokens = 100;
        break;
        
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid suggestion type'
        });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer with expertise in creating compelling, ATS-friendly resume content. Always provide actionable, specific suggestions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    const suggestion = completion.choices[0].message.content.trim();

    res.json({
      success: true,
      data: {
        suggestion,
        type,
        usage: completion.usage
      }
    });

  } catch (error) {
    console.error('AI suggestion error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        success: false,
        message: 'AI service quota exceeded. Please try again later.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to generate AI suggestions'
    });
  }
};

// Optimize entire resume based on job description
const optimizeResume = async (req, res) => {
  try {
    const { resumeData, jobDescription, jobTitle } = req.body;

    if (!resumeData || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: 'Resume data and job description are required'
      });
    }

    const prompt = `
    Analyze this resume against the job description and provide optimization suggestions:
    
    RESUME DATA:
    Name: ${resumeData.personalInfo?.fullName}
    Current Summary: ${resumeData.summary}
    Experience: ${JSON.stringify(resumeData.experience)}
    Skills: ${resumeData.skills?.map(s => s.name || s).join(', ')}
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    Provide specific optimization suggestions for:
    1. Keywords to add/emphasize
    2. Skills to highlight or add
    3. Experience bullet points to improve
    4. Summary improvements
    5. Overall ATS optimization tips
    
    Format as JSON with sections: keywords, skills, experience, summary, tips
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert ATS and resume optimization specialist. Provide actionable, specific suggestions to improve resume match with job descriptions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.5,
    });

    let optimization;
    try {
      optimization = JSON.parse(completion.choices[0].message.content.trim());
    } catch (parseError) {
      // If JSON parsing fails, return as plain text
      optimization = {
        raw: completion.choices[0].message.content.trim()
      };
    }

    res.json({
      success: true,
      data: {
        optimization,
        usage: completion.usage
      }
    });

  } catch (error) {
    console.error('Resume optimization error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        success: false,
        message: 'AI service quota exceeded. Please try again later.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to optimize resume'
    });
  }
};

module.exports = {
  generateSuggestions,
  optimizeResume
};