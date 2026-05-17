import React, { useContext } from 'react';
import { CandidateContext } from '../context/CandidateContext';
import { Users, Briefcase, Award, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { candidates, loading } = useContext(CandidateContext);

  // Compute Stats
  const totalCandidates = candidates.length;
  const avgExperience = totalCandidates
    ? (candidates.reduce((sum, c) => sum + c.experience, 0) / totalCandidates).toFixed(1)
    : 0;

  // Calculate skill distribution
  const skillCounts = {};
  candidates.forEach(c => {
    c.skills.forEach(skill => {
      const formattedSkill = skill.trim();
      skillCounts[formattedSkill] = (skillCounts[formattedSkill] || 0) + 1;
    });
  });

  const skillData = Object.keys(skillCounts)
    .map(key => ({ name: key, count: skillCounts[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8); // Top 8 skills

  // Calculate experience buckets
  const expBuckets = { '0-2 Yrs': 0, '3-5 Yrs': 0, '6+ Yrs': 0 };
  candidates.forEach(c => {
    if (c.experience <= 2) expBuckets['0-2 Yrs']++;
    else if (c.experience <= 5) expBuckets['3-5 Yrs']++;
    else expBuckets['6+ Yrs']++;
  });

  const expData = Object.keys(expBuckets).map(key => ({ name: key, value: expBuckets[key] }));
  const COLORS = ['#6366f1', '#10b981', '#f43f5e'];

  const stats = [
    { name: 'Total Candidates', value: totalCandidates, icon: Users, color: 'text-indigo-400 bg-indigo-950/40 border-indigo-900/30' },
    { name: 'Avg. Experience', value: `${avgExperience} Years`, icon: Briefcase, color: 'text-emerald-400 bg-emerald-950/40 border-emerald-900/30' },
    { name: 'Top Skillset', value: skillData[0]?.name || 'N/A', icon: Award, color: 'text-rose-400 bg-rose-950/40 border-rose-900/30' },
  ];

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">Recruiting Insights</h2>
        <p className="text-slate-400 mt-1">Real-time candidate metrics and intelligence overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glow-card rounded-2xl p-6 flex items-center justify-between border border-slate-800">
              <div>
                <p className="text-slate-400 text-sm font-semibold">{stat.name}</p>
                <h4 className="text-2xl font-black text-slate-100 mt-2">{stat.value}</h4>
              </div>
              <div className={`p-4 rounded-xl border ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Distribution */}
        <div className="glow-card border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-200">Top Candidate Skills</h3>
            <span className="text-xs text-brand-400 font-semibold flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> Live Distribution
            </span>
          </div>

          <div className="h-80 w-full">
            {skillData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                    itemStyle={{ color: '#6366f1' }}
                  />
                  <Bar dataKey="count" fill="url(#colorSkill)" radius={[6, 6, 0, 0]}>
                    <defs>
                      <linearGradient id="colorSkill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500 text-sm">
                Add candidates to view skill analytics.
              </div>
            )}
          </div>
        </div>

        {/* Experience Analytics */}
        <div className="glow-card border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-200">Experience Split</h3>
            <span className="text-xs text-brand-400 font-semibold">Total Profiles</span>
          </div>

          <div className="h-80 flex flex-col md:flex-row items-center justify-center gap-6">
            {totalCandidates > 0 ? (
              <>
                <div className="h-full w-full md:w-2/3">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expData}
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {expData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        itemStyle={{ color: '#f3f4f6' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-4 w-full md:w-1/3">
                  {expData.map((data, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{data.name}</p>
                        <p className="text-sm font-bold text-slate-200">{data.value} Candidates</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500 text-sm">
                Add candidates to view experience breakdown.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
