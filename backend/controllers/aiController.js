const Candidate = require('../models/Candidate');
const axios = require('axios');

exports.getAIShortlist = async (req, res) => {
  try {
    const { requiredSkills = [], preferredSkills = [], minExperience = 0, jobDescription = "" } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'OpenRouter API key is not configured.' });
    }

    const candidates = await Candidate.find();

    if (candidates.length === 0) {
      return res.status(200).json({
        topCandidates: [],
        aiExplanation: "No candidates currently in the database to evaluate.",
        ranking: []
      });
    }

    // Prepare prompt
    const jobRequirements = {
      requiredSkills,
      preferredSkills,
      minExperience,
      jobDescription
    };

    const prompt = `
Job Requirements:
- Required Skills: ${requiredSkills.join(', ')}
- Preferred Skills: ${preferredSkills.join(', ')}
- Experience: ${minExperience}+ years
- Job Description: ${jobDescription}

Candidates List:
${JSON.stringify(candidates.map(c => ({
  id: c._id,
  name: c.name,
  skills: c.skills,
  experience: c.experience,
  bio: c.bio
})))}

Tasks:
1. Rank candidates from best to worst based on fit, experience, skills, and bio.
2. Explain why each candidate fits or doesn't fit.
3. Suggest the top 3 candidates.
4. Mention their key strengths and weaknesses.

IMPORTANT: Return the response in raw JSON format matching this schema exactly:
{
  "topCandidates": ["Candidate ID 1", "Candidate ID 2"],
  "aiExplanation": "A summary of the overall analysis...",
  "ranking": [
    {
      "candidateId": "Candidate ID",
      "name": "Candidate Name",
      "rank": 1,
      "fitScore": 95, 
      "explanation": "Why they fit...",
      "strengths": ["Strength 1"],
      "weaknesses": ["Weakness 1"]
    }
  ]
}
Do NOT wrap the output in markdown code blocks like \`\`\`json. Return pure JSON.
`;

    const apiKey = process.env.OPENROUTER_API_KEY;
    const isOpenAI = apiKey.startsWith('sk-proj-');

    const apiEndpoint = isOpenAI 
      ? 'https://api.openai.com/v1/chat/completions'
      : 'https://openrouter.ai/api/v1/chat/completions';

    const requestBody = {
      model: isOpenAI ? 'gpt-4o' : 'openai/gpt-4o',
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    };

    const headers = {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    };

    if (!isOpenAI) {
      headers["HTTP-Referer"] = "https://github.com/candidate-shortlister";
      headers["X-Title"] = "Candidate Profile Shortlisting System";
    }

    console.log(`🤖 Deployed AI Core on endpoint: ${apiEndpoint} using model: ${requestBody.model}`);

    // Make request to AI service
    const response = await axios.post(apiEndpoint, requestBody, { headers });

    let aiResultText = response.data.choices[0].message.content;

    // Clean up potential markdown code block wraps
    aiResultText = aiResultText.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();

    const parsedResult = JSON.parse(aiResultText);
    res.status(200).json(parsedResult);

  } catch (error) {
    console.error("OpenRouter AI Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.message, details: error.response ? error.response.data : null });
  }
};
