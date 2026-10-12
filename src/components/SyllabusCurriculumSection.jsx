import React, { useState } from 'react';
import {
  BookOpen, CheckCircle2, Layers, Sparkles, ChevronDown, ChevronUp,
  Cpu, Terminal, FolderPlus, Search
} from 'lucide-react';
import { courseSyllabus } from '../data/initialData';

export default function SyllabusCurriculumSection({ onCreateModuleFromUnit }) {
  const [expandedUnit, setExpandedUnit] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSyllabus = courseSyllabus.filter((unit) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesTitle = unit.title.toLowerCase().includes(q);
    const matchesDesc = unit.description.toLowerCase().includes(q);
    const matchesTopics = unit.topics.some(t => t.toLowerCase().includes(q));
    const matchesTools = unit.tools?.some(tool => tool.toLowerCase().includes(q));
    return matchesTitle || matchesDesc || matchesTopics || matchesTools;
  });

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-r from-[#0b1329] via-[#091530] to-[#070e20] p-6 lg:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Official Courseware Reference</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Data Science Laboratory Syllabus & Curriculum
            </h2>
            <p className="text-xs lg:text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
              Complete academic curriculum covering 5 core units: from foundational data ingestion and cleaning
              to statistical modeling, decision trees, neural reasoning, and predictive time-series forecasting.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl font-extrabold text-cyan-400">5</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Curriculum Units</div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl font-extrabold text-emerald-400">30</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Core Topics</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-6 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search syllabus topics, algorithms, or tools..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Units List Accordion */}
      <div className="space-y-4">
        {filteredSyllabus.map((unit) => {
          const isExpanded = expandedUnit === unit.unit;

          return (
            <div
              key={unit.unit}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'border-cyan-500/40 bg-[#0a1224] shadow-xl shadow-cyan-950/20'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              {/* Unit Card Header */}
              <div
                onClick={() => setExpandedUnit(isExpanded ? null : unit.unit)}
                className="p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${unit.badgeColor} shadow-lg shrink-0`}>
                    <Layers className="w-6 h-6" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400">
                        Unit {unit.unit}
                      </span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400 font-medium">{unit.topics.length} Syllabus Topics</span>
                    </div>
                    <h3 className="text-base lg:text-lg font-bold text-white truncate mt-0.5">
                      {unit.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0 ml-4">
                  {onCreateModuleFromUnit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCreateModuleFromUnit(unit);
                      }}
                      className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600 hover:text-white transition-all"
                      title="Create an empty module pre-filled with this Unit's syllabus"
                    >
                      <FolderPlus className="w-3.5 h-3.5" />
                      <span>Create Module</span>
                    </button>
                  )}

                  <div className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-5 animate-fadeIn">
                  {/* Overview summary */}
                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200/90 leading-relaxed flex items-start space-x-3">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cyan-300">Curriculum Scope: </strong>
                      {unit.summary}
                    </div>
                  </div>

                  {/* Topics Grid */}
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3 flex items-center space-x-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span>Prescribed Syllabus Topics</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {unit.topics.map((topic, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2.5 text-xs text-slate-300 hover:border-cyan-500/30 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  {unit.outcomes && (
                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center space-x-2">
                        <Cpu className="w-4 h-4 text-emerald-400" />
                        <span>Laboratory Learning Outcomes</span>
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400">
                        {unit.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5"></span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommended Tools & Libraries */}
                  {unit.tools && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                        Core Tech Stack:
                      </span>
                      {unit.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] font-semibold text-cyan-300 border border-slate-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Laboratory Reference & Textbook Note */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          <span className="font-bold text-white">Academic References: </span>
          Python for Data Analysis (Wes McKinney), Hands-On Machine Learning with Scikit-Learn (Aurélien Géron), Introduction to Data Mining (Tan, Steinbach, Kumar).
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-[11px]">
            Academic Year 2026-2027
          </span>
        </div>
      </div>
    </div>
  );
}
