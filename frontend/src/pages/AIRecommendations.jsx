import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, BrainCircuit, Play, CheckCircle, XCircle, FileText, ChevronRight } from 'lucide-react';

const AIRecommendations = () => {
  const [requiredInput, setRequiredInput] = useState('');
  const [preferredInput, setPreferredInput] = useState('');
  const [minExperience, setMinExperience] = useState(2);
  const [jobDescription, setJobDescription] = useState('');
  
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [preferredSkills, setPreferredSkills] = useState([]);

  const [loading, setLoading] = useState(false);
  const [aiReport, setAiReport] = useState(null);
  const [error, setError] = useState('');

  const handleRequiredAdd = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const val = requiredInput.trim();
      if (val && !requiredSkills.includes(val)) {
        setRequiredSkills(prev => [...prev, val]);
      }
      setRequiredInput('');
    }
  };

  const handlePreferredAdd = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const val = preferredInput.trim();
      if (val && !preferredSkills.includes(val)) {
        setPreferredSkills(prev => [...prev, val]);
      }
      setPreferredInput('');
    }
  };

  const removeRequired = (skill) => setRequiredSkills(prev => prev.filter(s => s !== skill));
  const removePreferred = (skill) => setPreferredSkills(prev => prev.filter(s => s !== skill));

  const triggerAIShortlist = async (e) => {
    e.preventDefault();
    setError('');
    
    if (requiredSkills.length === 0) {
      setError('Please specify at least one required skill tag.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://eseaifsdtest.onrender.com/api/ai/shortlist', {
        requiredSkills,
        preferredSkills,
        minExperience,
        jobDescription
      });
      setAiReport(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || 
        'Failed to generate AI recommendations. Please check if your OpenRouter API key is configured.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-brand-400 animate-pulse" /> AI Agent Core
        </h2>
        <p className="text-slate-400 mt-1">Leverage OpenRouter intelligence to review portfolios beyond exact keywords.</p>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-900/50 p-4 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Configuration & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Job Requirements Form */}
        <div className="glow-card border border-slate-800 rounded-3xl p-6 lg:col-span-1 space-y-6">
          <h3 className="font-bold text-slate-200 text-base border-b border-slate-800 pb-3 flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-brand-500" /> Profiler Settings
          </h3>

          {/* Required Skills */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Required Skills *</label>
            <input
              type="text"
              placeholder="React, Node.js..."
              value={requiredInput}
              onChange={e => setRequiredInput(e.target.value)}
              onKeyDown={handleRequiredAdd}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 w-full placeholder:text-slate-650"
            />
            {requiredSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {requiredSkills.map((s, i) => (
                  <span key={i} className="bg-brand-950/40 text-brand-300 border border-brand-900/30 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                    {s} <button type="button" onClick={() => removeRequired(s)} className="hover:text-white">&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Preferred Skills */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred Skills</label>
            <input
              type="text"
              placeholder="e.g. MongoDB..."
              value={preferredInput}
              onChange={e => setPreferredInput(e.target.value)}
              onKeyDown={handlePreferredAdd}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 w-full placeholder:text-slate-650"
            />
            {preferredSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {preferredSkills.map((s, i) => (
                  <span key={i} className="bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                    {s} <button type="button" onClick={() => removePreferred(s)} className="hover:text-white">&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Experience slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Min Experience</label>
              <span className="text-xs font-bold text-brand-400">{minExperience} Years</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={minExperience}
              onChange={e => setMinExperience(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500 focus:outline-none mt-2"
            />
          </div>

          {/* Job Description Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Job Description</label>
            <textarea
              rows="4"
              placeholder="Describe candidate expectations, duties, and corporate setting..."
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 w-full placeholder:text-slate-650 resize-none"
            />
          </div>

          <button
            onClick={triggerAIShortlist}
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/10 transition-all text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Play className="h-4.5 w-4.5 fill-white" /> Compute AI Ranking
              </>
            )}
          </button>
        </div>

        {/* AI Recommendations Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="glow-card border border-slate-850 rounded-3xl p-16 text-center h-full flex flex-col items-center justify-center min-h-[450px]">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-brand-500/20 blur-xl animate-pulse" />
                <BrainCircuit className="h-16 w-16 text-brand-400 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <h4 className="text-slate-200 font-bold text-lg animate-pulse">Running Neural Ranking...</h4>
              <p className="text-slate-550 text-sm mt-2 max-w-sm">
                OpenRouter AI Agent is evaluating experience metrics, biographies, and skillsets. This might take a few seconds.
              </p>
            </div>
          ) : aiReport === null ? (
            <div className="glow-card border border-slate-850 rounded-3xl p-16 text-center h-full flex flex-col items-center justify-center min-h-[450px]">
              <BrainCircuit className="h-12 w-12 text-slate-750 mb-4" />
              <h4 className="text-slate-400 font-bold text-lg">AI Profiler Inactive</h4>
              <p className="text-slate-550 text-sm mt-1 max-w-md">
                Configure your job specification parameters on the left and click "Compute AI Ranking" to let OpenRouter construct a comprehensive shortlisting report.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="glow-card border border-brand-900/30 rounded-3xl p-6 bg-gradient-to-tr from-brand-950/10 via-slate-900/30 to-purple-950/10 glow-indigo">
                <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-brand-400" /> Executive AI Summary
                </h3>
                <p className="text-sm text-slate-350 leading-relaxed italic">{aiReport.aiExplanation}</p>
              </div>

              {/* Ranked Grid */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-200 text-base px-2">AI Rank Recommendation</h3>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {aiReport.ranking && aiReport.ranking.map((profile, i) => (
                    <div key={i} className="glow-card border border-slate-800/80 rounded-2xl p-5 space-y-4">
                      {/* Top Bar */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-brand-950/60 border border-brand-900/50 rounded-lg flex items-center justify-center font-bold text-brand-400 text-sm">
                            {profile.rank || i + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-200">{profile.name}</h4>
                            <span className="text-[10px] text-slate-500 font-medium">Rank {profile.rank} Candidates</span>
                          </div>
                        </div>

                        {/* Fit Score Progress Bar */}
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-xs font-extrabold text-brand-400">{profile.fitScore}% Fit</span>
                          <div className="w-24 h-1.5 bg-slate-850 rounded-full overflow-hidden border border-slate-800">
                            <div className="bg-brand-500 h-full rounded-full" style={{ width: `${profile.fitScore}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* AI Reasoning */}
                      <p className="text-xs text-slate-400 leading-relaxed border-l-2 border-brand-900/60 pl-3">
                        {profile.explanation}
                      </p>

                      {/* Strengths & Weaknesses Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        {/* Strengths */}
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5 mb-1.5">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Key Strengths
                          </span>
                          <ul className="space-y-1">
                            {profile.strengths && profile.strengths.map((str, idx) => (
                              <li key={idx} className="text-[11px] text-slate-350 flex items-center gap-1.5">
                                <ChevronRight className="h-3 w-3 text-emerald-500" /> {str}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Weaknesses */}
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5 mb-1.5">
                            <XCircle className="h-3.5 w-3.5 text-rose-500" /> Potential Gaps
                          </span>
                          <ul className="space-y-1">
                            {profile.weaknesses && profile.weaknesses.map((wk, idx) => (
                              <li key={idx} className="text-[11px] text-slate-350 flex items-center gap-1.5">
                                <ChevronRight className="h-3 w-3 text-rose-500" /> {wk}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
