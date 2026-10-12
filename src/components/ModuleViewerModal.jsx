import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X, BookOpen, Download, Upload, FileText, CheckCircle2,
  Trash2, Eye, Copy, Check, FileCode,
  Table as TableIcon, Image as ImageIcon,
  Maximize2, Minimize2, Edit3, Save, AlertTriangle, ExternalLink
} from 'lucide-react';
import { getStoredFile, getFileBlobUrl, processUploadedFile, deleteStoredFile } from '../utils/fileStorage';

// Helper to parse CSV for dataset viewer
function parseCSV(text, maxRows = 50) {
  if (!text) return { headers: [], rows: [], totalRows: 0 };
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [], totalRows: 0 };

  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  const dataLines = lines.slice(1);
  const rows = dataLines.slice(0, maxRows).map(line => {
    return line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
  });

  return { headers, rows, totalRows: dataLines.length };
}

// Helper to parse Jupyter Notebook JSON
function parseNotebook(rawContent) {
  if (!rawContent) return null;
  try {
    const nb = typeof rawContent === 'string' ? JSON.parse(rawContent) : rawContent;
    if (!nb.cells && !Array.isArray(nb.cells)) return null;

    return nb.cells.map((cell, idx) => {
      const source = Array.isArray(cell.source) ? cell.source.join('') : (cell.source || '');
      let outputs = [];

      if (cell.outputs && Array.isArray(cell.outputs)) {
        outputs = cell.outputs.map(out => {
          if (out.text) {
            return {
              type: 'text',
              data: Array.isArray(out.text) ? out.text.join('') : out.text
            };
          }
          if (out.data && out.data['image/png']) {
            return {
              type: 'image',
              data: `data:image/png;base64,${out.data['image/png']}`
            };
          }
          if (out.data && out.data['text/plain']) {
            return {
              type: 'text',
              data: Array.isArray(out.data['text/plain']) ? out.data['text/plain'].join('') : out.data['text/plain']
            };
          }
          if (out.traceback) {
            return {
              type: 'error',
              data: out.traceback.join('\n')
            };
          }
          return null;
        }).filter(Boolean);
      }

      return {
        id: idx,
        cell_type: cell.cell_type,
        execution_count: cell.execution_count,
        source,
        outputs
      };
    });
  } catch (err) {
    console.warn('Failed to parse notebook JSON:', err);
    return null;
  }
}

export default function ModuleViewerModal({
  module,
  initialFileId = null,
  onClose,
  onDeleteModule,
  onAddFilesToModule,
  onDeleteFileFromModule
}) {
  const [activeTab, setActiveTab] = useState('reader'); // 'reader', 'syllabus', 'notes'
  const [selectedFileId, setSelectedFileId] = useState(initialFileId || null);
  const [activeFileDetails, setActiveFileDetails] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPdfFullScreen, setIsPdfFullScreen] = useState(true);
  const [showFilesDrawer, setShowFilesDrawer] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem(`ds_lab_notes_${module?.id}`) || '';
  });
  const [notesSaved, setNotesSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const lastOpenedPdfIdRef = useRef(null);

  const files = useMemo(() => module?.resources || [], [module?.resources]);

  const targetFileMeta = useMemo(() => {
    return files.find(f => (f.id === selectedFileId || f.name === selectedFileId)) || null;
  }, [files, selectedFileId]);

  // Parse notebook if active file is .ipynb
  const notebookCells = useMemo(() => {
    if (activeFileDetails?.type === 'ipynb' && activeFileDetails?.content) {
      return parseNotebook(activeFileDetails.content);
    }
    return null;
  }, [activeFileDetails]);

  // Parse CSV if active file is .csv
  const csvData = useMemo(() => {
    if (activeFileDetails?.type === 'csv' && activeFileDetails?.content) {
      return parseCSV(activeFileDetails.content);
    }
    return null;
  }, [activeFileDetails]);

  // Set initial selected file if available
  useEffect(() => {
    if (initialFileId) {
      setSelectedFileId(initialFileId);
    } else if (files.length > 0 && !selectedFileId) {
      setSelectedFileId(files[0].id || files[0].name);
    }
  }, [files, selectedFileId, initialFileId]);

  // Load active file details and Blob URL
  useEffect(() => {
    let isCurrent = true;
    async function loadActiveFile() {
      if (!selectedFileId) {
        setActiveFileDetails(null);
        return;
      }

      const fileMeta = files.find(f => (f.id === selectedFileId || f.name === selectedFileId));
      if (!fileMeta) return;

      // Ensure valid Blob URL or static URL
      let blobUrl = fileMeta.blobUrl || fileMeta.url;
      if (!blobUrl && fileMeta.id) {
        blobUrl = await getFileBlobUrl(fileMeta.id);
      }

      // Check if text content is needed for notebooks, code, or CSV
      let content = fileMeta.content || '';
      if (!content && ['ipynb', 'py', 'csv', 'txt', 'md', 'js', 'json'].includes(fileMeta.type)) {
        const stored = await getStoredFile(fileMeta.id);
        if (stored?.content) content = stored.content;
      }

      if (isCurrent) {
        const fullDetails = {
          ...fileMeta,
          blobUrl: blobUrl || fileMeta.blobUrl,
          content
        };
        setActiveFileDetails(fullDetails);

        // When a new PDF is opened, automatically present in full screen
        if (fileMeta.type === 'pdf' && lastOpenedPdfIdRef.current !== fileMeta.id) {
          lastOpenedPdfIdRef.current = fileMeta.id;
          setIsPdfFullScreen(true);
        }
      }
    }

    loadActiveFile();
    return () => { isCurrent = false; };
  }, [selectedFileId, files]);

  // Keyboard shortcut listener for Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showFilesDrawer) {
          setShowFilesDrawer(false);
        } else if (isPdfFullScreen && (activeFileDetails?.type === 'pdf' || targetFileMeta?.type === 'pdf')) {
          setIsPdfFullScreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPdfFullScreen, activeFileDetails, targetFileMeta, showFilesDrawer, onClose]);

  if (!module) return null;

  // Handle saving student notes
  const handleSaveNotes = () => {
    try {
      localStorage.setItem(`ds_lab_notes_${module.id}`, notes);
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
    } catch (_e) {
      // Ignore
    }
  };

  // Copy code / content
  const handleCopyContent = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Upload handlers
  const handleFilesUpload = async (e) => {
    const incomingFiles = Array.from(e.target.files || []);
    if (incomingFiles.length === 0) return;

    const processedList = [];
    for (const f of incomingFiles) {
      const record = await processUploadedFile(f, module.id);
      processedList.push(record);
    }

    if (onAddFilesToModule) {
      onAddFilesToModule(module.id, processedList);
    }

    // Immediately open the newly uploaded file!
    if (processedList.length > 0) {
      const first = processedList[0];
      setSelectedFileId(first.id);
      setActiveTab('reader');
      if (first.type === 'pdf') {
        lastOpenedPdfIdRef.current = first.id;
        setIsPdfFullScreen(true);
      }
    }

    e.target.value = '';
  };

  // Drag and drop into module
  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const items = e.dataTransfer.items;
    const fileList = [];

    if (items && items.length > 0) {
      const traverseEntry = async (entry) => {
        if (entry.isFile) {
          const file = await new Promise((res) => entry.file(res));
          fileList.push(file);
        } else if (entry.isDirectory) {
          const dirReader = entry.createReader();
          const entries = await new Promise((res) => dirReader.readEntries(res));
          for (const sub of entries) {
            await traverseEntry(sub);
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
    } else if (e.dataTransfer.files) {
      fileList.push(...Array.from(e.dataTransfer.files));
    }

    if (fileList.length > 0) {
      const processedList = [];
      for (const f of fileList) {
        const record = await processUploadedFile(f, module.id);
        processedList.push(record);
      }

      if (onAddFilesToModule) {
        onAddFilesToModule(module.id, processedList);
      }

      if (processedList.length > 0) {
        const first = processedList[0];
        setSelectedFileId(first.id);
        setActiveTab('reader');
        if (first.type === 'pdf') {
          lastOpenedPdfIdRef.current = first.id;
          setIsPdfFullScreen(true);
        }
      }
    }
  };

  const handleDownloadFile = async (fileToDownload = null) => {
    const file = fileToDownload || activeFileDetails || targetFileMeta;
    if (!file) return;

    let url = file.blobUrl || file.url;
    if (!url && file.id) {
      url = await getFileBlobUrl(file.id);
    }

    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.click();
    } else {
      alert(`Preparing download for: ${file.name}`);
    }
  };

  // Open PDF in full new window
  const handleOpenPdfInNewTab = async (fileToOpen = null) => {
    const file = fileToOpen || activeFileDetails || targetFileMeta;
    if (!file) return;
    let url = file.blobUrl || file.url;
    if (!url && file.id) {
      url = await getFileBlobUrl(file.id);
    }
    if (url) {
      window.open(url, '_blank');
    }
  };

  // Get file icon helper
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-rose-400" />;
      case 'ipynb':
        return <FileCode className="w-4 h-4 text-amber-400" />;
      case 'csv':
      case 'xlsx':
        return <TableIcon className="w-4 h-4 text-emerald-400" />;
      case 'py':
      case 'js':
      case 'jsx':
      case 'sql':
      case 'html':
      case 'css':
        return <FileCode className="w-4 h-4 text-cyan-400" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'svg':
        return <ImageIcon className="w-4 h-4 text-purple-400" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const currentPdf = (activeFileDetails?.type === 'pdf' ? activeFileDetails : null) || (targetFileMeta?.type === 'pdf' ? targetFileMeta : null);
  const isViewingPdfFullScreen = Boolean(currentPdf && isPdfFullScreen);

  // If a PDF is opened in full screen, render the full-screen PDF view immediately
  if (isViewingPdfFullScreen && currentPdf) {
    return (
      <div
        className="fixed inset-0 z-50 w-screen h-screen bg-[#060b17] flex flex-col overflow-hidden animate-fadeIn"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={(e) => {
          if (e.currentTarget.contains(e.relatedTarget)) return;
          setIsDraggingOver(false);
        }}
        onDrop={handleDrop}
      >
        {/* Hidden inputs */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFilesUpload}
          accept=".pdf,.ipynb,.py,.csv,.txt,.md,.json,image/*,application/pdf"
          className="hidden"
        />
        <input
          type="file"
          webkitdirectory=""
          ref={folderInputRef}
          onChange={handleFilesUpload}
          className="hidden"
        />

        {/* Drag Overlay Feedback */}
        {isDraggingOver && (
          <div className="absolute inset-0 z-50 bg-cyan-950/90 border-4 border-dashed border-cyan-400 flex flex-col items-center justify-center pointer-events-none animate-fadeIn">
            <Upload className="w-16 h-16 text-cyan-300 animate-bounce mb-3" />
            <h3 className="text-xl font-bold text-white">Drop PDFs or files here</h3>
            <p className="text-xs text-cyan-200 mt-1">Files will be immediately opened in {module.title}</p>
          </div>
        )}

        {/* Full Screen Top Control Bar */}
        <div className="h-14 px-3 sm:px-5 bg-gradient-to-r from-slate-900 via-[#0b1429] to-slate-900 border-b border-cyan-500/20 flex items-center justify-between gap-2 shrink-0 z-20 shadow-md">
          {/* Left: Exit Fullscreen button & Document Info */}
          <div className="flex items-center space-x-3 min-w-0">
            <button
              onClick={() => setIsPdfFullScreen(false)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-bold transition-all cursor-pointer shadow-sm shrink-0"
              title="Exit full screen (Return to split view & syllabus)"
            >
              <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Exit Full Screen</span>
            </button>

            <div className="h-5 w-px bg-slate-800 hidden sm:block shrink-0" />

            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 hidden md:flex items-center justify-center text-white shrink-0 shadow-sm">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider truncate max-w-[150px] sm:max-w-xs">
                    Module {module.moduleNumber || '1'} • {module.title}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-extrabold text-white truncate max-w-[180px] sm:max-w-md">
                    {currentPdf.name}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-bold uppercase shrink-0 border border-rose-500/30">
                    PDF
                  </span>
                  {currentPdf.size && (
                    <span className="text-[10px] text-slate-400 hidden lg:inline">
                      ({currentPdf.size})
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Toggle Files Drawer */}
            <button
              onClick={() => setShowFilesDrawer(!showFilesDrawer)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                showFilesDrawer
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
              }`}
              title="Show all PDFs and materials in this module"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Files ({files.length})</span>
            </button>

            {/* Upload PDF */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600 hover:text-white text-xs font-bold transition-all cursor-pointer"
              title="Upload additional PDF or file"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>+ Upload</span>
            </button>

            {/* Open in New Tab */}
            <button
              onClick={() => handleOpenPdfInNewTab(currentPdf)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600 hover:text-white text-xs font-bold transition-all cursor-pointer"
              title="Open PDF in a new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in New Tab</span>
            </button>

            {/* Download */}
            <button
              onClick={() => handleDownloadFile(currentPdf)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 text-xs font-semibold cursor-pointer"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Download</span>
            </button>

            {/* Close Reader */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-rose-500/20 transition-colors cursor-pointer"
              title="Close Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Fullscreen PDF Viewer Frame */}
        <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-950 flex">
          {(currentPdf.blobUrl || currentPdf.url) ? (
            <iframe
              src={`${currentPdf.blobUrl || currentPdf.url}#view=FitH`}
              title={currentPdf.name}
              className="w-full h-full flex-1 border-0 bg-white"
              allow="fullscreen"
              allowFullScreen
            />
          ) : (
            <div className="m-auto text-center p-8 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
              <FileText className="w-12 h-12 text-rose-400 mx-auto animate-pulse" />
              <h4 className="text-base font-bold text-white">{currentPdf.name}</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Opening PDF in full screen...
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => handleOpenPdfInNewTab(currentPdf)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-500 shadow-lg cursor-pointer"
                >
                  Open in New Window
                </button>
              </div>
            </div>
          )}

          {/* Files Slide-over Drawer */}
          {showFilesDrawer && (
            <div className="absolute top-0 right-0 bottom-0 w-80 sm:w-96 bg-[#0a1124] border-l border-cyan-500/30 shadow-2xl z-30 flex flex-col">
              <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Module Materials ({files.length})
                  </span>
                </div>
                <button
                  onClick={() => setShowFilesDrawer(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2 border-b border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-1.5 px-3 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600 hover:text-white text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>+ Upload Another File</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                {files.map((file) => {
                  const isSelected = selectedFileId === (file.id || file.name);
                  return (
                    <div
                      key={file.id || file.name}
                      onClick={() => {
                        setSelectedFileId(file.id || file.name);
                        if (file.type !== 'pdf') {
                          setIsPdfFullScreen(false);
                        }
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between text-xs border ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-500/40'
                          : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                        <div className="shrink-0">{getFileIcon(file.type)}</div>
                        <div className="min-w-0">
                          <div className="font-semibold truncate text-white">{file.name}</div>
                          <div className="text-[10px] text-slate-500 flex items-center space-x-1.5">
                            <span>{file.size || '0 KB'}</span>
                            <span>•</span>
                            <span className="uppercase text-cyan-400 font-bold">{file.type}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadFile(file);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 cursor-pointer"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full ${
          isFullscreen ? 'h-full max-w-full rounded-none' : 'max-w-6xl h-[92vh] rounded-3xl'
        } bg-[#070d1e] border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col transition-all duration-300`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={(e) => {
          if (e.currentTarget.contains(e.relatedTarget)) return;
          setIsDraggingOver(false);
        }}
        onDrop={handleDrop}
      >
        {/* Hidden inputs */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFilesUpload}
          accept=".pdf,.ipynb,.py,.csv,.txt,.md,.json,image/*,application/pdf"
          className="hidden"
        />
        <input
          type="file"
          webkitdirectory=""
          ref={folderInputRef}
          onChange={handleFilesUpload}
          className="hidden"
        />

        {/* Drag Overlay Feedback */}
        {isDraggingOver && (
          <div className="absolute inset-0 z-50 bg-cyan-950/90 border-4 border-dashed border-cyan-400 flex flex-col items-center justify-center pointer-events-none animate-fadeIn">
            <Upload className="w-16 h-16 text-cyan-300 animate-bounce mb-3" />
            <h3 className="text-xl font-bold text-white">Drop PDFs or files here</h3>
            <p className="text-xs text-cyan-200 mt-1">Files will be immediately opened in {module.title}</p>
          </div>
        )}

        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-[#0b1429] to-slate-900 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${module.badgeColor || 'from-cyan-500 to-blue-600'} shadow-md shrink-0`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Module {module.moduleNumber || 'Courseware'}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-[11px] text-slate-400 font-semibold">{files.length} Uploaded Material(s)</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white truncate">
                {module.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Upload PDF / Files Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600 hover:text-white transition-all text-xs font-bold cursor-pointer"
              title="Upload PDF or notes to this module"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>+ Upload PDF / File</span>
            </button>

            {/* Delete Module Button */}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white transition-all text-xs font-bold cursor-pointer"
              title="Delete this entire module"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Delete Module</span>
            </button>

            {/* Fullscreen toggle */}
            <button
              onClick={() => {
                if (activeFileDetails?.type === 'pdf') {
                  setIsPdfFullScreen(true);
                } else {
                  setIsFullscreen(!isFullscreen);
                }
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title={activeFileDetails?.type === 'pdf' ? "Full Screen PDF" : (isFullscreen ? "Exit Fullscreen" : "Fullscreen Reader")}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Delete Confirmation Alert Modal */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0e172e] border border-rose-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fadeIn space-y-4">
              <div className="flex items-center space-x-3 text-rose-400">
                <AlertTriangle className="w-6 h-6" />
                <h4 className="text-lg font-bold text-white">Delete Module Confirmation</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Are you sure you want to delete <strong className="text-white">"{module.title}"</strong> and all its {files.length} uploaded file(s)?
              </p>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    if (onDeleteModule) onDeleteModule(module.id);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-lg shadow-rose-600/30 cursor-pointer"
                >
                  Confirm Delete Module
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sub-navigation tabs: Reader, Syllabus, Notes */}
        <div className="flex items-center justify-between px-6 pt-2 border-b border-slate-800 bg-slate-900/60 shrink-0">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('reader')}
              className={`px-4 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center space-x-2 cursor-pointer ${
                activeTab === 'reader'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-800/70'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Learn & Read Materials ({files.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('syllabus')}
              className={`px-4 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center space-x-2 cursor-pointer ${
                activeTab === 'syllabus'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-800/70'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Syllabus & Curriculum ({module.syllabus?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center space-x-2 cursor-pointer ${
                activeTab === 'notes'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-800/70'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>My Lab Notes</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Click any PDF or file to read immediately</span>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* TAB 1: LEARNING & READING WORKBENCH */}
          {activeTab === 'reader' && (
            <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
              {/* Left Column: File Explorer / List of PDFs & Files */}
              <div className="w-full md:w-80 lg:w-96 border-r border-slate-800/80 bg-slate-900/30 flex flex-col shrink-0">
                <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                    Uploaded PDFs & Files ({files.length})
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600 hover:text-white font-bold transition-all cursor-pointer"
                      title="Upload PDF or files"
                    >
                      + Upload
                    </button>
                    <button
                      onClick={() => folderInputRef.current?.click()}
                      className="text-[11px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                      title="Upload an entire folder"
                    >
                      + Folder
                    </button>
                  </div>
                </div>

                {/* File List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                  {files.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500 space-y-3">
                      <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                      <p>No PDFs or files uploaded yet in this module.</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                      >
                        Upload PDF or File Now
                      </button>
                    </div>
                  ) : (
                    files.map((file) => {
                      const isSelected = selectedFileId === (file.id || file.name);

                      return (
                        <div
                          key={file.id || file.name}
                          onClick={() => {
                            setSelectedFileId(file.id || file.name);
                            if (file.type === 'pdf') {
                              setIsPdfFullScreen(true);
                            }
                          }}
                          className={`group p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between text-xs border ${
                            isSelected
                              ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-500/40'
                              : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                            <div className="shrink-0">{getFileIcon(file.type)}</div>
                            <div className="min-w-0">
                              <div className="font-semibold truncate text-white group-hover:text-cyan-300">
                                {file.name}
                              </div>
                              <div className="text-[10px] text-slate-500 flex items-center space-x-1.5">
                                <span>{file.size || '0 KB'}</span>
                                <span>•</span>
                                <span className="uppercase text-cyan-400 font-bold">{file.type}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 shrink-0">
                            {file.type === 'pdf' && (
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  setSelectedFileId(file.id || file.name);
                                  let url = file.blobUrl;
                                  if (!url && file.id) url = await getFileBlobUrl(file.id);
                                  if (url) window.open(url, '_blank');
                                }}
                                className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 cursor-pointer"
                                title="Open PDF in new window"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadFile(file);
                              }}
                              className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 cursor-pointer"
                              title="Download file"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>

                            {onDeleteFileFromModule && (
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  if (window.confirm(`Delete "${file.name}" from this module?`)) {
                                    if (file.id && !file.url) await deleteStoredFile(file.id);
                                    onDeleteFileFromModule(module.id, file.id || file.name);
                                    if (selectedFileId === (file.id || file.name)) {
                                      setSelectedFileId(null);
                                    }
                                  }
                                }}
                                className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                                title="Delete file"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Drop target card in sidebar */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="m-2 p-3 rounded-xl border border-dashed border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/10 cursor-pointer text-center text-[11px] text-cyan-300 transition-colors"
                >
                  <Upload className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                  <span>Drag & Drop PDFs or files here to upload</span>
                </div>
              </div>

              {/* Right Column: Interactive Reader for PDFs and Files */}
              <div className="flex-1 flex flex-col bg-[#050a18] overflow-hidden min-w-0">
                {activeFileDetails ? (
                  <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {/* Reader Top Bar */}
                    <div className="p-3.5 border-b border-slate-800/80 bg-slate-900/50 flex items-center justify-between gap-3 shrink-0">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        {getFileIcon(activeFileDetails.type)}
                        <span className="font-bold text-sm text-white truncate">
                          {activeFileDetails.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 font-bold uppercase">
                          {activeFileDetails.type}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        {activeFileDetails.type === 'pdf' && (
                          <button
                            onClick={() => setIsPdfFullScreen(true)}
                            className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-cyan-600/30"
                            title="Open PDF in Full Screen"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Full Screen</span>
                          </button>
                        )}

                        {activeFileDetails.type === 'pdf' && (
                          <button
                            onClick={handleOpenPdfInNewTab}
                            className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                            title="Open PDF in a full browser tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Open in New Tab</span>
                          </button>
                        )}

                        {activeFileDetails.content && (
                          <button
                            onClick={() => handleCopyContent(activeFileDetails.content)}
                            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{isCopied ? 'Copied' : 'Copy'}</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDownloadFile(activeFileDetails)}
                          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>

                    {/* Reader Body by File Type */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-5 font-mono text-xs text-slate-300 flex flex-col h-full">
                      {/* 1. PDF Viewer: Native Embedded Reader */}
                      {activeFileDetails.type === 'pdf' && (
                        <div className="flex-1 w-full flex flex-col space-y-2 font-sans h-full min-h-[550px]">
                          {(activeFileDetails.blobUrl || activeFileDetails.url) ? (
                            <div className="flex-1 w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl flex flex-col min-h-[550px] h-full">
                              <iframe
                                src={`${activeFileDetails.blobUrl || activeFileDetails.url}#view=FitH`}
                                title={activeFileDetails.name}
                                className="w-full flex-1 min-h-[550px] h-full border-0 rounded-2xl bg-white"
                                allow="fullscreen"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <div className="m-auto text-center p-8 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
                              <FileText className="w-12 h-12 text-rose-400 mx-auto" />
                              <h4 className="text-sm font-bold text-white">{activeFileDetails.name}</h4>
                              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                                PDF Document ({activeFileDetails.size}) ready to read.
                              </p>
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={handleOpenPdfInNewTab}
                                  className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-500 shadow-lg cursor-pointer"
                                >
                                  Open PDF in New Window
                                </button>
                                <button
                                  onClick={() => handleDownloadFile(activeFileDetails)}
                                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 cursor-pointer"
                                >
                                  Download PDF
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 2. Jupyter Notebook (.ipynb) Reader */}
                      {activeFileDetails.type === 'ipynb' && notebookCells && (
                        <div className="space-y-4 max-w-4xl mx-auto font-sans w-full">
                          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
                            <span>Interactive Jupyter Notebook Reader</span>
                            <span className="font-bold">{notebookCells.length} Cells</span>
                          </div>

                          {notebookCells.map((cell) => (
                            <div
                              key={cell.id}
                              className={`rounded-2xl border transition-all ${
                                cell.cell_type === 'code'
                                  ? 'bg-[#0a1122] border-slate-800 shadow-md'
                                  : 'bg-slate-900/30 border-slate-800/60 p-4'
                              }`}
                            >
                              {cell.cell_type === 'code' ? (
                                <div>
                                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/80 text-[11px] text-slate-400">
                                    <span className="font-mono text-cyan-400 font-bold">
                                      In [{cell.execution_count || ' '}]:
                                    </span>
                                    <button
                                      onClick={() => handleCopyContent(cell.source)}
                                      className="hover:text-white cursor-pointer"
                                    >
                                      <Copy className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <pre className="p-4 overflow-x-auto text-xs font-mono text-cyan-100 leading-relaxed bg-[#060b17]">
                                    <code>{cell.source}</code>
                                  </pre>

                                  {cell.outputs && cell.outputs.length > 0 && (
                                    <div className="border-t border-slate-800 bg-slate-950/80 p-3.5 space-y-2">
                                      <div className="text-[10px] uppercase font-bold text-slate-500 font-mono">
                                        Out [{cell.execution_count || ' '}]:
                                      </div>
                                      {cell.outputs.map((out, outIdx) => (
                                        <div key={outIdx}>
                                          {out.type === 'image' && (
                                            <img
                                              src={out.data}
                                              alt="Notebook Plot Output"
                                              className="max-w-full rounded-xl border border-slate-800 shadow"
                                            />
                                          )}
                                          {out.type === 'text' && (
                                            <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap">
                                              {out.data}
                                            </pre>
                                          )}
                                          {out.type === 'error' && (
                                            <pre className="text-xs font-mono text-rose-400 whitespace-pre-wrap">
                                              {out.data}
                                            </pre>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="prose prose-invert max-w-none text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                                  {cell.source}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 3. CSV Dataset Viewer */}
                      {activeFileDetails.type === 'csv' && csvData && (
                        <div className="space-y-4 font-sans w-full">
                          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                            <span className="text-slate-300">
                              Showing {csvData.rows.length} of {csvData.totalRows} data rows
                            </span>
                            <span className="text-cyan-400 font-semibold font-mono">
                              {csvData.headers.length} Columns
                            </span>
                          </div>

                          <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-slate-900/90 text-cyan-300 border-b border-slate-800">
                                  <th className="p-2.5 font-bold border-r border-slate-800 w-12 text-center text-slate-500">
                                    #
                                  </th>
                                  {csvData.headers.map((h, idx) => (
                                    <th key={idx} className="p-2.5 font-bold border-r border-slate-800 whitespace-nowrap">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {csvData.rows.map((row, rIdx) => (
                                  <tr
                                    key={rIdx}
                                    className="border-b border-slate-800/60 hover:bg-slate-900/40 font-mono text-[11px]"
                                  >
                                    <td className="p-2 border-r border-slate-800 text-center text-slate-500">
                                      {rIdx + 1}
                                    </td>
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="p-2 border-r border-slate-800 whitespace-nowrap text-slate-300">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* 4. Code & Scripts Viewer (.py, .js, .sql, .html, .txt, .md) */}
                      {['py', 'js', 'jsx', 'sql', 'html', 'css', 'json', 'txt', 'md', 'r'].includes(activeFileDetails.type) && (
                        <div className="space-y-2 w-full">
                          <div className="bg-[#040814] p-4 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
                            <pre className="text-xs font-mono leading-relaxed text-cyan-200">
                              <code>
                                {activeFileDetails.content || '# No text content found or file empty'}
                              </code>
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* 5. Images Viewer (.png, .jpg, .svg) */}
                      {['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif'].includes(activeFileDetails.type) && (
                        <div className="flex flex-col items-center justify-center p-6 space-y-4 m-auto">
                          {activeFileDetails.blobUrl ? (
                            <img
                              src={activeFileDetails.blobUrl}
                              alt={activeFileDetails.name}
                              className="max-h-[600px] rounded-2xl border border-slate-800 shadow-2xl object-contain bg-slate-900/50"
                            />
                          ) : (
                            <div className="text-slate-400">Image preview not available</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Select a PDF or File to Learn & Read</h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                        Upload your lecture PDFs, lab guidebooks, or code scripts, and click any item on the left to read immediately.
                      </p>
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                      + Upload First PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SYLLABUS & CURRICULUM */}
          {activeTab === 'syllabus' && (
            <div className="flex-1 p-6 overflow-y-auto space-y-5">
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200/90 leading-relaxed flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-cyan-300">Course Scope & Objectives: </span>
                  {module.summary || module.description || "Official course module syllabus."}
                </div>
              </div>

              {module.syllabus && module.syllabus.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Prescribed Module Syllabus (Unit Topics)</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {module.syllabus.map((topic, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3 text-xs text-slate-300 hover:border-cyan-500/40 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
                  <p>No specific sub-topics entered for this custom module.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STUDENT LAB NOTES */}
          {activeTab === 'notes' && (
            <div className="flex-1 p-6 flex flex-col h-full space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Edit3 className="w-4 h-4 text-cyan-400" />
                    <span>Student Lab Notes & Study Scratchpad</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Save your personal key takeaways, equations, observations, and code notes for this module.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {notesSaved && (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1 animate-fadeIn">
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved!</span>
                    </span>
                  )}
                  <button
                    onClick={handleSaveNotes}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Notes</span>
                  </button>
                </div>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes for this module here... (e.g. Key takeaways, formula formulas, observations...)"
                className="flex-1 w-full p-4 rounded-2xl bg-[#050a18] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-none font-mono leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-400">
              Module: <strong className="text-white">{module.title}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Close Reader
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
