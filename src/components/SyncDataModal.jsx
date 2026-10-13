import React, { useState } from 'react';
import {
  X, Download, Upload, Copy, Check, RefreshCw, FileText,
  FlaskConical, CheckCircle2, AlertCircle, Share2, Sparkles, BookOpen
} from 'lucide-react';

export default function SyncDataModal({
  isOpen,
  onClose,
  experiments,
  modules,
  profile,
  onImportData,
  onResetToDefaults
}) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [importStatus, setImportStatus] = useState(null);

  if (!isOpen) return null;

  // Compile export payload
  const exportPayload = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    profile: profile,
    experiments: experiments,
    modules: modules.map(m => ({
      id: m.id,
      moduleNumber: m.moduleNumber,
      title: m.title,
      description: m.description,
      resourcesCount: m.resources?.length || 0,
      resources: (m.resources || []).map(r => ({
        id: r.id,
        name: r.name,
        type: r.type,
        size: r.size,
        url: r.url || null
      }))
    }))
  };

  // Download JSON backup
  const handleDownloadJson = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `ds_lab_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error('Failed to export JSON:', err);
    }
  };

  // Copy full experiments JSON to clipboard
  const handleCopyJson = () => {
    try {
      navigator.clipboard.writeText(JSON.stringify(experiments, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2500);
    } catch (_e) {
      // Fallback
    }
  };

  // Copy JavaScript snippet ready for initialData.js
  const handleCopyJsSnippet = () => {
    try {
      const codeSnippet = `export const initialExperiments = ${JSON.stringify(experiments, null, 2)};\n`;
      navigator.clipboard.writeText(codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch (_e) {
      // Fallback
    }
  };

  // Handle Import JSON file
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.experiments && Array.isArray(parsed.experiments)) {
          if (onImportData) {
            onImportData(parsed);
          }
          setImportStatus({ success: true, message: `Successfully imported ${parsed.experiments.length} experiments!` });
          setTimeout(() => setImportStatus(null), 4000);
        } else {
          setImportStatus({ success: false, message: 'Invalid JSON format: missing experiments array.' });
        }
      } catch (err) {
        setImportStatus({ success: false, message: 'Failed to parse JSON file: ' + err.message });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-[#0b1329] border border-cyan-500/30 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl shadow-cyan-950/60 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-[#0e1a38] to-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                Sync & Share Data
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  Universal Access
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Ensure all visitors see your exact experiments, PDFs, and profile
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs text-slate-300">
          
          {/* Explanation Alert */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-indigo-950/40 border border-cyan-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Why did others see different content previously?</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              When you upload PDFs or edit experiments inside your browser, the changes are stored in your device's private browser memory (<code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">localStorage</code> & <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">IndexedDB</code>).
              Browser memory is never shared over the internet with visitors opening your link.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Fixed: The 5 official module PDFs are now permanently bundled directly into the website so every visitor sees each module's own notes!</span>
            </div>
          </div>

          {/* Current Content Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <FlaskConical className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <div className="text-base font-extrabold text-white">{experiments.length}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Experiments</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <BookOpen className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <div className="text-base font-extrabold text-white">{modules.length}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Modules</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <FileText className="w-5 h-5 text-rose-400 mx-auto mb-1" />
              <div className="text-base font-extrabold text-white">5.9 MB</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Course PDF</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <div className="text-base font-extrabold text-white">Online</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Bundled Status</div>
            </div>
          </div>

          {/* Import Notification Banner */}
          {importStatus && (
            <div className={`p-3.5 rounded-xl border flex items-center space-x-2 text-xs font-semibold animate-fadeIn ${
              importStatus.success ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
            }`}>
              {importStatus.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{importStatus.message}</span>
            </div>
          )}

          {/* Actions Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Export & Backup Options
            </h4>

            {/* Action 1: Download JSON Backup */}
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download Lab Data Backup (.json)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Save all currently loaded experiments, profile info, and module configuration to a file on your computer.
                </p>
              </div>
              <button
                onClick={handleDownloadJson}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
              >
                Download JSON
              </button>
            </div>

            {/* Action 2: Copy Experiments Code for initialData.js */}
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Copy className="w-4 h-4 text-emerald-400" />
                  <span>Copy Experiments Code for Permanent Bundling</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Copies JavaScript formatted experiments. Paste this into chat to make your experiments permanent for all website visitors!
                </p>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handleCopyJsSnippet}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied Code!' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={handleCopyJson}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
                  title="Copy Raw JSON"
                >
                  {copiedJson ? 'Copied JSON!' : 'Copy JSON'}
                </button>
              </div>
            </div>

            {/* Action 3: Restore / Import Data from JSON */}
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-purple-400" />
                  <span>Import Data from File (.json)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Restore previously exported experiments or lab data from another computer or session.
                </p>
              </div>
              <label className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer text-center">
                <span>Select JSON File</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Action 4: Reload Bundled Defaults */}
            <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-300 text-xs flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>Reset & Reload Fresh Bundled Content</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Clears stale browser cache so you see the newest bundled PDFs and default experiments.
                </p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm("Reload default bundled content? This will refresh all 5 modules with their dedicated module PDFs.")) {
                    if (onResetToDefaults) onResetToDefaults();
                    onClose();
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-all shrink-0 cursor-pointer"
              >
                Reload Defaults
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            All bundled files and code will be visible to everyone when deployed.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
