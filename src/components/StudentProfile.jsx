import React from 'react';
import { User, Hash, GraduationCap, Layers, UserCheck, Quote, Edit3, ExternalLink, Camera } from 'lucide-react';
import { GithubIcon, LinkedinIcon, formatGithubUrl, formatLinkedinUrl } from './SocialIcons';

export default function StudentProfile({ profile, onEditProfile }) {
  const details = [
    { label: "Roll No", value: profile.rollNo, icon: Hash },
    { label: "Branch", value: profile.branch, icon: GraduationCap },
    { label: "Section", value: profile.section, icon: Layers },
    { label: "Assistant Professor", value: profile.assistantProfessor || profile.professor || "S.Bosubabu", icon: UserCheck }
  ];

  const githubLink = formatGithubUrl(profile.github);
  const linkedinLink = formatLinkedinUrl(profile.linkedin);

  return (
    <div className="w-full rounded-2xl glass-card border border-slate-800 p-5 lg:p-6 mb-6 shadow-xl relative overflow-hidden group/card">
      {/* Decorative accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Profile Image & Name & Details */}
        <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Student Photo */}
          <div className="relative shrink-0 group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-cyan-400/40 p-1 bg-slate-900 shadow-xl shadow-cyan-500/10 relative">
              <img
                src={profile.photo ? (profile.photo.startsWith('/') || profile.photo.startsWith('data:') || profile.photo.startsWith('http') ? profile.photo : `/${profile.photo}`) : "/sandya.jpeg"}
                alt={profile.name}
                className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
              {onEditProfile && (
                <button
                  type="button"
                  onClick={onEditProfile}
                  title="Click to edit profile"
                  className="absolute inset-1 rounded-xl bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-cyan-300 text-[10px] font-semibold transition-opacity duration-200 cursor-pointer"
                >
                  <Camera className="w-4 h-4 mb-0.5" />
                  <span>Change</span>
                </button>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-slate-950 p-1.5 rounded-lg shadow-md">
              <User className="w-4 h-4 font-bold" />
            </div>
          </div>

          {/* Student Info Details Table */}
          <div className="space-y-2.5 text-center sm:text-left flex-1 min-w-0 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2 truncate">
                <span>{profile.name}</span>
              </h3>

              {onEditProfile && (
                <button
                  type="button"
                  id="btn-edit-student-profile"
                  onClick={onEditProfile}
                  className="self-center sm:self-auto inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 border border-slate-700/80 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-300 text-xs font-semibold shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-1 text-xs sm:text-sm">
              {details.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center space-x-2 text-slate-300">
                    <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-slate-400 font-medium">{item.label}</span>
                    <span className="text-slate-500 font-bold">:</span>
                    <span className="text-white font-semibold truncate">{item.value}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Links: GitHub & LinkedIn */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 border-t border-slate-800/70">
              {githubLink ? (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all group shadow-sm"
                  title={`GitHub: ${githubLink}`}
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onEditProfile}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-dashed border-slate-700 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-300 text-xs font-medium transition-all cursor-pointer"
                  title="Click to add your GitHub profile link"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>+ Add GitHub</span>
                </button>
              )}

              {linkedinLink ? (
                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/40 hover:border-[#0077b5]/70 text-sky-300 hover:text-sky-200 text-xs font-medium transition-all group shadow-sm"
                  title={`LinkedIn: ${linkedinLink}`}
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-sky-400 group-hover:text-sky-300 transition-colors" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-sky-500/70 group-hover:text-sky-300 transition-colors" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onEditProfile}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-dashed border-slate-700 hover:border-sky-400/40 text-slate-400 hover:text-sky-300 text-xs font-medium transition-all cursor-pointer"
                  title="Click to add your LinkedIn profile link"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>+ Add LinkedIn</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Quote Card with Accent Line (Matches reference screenshot) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center bg-slate-900/60 rounded-xl p-5 border border-slate-800/80 relative">
          <Quote className="w-6 h-6 text-cyan-400/40 absolute top-3 left-3" />
          <p className="text-sm sm:text-base italic text-slate-200 text-center font-medium px-4 pt-2">
            "{profile.quote || "Small steps every day lead to big results."}"
          </p>

          {/* Glowing accent bar underneath quote */}
          <div className="mt-4 w-32 h-1.5 mx-auto rounded-full bg-slate-800 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full animate-pulse-glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

