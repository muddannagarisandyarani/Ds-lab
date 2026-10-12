import React, { useState, useEffect, useRef } from 'react';
import { X, Check, User, Hash, GraduationCap, Layers, UserCheck, Quote, Camera, RotateCcw, Link2, Upload, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, formatGithubUrl, formatLinkedinUrl } from './SocialIcons';
import { initialProfile } from '../data/initialData';

export default function EditProfileModal({ isOpen, onClose, profile, onSaveProfile }) {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');
  const [assistantProfessor, setAssistantProfessor] = useState('');
  const [quote, setQuote] = useState('');
  const [photo, setPhoto] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // Sync state when modal opens or profile changes
  useEffect(() => {
    if (profile && isOpen) {
      setName(profile.name || '');
      setRollNo(profile.rollNo || '');
      setBranch(profile.branch || '');
      setSection(profile.section || '');
      setAssistantProfessor(profile.assistantProfessor || profile.professor || 'S.Bosubabu');
      setQuote(profile.quote || '');
      setPhoto(profile.photo || '/sandya.jpeg');
      setGithub(profile.github || '');
      setLinkedin(profile.linkedin || '');
      setUploadError('');
      setSavedSuccess(false);
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  // Handle local image file upload & compress via canvas for optimal local storage
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const maxDim = 320;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setPhoto(compressedDataUrl);
        } catch (_err) {
          // Fallback to raw data url if canvas fails
          setPhoto(event.target.result);
        }
      };
      img.onerror = () => {
        setUploadError('Failed to load image file.');
      };
      img.src = event.target.result;
    };
    reader.onerror = () => {
      setUploadError('Error reading file.');
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all profile details back to the default profile?')) {
      setName(initialProfile.name || 'M. Sandya Rani');
      setRollNo(initialProfile.rollNo || '24102A030063');
      setBranch(initialProfile.branch || 'Data Science');
      setSection(initialProfile.section || '1');
      setAssistantProfessor(initialProfile.assistantProfessor || initialProfile.professor || 'S.Bosubabu');
      setQuote(initialProfile.quote || 'Small steps every day lead to big results.');
      setPhoto(initialProfile.photo || '/sandya.jpeg');
      setGithub(initialProfile.github || '');
      setLinkedin(initialProfile.linkedin || '');
      setUploadError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated = {
      ...profile,
      name: name.trim(),
      rollNo: rollNo.trim(),
      branch: branch.trim(),
      section: section.trim(),
      assistantProfessor: assistantProfessor.trim(),
      professor: assistantProfessor.trim(),
      quote: quote.trim(),
      photo: photo.trim() || '/sandya.jpeg',
      github: github.trim(),
      linkedin: linkedin.trim()
    };

    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 400);
  };

  const currentPhotoSrc = photo
    ? (photo.startsWith('/') || photo.startsWith('data:') || photo.startsWith('http')
      ? photo
      : `/${photo}`)
    : '/sandya.jpeg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0b1329] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-[#0b1329] to-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Edit Student Profile</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Update personal, academic details, and social portfolio links
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* 1. Photo Avatar Section */}
          <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800/80">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Profile Photo & Avatar
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Photo Preview */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/50 p-1 bg-slate-950 shadow-lg shadow-cyan-500/10">
                  <img
                    src={currentPhotoSrc}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload from computer"
                  className="absolute -bottom-1 -right-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-1.5 rounded-xl shadow-md transition-transform hover:scale-110 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 font-bold" />
                </button>
              </div>

              {/* Upload & Path Controls */}
              <div className="space-y-2 flex-1 w-full text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhoto('/sandya.jpeg')}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-all cursor-pointer"
                  >
                    <span>Default (/sandya.jpeg)</span>
                  </button>
                </div>

                <div className="pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-slate-400 shrink-0">Photo Path / URL:</span>
                    <input
                      type="text"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      placeholder="/sandya.jpeg or https://..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {uploadError && (
                  <p className="text-[11px] text-rose-400 flex items-center justify-center sm:justify-start gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{uploadError}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 2. Personal & Academic Details (2-Column Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. M. Sandya Rani"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Roll Number *
              </label>
              <input
                type="text"
                required
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="e.g. 24102A030063"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Branch / Specialization
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="e.g. Data Science"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Section
              </label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="e.g. 1"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* 3. Faculty Supervisor */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Assistant Professor / Faculty Guide
            </label>
            <input
              type="text"
              value={assistantProfessor}
              onChange={(e) => setAssistantProfessor(e.target.value)}
              placeholder="e.g. S.Bosubabu"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* 4. Social & Professional Links (GitHub & LinkedIn) */}
          <div className="space-y-3 bg-slate-900/40 rounded-2xl p-4 border border-slate-800/80">
            <div className="flex items-center space-x-2 pb-1 border-b border-slate-800/60">
              <Link2 className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Social & Professional Links
              </h4>
            </div>

            {/* GitHub Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
                  <span>GitHub Profile Link / Username</span>
                </span>
                {github && (
                  <span className="text-[10px] text-cyan-400 font-mono lowercase">
                    {formatGithubUrl(github)}
                  </span>
                )}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-400 pointer-events-none">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="e.g. Rohith13012007 or https://github.com/Rohith13012007"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Enter your GitHub handle or full profile link. Displays as a clickable badge on your profile.
              </p>
            </div>

            {/* LinkedIn Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>LinkedIn Profile Link / Username</span>
                </span>
                {linkedin && (
                  <span className="text-[10px] text-sky-400 font-mono lowercase truncate max-w-[220px]">
                    {formatLinkedinUrl(linkedin)}
                  </span>
                )}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-sky-400 pointer-events-none">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="e.g. in/username or https://www.linkedin.com/in/username"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Enter your LinkedIn custom profile URL or handle. Displays as an interactive badge on your profile.
              </p>
            </div>
          </div>

          {/* 5. Personal Quote / Bio */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personal Quote / Mission Statement</span>
            </label>
            <textarea
              rows="2"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="e.g. Small steps every day lead to big results."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 shrink-0">
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                id="btn-save-profile"
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{savedSuccess ? 'Saved!' : 'Save Profile'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
