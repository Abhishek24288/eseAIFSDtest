import React from 'react';
import { Bell, Search, Globe, ChevronDown } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-20 bg-slate-900/60 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4 bg-slate-850/80 border border-slate-800 rounded-xl px-4 py-2 w-96">
        <Search className="h-4.5 w-4.5 text-slate-400" />
        <input
          type="text"
          placeholder="Quick search across candidates..."
          className="bg-transparent text-slate-200 text-sm focus:outline-none w-full placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-brand-500 rounded-full" />
        </button>

        <div className="h-8 w-px bg-slate-800" />

        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-brand-600 to-indigo-500 h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md text-white">
            HR
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-200 leading-tight">Abhishek Guruji</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lead Recruiter</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-200 transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
