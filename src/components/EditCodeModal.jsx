import React, { useState, useEffect } from 'react';
import { X, Check, Code2, Terminal, RefreshCw, AlertCircle, Play } from 'lucide-react';
import { executePythonEngine } from '../utils/pythonEngine';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function EditCodeModal({
  isOpen,
  onClose,
  expId,
  subExperiment,
  onSaveCode
}) {
  const [code, setCode] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (subExperiment) {
      setCode(subExperiment.code || '');
      setGithubUrl(subExperiment.githubUrl || '');
      setConsoleOutput(subExperiment.consoleOutput || '');
      setFetchError('');
    }
  }, [subExperiment]);

  if (!isOpen || !subExperiment) return null;

  const fetchFromGithub = async () => {
    if (!githubUrl.trim()) return;
    setIsFetching(true);
    setFetchError('');

    try {
      let rawUrl = githubUrl.trim();
      if (rawUrl.includes('github.com') && !rawUrl.includes('raw.githubusercontent.com')) {
        rawUrl = rawUrl
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/blob/', '/');
      }

      const res = await fetch(rawUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Unable to fetch raw file`);

      const text = await res.text();
      setCode(text);

      const execResult = executePythonEngine(text, subExperiment.title || '', consoleOutput);
      setConsoleOutput(execResult.outputLogs);
    } catch (err) {
      setFetchError(err.message || 'Failed to fetch code from GitHub');
    } finally {
      setIsFetching(false);
    }
  };

  const handleTestRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const execResult = executePythonEngine(code, subExperiment.title || '', consoleOutput);
      setConsoleOutput(execResult.outputLogs);
      setIsRunning(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveCode(expId, subExperiment.id, code, githubUrl, consoleOutput);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0b1329] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-[#0b1329] to-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Edit Python Code & Scripts</h3>
              <p className="text-[11px] text-slate-400">
                Editing code for: <span className="text-cyan-300 font-semibold">{subExperiment.title}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 flex flex-col">
          {/* GitHub Fetch */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
              <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Import Script from GitHub URL</span>
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="https://github.com/username/repo/blob/main/program1A.py"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={fetchFromGithub}
                disabled={isFetching}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
                <span>Fetch</span>
              </button>
            </div>
            {fetchError && (
              <div className="mt-1 text-red-400 text-[11px] flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{fetchError}</span>
              </div>
            )}
          </div>

          {/* Python Code Textarea */}
          <div className="flex-1 flex flex-col min-h-[220px]">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Python Code</span>
              </label>
              <button
                type="button"
                onClick={handleTestRun}
                disabled={isRunning}
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-[11px] font-bold transition-all"
              >
                <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-pulse' : ''}`} />
                <span>{isRunning ? 'Running...' : 'Test Run Code'}</span>
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="# Enter Python code here..."
              className="w-full flex-1 min-h-[200px] bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400 resize-y"
              spellCheck="false"
            />
          </div>

          {/* Output Logs */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Output Logs / Terminal Output</span>
            </label>
            <textarea
              rows="3"
              value={consoleOutput}
              onChange={(e) => setConsoleOutput(e.target.value)}
              placeholder="Output logs..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-emerald-400 font-mono focus:outline-none focus:border-cyan-400 resize-none"
              spellCheck="false"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-800 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Save Code Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
