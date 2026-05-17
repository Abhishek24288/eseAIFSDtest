import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UserPlus, Users, Cpu, Sparkles } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Add Candidate', path: '/add-candidate', icon: UserPlus },
    { name: 'Candidate List', path: '/candidates', icon: Users },
    { name: 'Job Matching', path: '/matching', icon: Cpu },
    { name: 'AI Recommendations', path: '/ai-recommendations', icon: Sparkles },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="bg-gradient-to-tr from-brand-600 to-indigo-400 p-2.5 rounded-xl shadow-lg shadow-brand-500/20">
          <Sparkles className="h-6 w-6 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="font-extrabold text-lg bg-gradient-to-r from-white via-slate-100 to-brand-300 bg-clip-text text-transparent leading-none">
            GURUJI AI
          </h1>
          <span className="text-[10px] text-brand-400 font-bold tracking-widest uppercase">
            Recruiter Suite
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-500/10'
                    : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-850 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold text-slate-300">OpenRouter Active</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            AI Recommendations are powered by gpt-4o for precise talent shortlisting.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
