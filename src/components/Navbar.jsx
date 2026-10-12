import React from 'react';
import { Database, Home, BookOpen, GraduationCap, FlaskConical, Info, Wrench, TrendingUp, ArrowRight, Share2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenSyncModal }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'modules', label: 'Modules', icon: BookOpen },
    { id: 'syllabus', label: 'Syllabus & Curriculum', icon: GraduationCap },
    { id: 'experiments', label: 'Experiments', icon: FlaskConical },
    { id: 'about', label: 'About', icon: Info },
    { id: 'tools', label: 'Tools', icon: Wrench },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050a16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-3 shadow-xl">
      {/* Brand / Logo */}
      <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('home')}>
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
          <Database className="w-5 h-5 text-cyan-200 animate-pulse-glow" />
          <div className="absolute inset-0 rounded-xl border border-cyan-400/40 animate-ping opacity-25"></div>
        </div>
        <div>
          <h1 className="text-lg lg:text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400 font-sans">
            DATA SCIENCE
          </h1>
          <p className="text-[10px] tracking-widest text-cyan-400/90 font-semibold uppercase -mt-1">
            DIGITAL LIBRARY
          </p>
        </div>
      </div>

      {/* Top Header Navigation Pills */}
      <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-[#0b1329]/80 p-1 sm:p-1.5 rounded-2xl border border-slate-800/90 overflow-x-auto shrink-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 shrink-0">
        {onOpenSyncModal && (
          <button
            onClick={onOpenSyncModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-indigo-600/20 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-bold transition-all shadow-md shadow-cyan-500/10 cursor-pointer"
            title="Sync, Export or Share your lab data"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Sync & Export</span>
            <span className="sm:hidden">Sync</span>
          </button>
        )}

        {/* Top Right Tagline */}
        <div className="hidden xl:flex items-center space-x-2 text-xs font-medium text-slate-400 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-800/80">
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-300">Better Data</span>
          <ArrowRight className="w-3 h-3 text-cyan-500" />
          <span className="text-slate-300">Better Decisions</span>
          <ArrowRight className="w-3 h-3 text-cyan-500" />
          <span className="text-cyan-400 font-semibold">A Brighter Future</span>
        </div>
      </div>
    </header>
  );
}
