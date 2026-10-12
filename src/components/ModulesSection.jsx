import React, { useState, useRef } from 'react';
import {
  Database, BarChart3, Brain, Network, FileCode, ArrowRight,
  Layers, Upload, Folder, Plus, Trash2, Eye,
  FileText, AlertTriangle, BookOpen, X, RotateCcw
} from 'lucide-react';
import { processUploadedFile } from '../utils/fileStorage';
import { courseSyllabus } from '../data/initialData';

const iconMap = {
  Database: Database,
  BarChart3: BarChart3,
  Brain: Brain,
  Network: Network,
  FileCode: FileCode,
  Folder: Folder
};

export default function ModulesSection({
  modules,
  onSelectModule,
  onCreateModule,
  onDeleteModule,
  onResetModules,
  onAddFilesToModule,
  onViewSyllabus
}) {
  const [isDraggingOverPage, setIsDraggingOverPage] = useState(false);
  const [dragOverModuleId, setDragOverModuleId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState('custom');
  const [modalPendingFiles, setModalPendingFiles] = useState([]);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [activeUploadTargetModId, setActiveUploadTargetModId] = useState(null);

  const folderInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const cardFileInputRef = useRef(null);
  const modalFileInputRef = useRef(null);

  // Helper to traverse dropped items
  const extractDroppedFiles = async (dataTransfer) => {
    const items = dataTransfer.items;
    const fileList = [];
    let detectedFolderName = '';

    if (items && items.length > 0) {
      const traverseEntry = async (entry, path = '') => {
        if (entry.isFile) {
          const file = await new Promise((res) => entry.file(res));
          file._relativePath = path ? `${path}/${file.name}` : file.name;
          fileList.push(file);
        } else if (entry.isDirectory) {
          if (!detectedFolderName) {
            detectedFolderName = entry.name;
          }
          const dirReader = entry.createReader();
          const entries = await new Promise((res) => dirReader.readEntries(res));
          for (const sub of entries) {
            await traverseEntry(sub, path ? `${path}/${entry.name}` : entry.name);
          }
        }
      };

      for (let i = 0; i < items.length; i++) {
        const entry = items[i].webkitGetAsEntry?.();
        if (entry) {
          await traverseEntry(entry);
        } else if (items[i].kind === 'file') {
          const f = items[i].getAsFile();
          if (f) fileList.push(f);
        }
      }
    } else if (dataTransfer.files) {
      fileList.push(...Array.from(dataTransfer.files));
    }

    return { fileList, detectedFolderName };
  };

  // Dropping files directly onto an existing module card
  const handleCardDrop = async (e, modId) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverModuleId(null);

    const { fileList } = await extractDroppedFiles(e.dataTransfer);
    if (fileList.length === 0) return;

    const processedFiles = [];
    for (const f of fileList) {
      const record = await processUploadedFile(f, modId);
      processedFiles.push(record);
    }

    if (onAddFilesToModule) {
      onAddFilesToModule(modId, processedFiles);
    }

    // Automatically open the module and select the first dropped file
    if (processedFiles.length > 0) {
      const mod = modules.find(m => m.id === modId);
      if (mod) onSelectModule(mod, processedFiles[0].id);
    }
  };

  // Page level drop
  const handlePageDrop = async (e) => {
    e.preventDefault();
    setIsDraggingOverPage(false);

    const { fileList, detectedFolderName } = await extractDroppedFiles(e.dataTransfer);
    if (fileList.length === 0) return;

    // If modules exist and no folder name, ask or add to first module
    const targetModule = modules[0];
    if (modules.length > 0 && !detectedFolderName && targetModule) {
      const processedFiles = [];
      for (const f of fileList) {
        const record = await processUploadedFile(f, targetModule.id);
        processedFiles.push(record);
      }
      if (onAddFilesToModule) {
        onAddFilesToModule(targetModule.id, processedFiles);
      }
      if (processedFiles.length > 0) {
        onSelectModule(targetModule, processedFiles[0].id);
      }
      return;
    }

    // Create a new module from the folder
    const moduleTitle = detectedFolderName
      ? detectedFolderName.replace(/[_-]/g, ' ')
      : `Module ${modules.length + 1}: ${fileList[0].name.replace(/\.[^/.]+$/, '')}`;

    const newModuleId = `mod-${Date.now()}`;
    const processedFiles = [];
    for (const f of fileList) {
      const record = await processUploadedFile(f, newModuleId);
      processedFiles.push(record);
    }

    const newModule = {
      id: newModuleId,
      moduleNumber: modules.length + 1,
      title: moduleTitle.toUpperCase(),
      description: `Uploaded folder with ${processedFiles.length} resource(s).`,
      icon: 'Folder',
      badgeColor: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500/30',
      btnColor: 'bg-cyan-600 hover:bg-cyan-500',
      syllabus: [],
      resources: processedFiles,
      summary: `Custom uploaded module files.`
    };

    if (onCreateModule) onCreateModule(newModule);
    if (processedFiles.length > 0) {
      onSelectModule(newModule, processedFiles[0].id);
    }
  };

  // Card specific file picker
  const triggerCardUpload = (modId) => {
    setActiveUploadTargetModId(modId);
    cardFileInputRef.current?.click();
  };

  const handleCardFileInputChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0 || !activeUploadTargetModId) return;

    const modId = activeUploadTargetModId;
    const processedFiles = [];
    for (const f of files) {
      const record = await processUploadedFile(f, modId);
      processedFiles.push(record);
    }

    if (onAddFilesToModule) {
      onAddFilesToModule(modId, processedFiles);
    }

    // Open module and display the uploaded file
    const mod = modules.find(m => m.id === modId);
    if (mod && processedFiles.length > 0) {
      onSelectModule(mod, processedFiles[0].id);
    }

    e.target.value = '';
    setActiveUploadTargetModId(null);
  };

  // Folder picker
  const handleFolderInputChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const firstRel = files[0].webkitRelativePath || '';
    const folderName = firstRel.split('/')[0] || `Module ${modules.length + 1}`;

    const newModuleId = `mod-${Date.now()}`;
    const processedFiles = [];
    for (const f of files) {
      const record = await processUploadedFile(f, newModuleId);
      processedFiles.push(record);
    }

    const newModule = {
      id: newModuleId,
      moduleNumber: modules.length + 1,
      title: folderName.replace(/[_-]/g, ' ').toUpperCase(),
      description: `Imported local folder with ${processedFiles.length} file(s).`,
      icon: 'Folder',
      badgeColor: 'from-blue-600 to-indigo-600',
      borderColor: 'border-blue-500/30',
      btnColor: 'bg-blue-600 hover:bg-blue-500',
      syllabus: [],
      resources: processedFiles,
      summary: `Imported folder materials ready for reading and learning.`
    };

    if (onCreateModule) onCreateModule(newModule);
    if (processedFiles.length > 0) {
      onSelectModule(newModule, processedFiles[0].id);
    }
    e.target.value = '';
  };

  // Modal create
  const handleCreateModuleSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newModuleId = `mod-${Date.now()}`;
    const matchedUnit = courseSyllabus.find(u => u.id === selectedUnitId);

    const processedFiles = [];
    for (const f of modalPendingFiles) {
      const record = await processUploadedFile(f, newModuleId);
      processedFiles.push(record);
    }

    const newModule = {
      id: newModuleId,
      moduleNumber: modules.length + 1,
      title: newTitle.trim().toUpperCase(),
      description: newDesc.trim() || matchedUnit?.description || `Module created manually with ${processedFiles.length} file(s).`,
      icon: matchedUnit?.icon || 'Folder',
      badgeColor: matchedUnit?.badgeColor || 'from-cyan-500 to-blue-600',
      borderColor: matchedUnit?.borderColor || 'border-cyan-500/30',
      btnColor: matchedUnit?.btnColor || 'bg-cyan-600 hover:bg-cyan-500',
      syllabus: matchedUnit?.topics || [],
      resources: processedFiles,
      summary: matchedUnit?.summary || 'Custom laboratory module.'
    };

    if (onCreateModule) onCreateModule(newModule);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setSelectedUnitId('custom');
    setModalPendingFiles([]);

    onSelectModule(newModule);
  };

  return (
    <section
      className="w-full mb-8 relative"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOverPage(true);
      }}
      onDragLeave={(e) => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsDraggingOverPage(false);
      }}
      onDrop={handlePageDrop}
    >
      {/* Hidden File / Folder Inputs */}
      <input
        type="file"
        webkitdirectory=""
        ref={folderInputRef}
        onChange={handleFolderInputChange}
        className="hidden"
      />
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={(e) => {
          if (modules.length > 0) {
            handleCardDrop(e, modules[0].id);
          }
        }}
        className="hidden"
      />
      <input
        type="file"
        multiple
        ref={cardFileInputRef}
        onChange={handleCardFileInputChange}
        className="hidden"
      />

      {/* Global Drag Overlay */}
      {isDraggingOverPage && (
        <div className="fixed inset-0 z-50 bg-cyan-950/80 backdrop-blur-md border-4 border-dashed border-cyan-400 flex flex-col items-center justify-center pointer-events-none animate-fadeIn">
          <Upload className="w-20 h-20 text-cyan-300 animate-bounce mb-4" />
          <h3 className="text-2xl font-extrabold text-white">Drop PDFs or Folder to Upload</h3>
          <p className="text-sm text-cyan-200 mt-2 max-w-md text-center">
            Files will be uploaded and opened immediately for learning and reading!
          </p>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-md">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Data Science Modules
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-bold text-cyan-400">
                {modules.length} Modules
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any module to learn and read. Upload PDFs, guides, or code scripts via drag & drop.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {onViewSyllabus && (
            <button
              onClick={onViewSyllabus}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-slate-800 text-xs font-semibold transition-all shadow-sm"
              title="View Complete Academic Syllabus & Curriculum"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Course Syllabus</span>
            </button>
          )}

          <button
            onClick={() => folderInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white text-xs font-semibold transition-all"
            title="Upload an entire folder"
          >
            <Folder className="w-3.5 h-3.5 text-cyan-400" />
            <span>+ Upload Folder</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Module</span>
          </button>

          {onResetModules && (
            <button
              onClick={onResetModules}
              className="flex items-center space-x-1 px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 text-xs font-semibold transition-all"
              title="Reset to 5 standard course modules"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset 5 Modules</span>
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Alert Modal */}
      {moduleToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e172e] border border-rose-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fadeIn space-y-4">
            <div className="flex items-center space-x-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="text-lg font-bold text-white">Delete Module Confirmation</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete <strong className="text-white">"{moduleToDelete.title}"</strong> and all {moduleToDelete.resources?.length || 0} uploaded files?
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setModuleToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (onDeleteModule) onDeleteModule(moduleToDelete.id);
                  setModuleToDelete(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-lg"
              >
                Confirm Delete Module
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5 MODULE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {modules.map((mod) => {
          const IconComponent = iconMap[mod.icon] || Folder;
          const fileCount = mod.resources?.length || 0;
          const isCardTarget = dragOverModuleId === mod.id;

          return (
            <div
              key={mod.id}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragOverModuleId(mod.id);
              }}
              onDragLeave={(e) => {
                if (e.currentTarget.contains(e.relatedTarget)) return;
                setDragOverModuleId(null);
              }}
              onDrop={(e) => handleCardDrop(e, mod.id)}
              onClick={() => onSelectModule(mod)}
              className={`group relative cursor-pointer rounded-2xl glass-card border p-4 flex flex-col justify-between transition-all duration-300 ${
                isCardTarget
                  ? 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-400 shadow-xl scale-[1.02]'
                  : 'border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-950/30'
              }`}
            >
              <div>
                {/* Top Bar: Icon, Module Number & Delete Option */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${mod.badgeColor || 'from-cyan-500 to-blue-600'} shadow-md`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Module {mod.moduleNumber}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-semibold">
                        {mod.syllabus?.length || 0} Syllabus Topics
                      </span>
                    </div>
                  </div>

                  {/* Delete Module button directly on card */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModuleToDelete(mod);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete this module"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Module Title */}
                <h4 className="text-sm font-bold text-white mb-1.5 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                  {mod.title}
                </h4>

                {/* Module Description */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {mod.description || 'Courseware module.'}
                </p>

                {/* Uploaded Files Section */}
                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 mb-3 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>PDFs & Files ({fileCount})</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerCardUpload(mod.id);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 lowercase font-semibold"
                    >
                      + upload
                    </button>
                  </div>

                  {fileCount === 0 ? (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerCardUpload(mod.id);
                      }}
                      className="text-[11px] text-slate-500 italic py-2 text-center border border-dashed border-slate-800 rounded-lg hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      Drop PDFs here or click to upload
                    </div>
                  ) : (
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {mod.resources.slice(0, 3).map((res) => (
                        <div
                          key={res.id || res.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectModule(mod, res.id || res.name);
                          }}
                          className="flex items-center justify-between p-1 rounded bg-slate-800/50 hover:bg-cyan-950/40 text-[11px] text-slate-300 hover:text-cyan-200 transition-colors cursor-pointer"
                          title={`Click to open ${res.name}`}
                        >
                          <div className="flex items-center space-x-1.5 truncate">
                            <FileText className={`w-3 h-3 shrink-0 ${res.type === 'pdf' ? 'text-rose-400' : 'text-cyan-400'}`} />
                            <span className="truncate">{res.name}</span>
                          </div>
                          <span className="text-[9px] text-slate-500 shrink-0 ml-1">{res.size}</span>
                        </div>
                      ))}
                      {fileCount > 3 && (
                        <div className="text-[10px] text-cyan-400 font-semibold pt-0.5">
                          +{fileCount - 3} more files...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectModule(mod);
                  }}
                  className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md transition-all group-hover:shadow-cyan-500/25"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open to Learn & Read</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE NEW MODULE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1329] border border-cyan-500/30 rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-fadeIn space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Plus className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Create New Course Module</h4>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateModuleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Module Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Module 6: Natural Language Processing"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Overview of this module's learning goals..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Associate with Academic Curriculum Unit
                </label>
                <select
                  value={selectedUnitId}
                  onChange={(e) => {
                    setSelectedUnitId(e.target.value);
                    const unit = courseSyllabus.find(u => u.id === e.target.value);
                    if (unit && !newTitle) setNewTitle(`Unit ${unit.unit}: ${unit.title}`);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="custom">Custom Module</option>
                  {courseSyllabus.map(u => (
                    <option key={u.id} value={u.id}>
                      Unit {u.unit}: {u.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Attach Initial PDFs / Files (Optional)
                </label>
                <div
                  onClick={() => modalFileInputRef.current?.click()}
                  className="p-3 border border-dashed border-slate-700 hover:border-cyan-400 rounded-xl bg-slate-900/50 cursor-pointer text-center text-xs text-slate-400"
                >
                  <Upload className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                  <span>Choose PDFs or drag & drop</span>
                  <input
                    type="file"
                    multiple
                    ref={modalFileInputRef}
                    onChange={(e) => {
                      setModalPendingFiles(Array.from(e.target.files || []));
                    }}
                    className="hidden"
                  />
                </div>
                {modalPendingFiles.length > 0 && (
                  <div className="text-[11px] text-cyan-300 mt-1.5">
                    {modalPendingFiles.length} file(s) selected to upload.
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg"
                >
                  Create Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
