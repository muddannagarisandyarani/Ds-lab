import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import ToolsSection from './components/ToolsSection';
import WelcomeHero from './components/WelcomeHero';
import StudentProfile from './components/StudentProfile';
import ModulesSection from './components/ModulesSection';
import SyllabusCurriculumSection from './components/SyllabusCurriculumSection';
import ExperimentsSection from './components/ExperimentsSection';
import ModuleViewerModal from './components/ModuleViewerModal';
import AddExperimentModal from './components/AddExperimentModal';
import AddSubExperimentModal from './components/AddSubExperimentModal';
import EditProfileModal from './components/EditProfileModal';
import AboutPage from './components/AboutPage';
import SyncDataModal from './components/SyncDataModal';

import { initialProfile, initialModules, initialExperiments } from './data/initialData';
import { deleteStoredFilesByModule } from './utils/fileStorage';
import {
  fetchExperimentsApi,
  createExperimentApi,
  updateExperimentApi,
  deleteExperimentApi,
  deleteSubExperimentApi,
  migrateLocalExperimentsApi
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isOffline, setIsOffline] = useState(false);
  const [apiNotice, setApiNotice] = useState('');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Persistent student profile with edit capability
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('ds_lab_profile');
      const parsed = saved ? JSON.parse(saved) : initialProfile;
      return {
        ...initialProfile,
        ...parsed,
        assistantProfessor: parsed.assistantProfessor || parsed.professor || initialProfile.assistantProfessor,
        professor: parsed.professor || parsed.assistantProfessor || initialProfile.professor,
        photo: parsed.photo || initialProfile.photo,
        github: (parsed.github && parsed.github.trim() !== '' && parsed.github.startsWith('http')) ? parsed.github : initialProfile.github,
        linkedin: (parsed.linkedin && parsed.linkedin.trim() !== '' && parsed.linkedin.startsWith('http')) ? parsed.linkedin : initialProfile.linkedin
      };
    } catch (_err) {
      return initialProfile;
    }
  });

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    try {
      localStorage.setItem('ds_lab_profile', JSON.stringify(updatedProfile));
    } catch (_err) {
      // Ignore
    }
  };

  // Track deleted module IDs in localStorage
  const getDeletedModuleIds = () => {
    try {
      const deletedStr = localStorage.getItem('ds_lab_deleted_module_ids');
      return deletedStr ? JSON.parse(deletedStr) : [];
    } catch (_err) {
      return [];
    }
  };

  // Modules State: 5 Standard modules with bundled course materials intact + user additions
  const [modules, setModules] = useState(() => {
    try {
      const deletedIds = getDeletedModuleIds();
      // Remove deprecated cache versions
      try {
        localStorage.removeItem('ds_lab_modules_v11');
      } catch (_e) {}

      const saved = localStorage.getItem('ds_lab_modules_v12');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = initialModules.map(initMod => {
            const found = parsed.find(p => p.id === initMod.id);
            if (found) {
              const bundledRes = initMod.resources || [];
              const userRes = (found.resources || []).filter(
                r => !bundledRes.some(br => (br.url && br.url === r.url) || br.name === r.name) &&
                     !r.url?.includes('DSModules.pdf') &&
                     !r.name?.includes('DSModules') &&
                     !r.id?.startsWith('pdf-ds-unit-')
              );
              return {
                ...initMod,
                ...found,
                syllabus: initMod.syllabus,
                resources: [...bundledRes, ...userRes]
              };
            }
            return initMod;
          });

          const customMods = parsed.filter(p => !initialModules.some(im => im.id === p.id));
          return [...merged, ...customMods].filter(m => !deletedIds.includes(m.id));
        }
      }
    } catch (err) {
      console.warn("Error initializing modules from cache:", err);
    }
    return initialModules;
  });

  // Local fallback / cache getter for experiments
  const getMergedExperiments = useCallback(() => {
    try {
      const deletedStr = localStorage.getItem('ds_lab_deleted_ids');
      const deletedIds = deletedStr ? JSON.parse(deletedStr) : [];

      // Check versioned cache (v3 includes all 7 experiments & 23 sub-experiments)
      const savedStr = localStorage.getItem('ds_lab_experiments_v3');
      if (!savedStr) {
        // Clear deprecated legacy caches to avoid stale experiments
        try {
          localStorage.removeItem('ds_lab_experiments');
          localStorage.removeItem('ds_lab_experiments_v2');
        } catch (_e) {}
        return initialExperiments.filter(e => !deletedIds.includes(e.id));
      }

      const saved = JSON.parse(savedStr);
      if (!Array.isArray(saved) || saved.length < 7) {
        return initialExperiments.filter(e => !deletedIds.includes(e.id));
      }

      const mergedMap = new Map();

      // Start with initialExperiments so all 7 standard experiments exist
      initialExperiments.forEach(initExp => {
        if (!deletedIds.includes(initExp.id)) {
          mergedMap.set(initExp.id, initExp);
        }
      });

      // Overlay saved experiments & custom additions
      saved.forEach(exp => {
        if (!deletedIds.includes(exp.id)) {
          if (!mergedMap.has(exp.id)) {
            mergedMap.set(exp.id, exp);
          } else {
            const existingExp = mergedMap.get(exp.id);
            const subMap = new Map();
            (existingExp.subExperiments || []).forEach(sub => subMap.set(sub.id, sub));
            (exp.subExperiments || []).forEach(sub => {
              const origSub = subMap.get(sub.id);
              subMap.set(sub.id, {
                ...origSub,
                ...sub,
                githubUrl: origSub?.githubUrl || sub.githubUrl,
                plots: (origSub?.plots && origSub.plots.length > 0) ? origSub.plots : (sub.plots || [])
              });
            });

            mergedMap.set(exp.id, {
              ...existingExp,
              ...exp,
              subExperiments: Array.from(subMap.values())
            });
          }
        }
      });

      return Array.from(mergedMap.values());
    } catch (err) {
      console.warn("Error loading experiments cache:", err);
      return initialExperiments;
    }
  }, []);

  const [experiments, setExperiments] = useState(() => getMergedExperiments());

  // Modal states
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedFileIdForModal, setSelectedFileIdForModal] = useState(null);
  const [isAddExpModalOpen, setIsAddExpModalOpen] = useState(false);
  const [isAddSubExpModalOpen, setIsAddSubExpModalOpen] = useState(false);
  const [targetExpForSub, setTargetExpForSub] = useState(null);

  // Derive active selected module from modules state so it's always up-to-date
  const selectedModule = useMemo(() => {
    if (!selectedModuleId) return null;
    return modules.find(m => m.id === selectedModuleId) || null;
  }, [selectedModuleId, modules]);

  // Sync state to LocalStorage safely (never crashing on quota limits)
  useEffect(() => {
    try {
      localStorage.setItem('ds_lab_profile', JSON.stringify(profile));
    } catch (_err) {
      // Ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      // Strip heavy payloads before saving to localStorage
      const safeModules = modules.map(mod => ({
        ...mod,
        resources: (mod.resources || []).map(r => ({
          id: r.id,
          moduleId: r.moduleId || mod.id,
          name: r.name,
          type: r.type,
          size: r.size,
          rawSize: r.rawSize,
          date: r.date,
          url: r.url || null
        }))
      }));
      localStorage.setItem('ds_lab_modules_v12', JSON.stringify(safeModules));
    } catch (err) {
      console.warn('localStorage save warning (quota protected):', err);
    }
  }, [modules]);

  useEffect(() => {
    try {
      localStorage.setItem('ds_lab_experiments_v3', JSON.stringify(experiments));
    } catch (_err) {
      // Ignore
    }
  }, [experiments]);

  // Fetch experiments from backend API on mount
  const loadExperimentsFromBackend = useCallback(async () => {
    try {
      const data = await fetchExperimentsApi();
      if (Array.isArray(data) && data.length > 0) {
        setExperiments(data);
        try {
          localStorage.setItem('ds_lab_experiments_v3', JSON.stringify(data));
        } catch (_e) {
          // Ignore
        }
        setIsOffline(false);
        setApiNotice('');

        const migrationDone = localStorage.getItem('ds_lab_migration_completed');
        if (!migrationDone) {
          const savedStr = localStorage.getItem('ds_lab_experiments');
          if (savedStr) {
            const localSaved = JSON.parse(savedStr);
            const customItems = localSaved.filter(e => e.id && !e.id.startsWith('exp-1') && !e.id.startsWith('exp-2'));
            if (customItems.length > 0) {
              await migrateLocalExperimentsApi(customItems).catch(() => {});
            }
          }
          localStorage.setItem('ds_lab_migration_completed', 'true');
        }
      }
    } catch (err) {
      console.warn("Backend API unavailable. Falling back to local cache.", err.message);
      setIsOffline(true);
      setApiNotice('Database server disconnected. Using local offline cache.');
      setExperiments(getMergedExperiments());
    }
  }, [getMergedExperiments]);

  useEffect(() => {
    loadExperimentsFromBackend();
  }, [loadExperimentsFromBackend]);

  // Storage sync across browser tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'ds_lab_experiments' && e.newValue) {
        try {
          setExperiments(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Error syncing experiments across tabs:", err);
        }
      }
      if (e.key === 'ds_lab_modules' && e.newValue) {
        try {
          setModules(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Error syncing modules across tabs:", err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // --- Module Handlers ---
  const handleSelectModule = (mod, fileId = null) => {
    setSelectedModuleId(mod.id);
    setSelectedFileIdForModal(fileId);
  };

  const handleCreateModule = (newMod) => {
    setModules(prev => [...prev, newMod]);
  };

  const handleDeleteModule = async (modId) => {
    const deletedIds = getDeletedModuleIds();
    if (!deletedIds.includes(modId)) {
      deletedIds.push(modId);
      try {
        localStorage.setItem('ds_lab_deleted_module_ids', JSON.stringify(deletedIds));
      } catch (_e) {
        // Ignore
      }
    }

    setModules(prev => prev.filter(m => m.id !== modId));
    if (selectedModuleId === modId) {
      setSelectedModuleId(null);
      setSelectedFileIdForModal(null);
    }
    await deleteStoredFilesByModule(modId);
  };

  const handleResetModules = () => {
    try {
      localStorage.removeItem('ds_lab_deleted_module_ids');
      localStorage.removeItem('ds_lab_modules_clean_standard_v8');
      localStorage.removeItem('ds_lab_modules_v11');
      localStorage.setItem('ds_lab_modules_v12', JSON.stringify(initialModules));
    } catch (_e) {
      // Ignore
    }
    setModules(initialModules);
  };

  const handleImportData = (importedData) => {
    if (importedData.profile) {
      setProfile(importedData.profile);
      try {
        localStorage.setItem('ds_lab_profile', JSON.stringify(importedData.profile));
      } catch (_e) {}
    }
    if (importedData.experiments && Array.isArray(importedData.experiments)) {
      setExperiments(importedData.experiments);
      try {
        localStorage.setItem('ds_lab_experiments', JSON.stringify(importedData.experiments));
        localStorage.removeItem('ds_lab_deleted_ids');
      } catch (_e) {}
    }
  };

  const handleResetToDefaults = () => {
    try {
      localStorage.removeItem('ds_lab_experiments');
      localStorage.removeItem('ds_lab_deleted_ids');
      localStorage.removeItem('ds_lab_deleted_module_ids');
      localStorage.removeItem('ds_lab_modules');
      localStorage.removeItem('ds_lab_modules_clean_standard_v8');
      localStorage.removeItem('ds_lab_modules_v11');
      localStorage.removeItem('ds_lab_modules_v12');
    } catch (_e) {}
    setModules(initialModules);
    setExperiments(initialExperiments);
  };

  const handleAddFilesToModule = (modId, newFiles) => {
    setModules(prev => prev.map(m => {
      if (m.id === modId) {
        const existing = m.resources || [];
        return {
          ...m,
          resources: [...existing, ...newFiles]
        };
      }
      return m;
    }));
  };

  const handleDeleteFileFromModule = (modId, fileId) => {
    setModules(prev => prev.map(m => {
      if (m.id === modId) {
        return {
          ...m,
          resources: (m.resources || []).filter(r => (r.id !== fileId && r.name !== fileId))
        };
      }
      return m;
    }));
  };

  const handleCreateModuleFromUnit = (unit) => {
    const newModule = {
      id: `mod-${Date.now()}`,
      moduleNumber: modules.length + 1,
      title: `UNIT ${unit.unit}: ${unit.title}`,
      description: unit.description,
      icon: unit.icon || 'BookOpen',
      badgeColor: unit.badgeColor || 'from-cyan-500 to-blue-600',
      borderColor: unit.borderColor || 'border-cyan-500/30',
      btnColor: unit.btnColor || 'bg-cyan-600 hover:bg-cyan-500',
      syllabus: unit.topics || [],
      resources: [],
      summary: unit.summary
    };
    setModules(prev => [...prev, newModule]);
    setActiveTab('modules');
    setSelectedModuleId(newModule.id);
  };

  // --- Experiment Handlers ---
  const handleAddExperiment = async (newExp) => {
    const expObj = {
      id: `exp-${Date.now()}`,
      title: newExp.title,
      description: newExp.description,
      subExperiments: [
        {
          id: `sub-${Date.now()}-1`,
          codeNum: "1a",
          title: "1a. Initial Script & Ingestion",
          githubUrl: "",
          code: `# ${newExp.title}\nimport pandas as pd\nimport numpy as np\n\nprint("Executing custom experiment script...")`,
          outputType: "console",
          consoleOutput: `Executing custom experiment script...\n[STATUS] Execution Completed (Exit Code: 0)`
        }
      ]
    };

    setExperiments(prev => [...prev, expObj]);

    try {
      const savedInDb = await createExperimentApi(expObj);
      if (savedInDb) {
        setExperiments(prev => prev.map(e => e.id === expObj.id ? savedInDb : e));
        setIsOffline(false);
      }
    } catch (err) {
      console.warn("Failed to persist new experiment to MongoDB:", err.message);
      setIsOffline(true);
      setApiNotice('Saved to local browser cache. Server unavailable.');
    }
  };

  const handleAddSubExperiment = async (expId, newSub) => {
    const targetExp = experiments.find(e => e.id === expId);
    if (!targetExp) return;

    const newSubObj = {
      id: `sub-${Date.now()}`,
      codeNum: newSub.codeNum,
      title: newSub.title,
      githubUrl: newSub.githubUrl || '',
      code: newSub.code,
      outputType: 'console',
      consoleOutput: newSub.consoleOutput
    };

    const updatedSubExps = [...(targetExp.subExperiments || []), newSubObj];
    const updatedExp = { ...targetExp, subExperiments: updatedSubExps };

    setExperiments(prev => prev.map(exp => exp.id === expId ? updatedExp : exp));

    try {
      await updateExperimentApi(expId, updatedExp);
      setIsOffline(false);
    } catch (err) {
      console.warn("Failed to save sub-experiment to MongoDB:", err.message);
      setIsOffline(true);
    }
  };

  const handleDeleteExperiment = async (expId) => {
    const deletedStr = localStorage.getItem('ds_lab_deleted_ids');
    const deletedIds = deletedStr ? JSON.parse(deletedStr) : [];
    if (!deletedIds.includes(expId)) {
      deletedIds.push(expId);
      try {
        localStorage.setItem('ds_lab_deleted_ids', JSON.stringify(deletedIds));
      } catch (_e) {
        // Ignore
      }
    }

    setExperiments(prev => prev.filter(exp => exp.id !== expId));

    try {
      await deleteExperimentApi(expId);
      setIsOffline(false);
    } catch (err) {
      console.warn("Failed to delete experiment from MongoDB:", err.message);
    }
  };

  const handleDeleteSubExperiment = async (expId, subExpId) => {
    const deletedStr = localStorage.getItem('ds_lab_deleted_ids');
    const deletedIds = deletedStr ? JSON.parse(deletedStr) : [];
    if (!deletedIds.includes(subExpId)) {
      deletedIds.push(subExpId);
      try {
        localStorage.setItem('ds_lab_deleted_ids', JSON.stringify(deletedIds));
      } catch (_e) {
        // Ignore
      }
    }

    const targetExp = experiments.find(e => e.id === expId);
    if (targetExp) {
      const updatedSubExps = (targetExp.subExperiments || []).filter(sub => sub.id !== subExpId);
      const updatedExp = { ...targetExp, subExperiments: updatedSubExps };

      setExperiments(prev => prev.map(exp => exp.id === expId ? updatedExp : exp));

      try {
        await deleteSubExperimentApi(expId, subExpId);
        setIsOffline(false);
      } catch (err) {
        console.warn("Failed to delete sub-experiment from MongoDB:", err.message);
      }
    }
  };

  const handleEditExperiment = async (expId, updatedFields) => {
    let updatedExpToSave = null;

    setExperiments(prev => prev.map(exp => {
      if (exp.id === expId) {
        updatedExpToSave = {
          ...exp,
          title: updatedFields.title !== undefined ? updatedFields.title : exp.title,
          description: updatedFields.description !== undefined ? updatedFields.description : exp.description
        };
        return updatedExpToSave;
      }
      return exp;
    }));

    if (updatedExpToSave) {
      try {
        await updateExperimentApi(expId, updatedExpToSave);
        setIsOffline(false);
      } catch (err) {
        console.warn("Failed to persist experiment update to MongoDB:", err.message);
        setIsOffline(true);
      }
    }
  };

  const handleEditSubExperiment = async (expId, subExpId, updatedSubFields) => {
    let updatedExpToSave = null;

    setExperiments(prev => prev.map(exp => {
      if (exp.id === expId) {
        const updatedSubs = (exp.subExperiments || []).map(sub => {
          if (sub.id === subExpId) {
            return {
              ...sub,
              codeNum: updatedSubFields.codeNum !== undefined ? updatedSubFields.codeNum : sub.codeNum,
              title: updatedSubFields.title !== undefined ? updatedSubFields.title : sub.title,
              githubUrl: updatedSubFields.githubUrl !== undefined ? updatedSubFields.githubUrl : sub.githubUrl,
              code: updatedSubFields.code !== undefined ? updatedSubFields.code : sub.code,
              consoleOutput: updatedSubFields.consoleOutput !== undefined ? updatedSubFields.consoleOutput : sub.consoleOutput,
              outputType: updatedSubFields.outputType !== undefined ? updatedSubFields.outputType : (sub.outputType || 'console')
            };
          }
          return sub;
        });
        updatedExpToSave = { ...exp, subExperiments: updatedSubs };
        return updatedExpToSave;
      }
      return exp;
    }));

    if (updatedExpToSave) {
      try {
        await updateExperimentApi(expId, updatedExpToSave);
        setIsOffline(false);
      } catch (err) {
        console.warn("Failed to persist sub-experiment update to MongoDB:", err.message);
        setIsOffline(true);
      }
    }
  };

  const handleUpdateSubExpCode = async (expId, subExpId, newCode, githubUrl, newConsoleOutput) => {
    let updatedExpToSave = null;

    setExperiments(prev => prev.map(exp => {
      if (exp.id === expId) {
        const updatedSubs = exp.subExperiments.map(sub => {
          if (sub.id === subExpId) {
            return {
              ...sub,
              code: newCode !== undefined ? newCode : sub.code,
              githubUrl: githubUrl !== undefined ? githubUrl : sub.githubUrl,
              consoleOutput: newConsoleOutput !== undefined ? newConsoleOutput : sub.consoleOutput
            };
          }
          return sub;
        });
        updatedExpToSave = { ...exp, subExperiments: updatedSubs };
        return updatedExpToSave;
      }
      return exp;
    }));

    if (updatedExpToSave) {
      try {
        await updateExperimentApi(expId, updatedExpToSave);
        setIsOffline(false);
      } catch (_err) {
        // Silent fallback to local cache
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Non-blocking Database Status Banner */}
      {isOffline && (
        <div className="bg-amber-950/80 border-b border-amber-500/40 px-4 py-2 text-center text-xs text-amber-200 flex items-center justify-center space-x-2 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
          <span>{apiNotice || 'Database server is offline. Changes are saved to local browser cache.'}</span>
        </div>
      )}

      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
      />

      {/* Main Layout Body (Full-width without left sidebar) */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden min-w-0">
          {/* 1. Home Tab */}
          {activeTab === 'home' && (
            <div className="space-y-6 animate-fadeIn">
              <WelcomeHero />
              <StudentProfile
                profile={profile}
                onEditProfile={() => setIsEditProfileModalOpen(true)}
              />

              <ModulesSection
                modules={modules}
                onSelectModule={handleSelectModule}
                onCreateModule={handleCreateModule}
                onDeleteModule={handleDeleteModule}
                onResetModules={handleResetModules}
                onAddFilesToModule={handleAddFilesToModule}
                onViewSyllabus={() => setActiveTab('syllabus')}
              />

              <ExperimentsSection
                experiments={experiments}
                onOpenAddExpModal={() => setIsAddExpModalOpen(true)}
                onOpenAddSubExpModal={(expId) => {
                  setTargetExpForSub(expId);
                  setIsAddSubExpModalOpen(true);
                }}
                onEditExperiment={handleEditExperiment}
                onEditSubExperiment={handleEditSubExperiment}
                onUpdateSubExpCode={handleUpdateSubExpCode}
                onDeleteExperiment={handleDeleteExperiment}
                onDeleteSubExperiment={handleDeleteSubExperiment}
                onOpenSyncModal={() => setIsSyncModalOpen(true)}
              />
            </div>
          )}

          {/* 2. Modules Tab */}
          {activeTab === 'modules' && (
            <div className="space-y-6 animate-fadeIn">
              <ModulesSection
                modules={modules}
                onSelectModule={handleSelectModule}
                onCreateModule={handleCreateModule}
                onDeleteModule={handleDeleteModule}
                onResetModules={handleResetModules}
                onAddFilesToModule={handleAddFilesToModule}
                onViewSyllabus={() => setActiveTab('syllabus')}
              />
            </div>
          )}

          {/* 3. Syllabus & Curriculum Tab (Preserved permanent courseware) */}
          {activeTab === 'syllabus' && (
            <div className="space-y-6 animate-fadeIn">
              <SyllabusCurriculumSection
                onCreateModuleFromUnit={handleCreateModuleFromUnit}
              />
            </div>
          )}

          {/* 4. Experiments Workbench Tab */}
          {activeTab === 'experiments' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-2">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Interactive Experiments Workbench</h2>
                  <p className="text-xs text-slate-400">Manage experiments, sub-experiments (1a, 1b...), run code, and import GitHub scripts.</p>
                </div>
              </div>
              <ExperimentsSection
                experiments={experiments}
                onOpenAddExpModal={() => setIsAddExpModalOpen(true)}
                onOpenAddSubExpModal={(expId) => {
                  setTargetExpForSub(expId);
                  setIsAddSubExpModalOpen(true);
                }}
                onEditExperiment={handleEditExperiment}
                onEditSubExperiment={handleEditSubExperiment}
                onUpdateSubExpCode={handleUpdateSubExpCode}
                onDeleteExperiment={handleDeleteExperiment}
                onDeleteSubExperiment={handleDeleteSubExperiment}
                onOpenSyncModal={() => setIsSyncModalOpen(true)}
              />
            </div>
          )}

          {/* 5. About Tab */}
          {activeTab === 'about' && (
            <AboutPage
              profile={profile}
              onEditProfile={() => setIsEditProfileModalOpen(true)}
            />
          )}

          {/* 6. Tools Tab */}
          {activeTab === 'tools' && (
            <ToolsSection />
          )}
        </main>
      </div>

      {/* Module Learning & Reader Modal */}
      {selectedModule && (
        <ModuleViewerModal
          module={selectedModule}
          initialFileId={selectedFileIdForModal}
          onClose={() => {
            setSelectedModuleId(null);
            setSelectedFileIdForModal(null);
          }}
          onDeleteModule={handleDeleteModule}
          onAddFilesToModule={handleAddFilesToModule}
          onDeleteFileFromModule={handleDeleteFileFromModule}
        />
      )}

      {/* Experiment Modals */}
      <AddExperimentModal
        isOpen={isAddExpModalOpen}
        onClose={() => setIsAddExpModalOpen(false)}
        onAddExperiment={handleAddExperiment}
      />

      <AddSubExperimentModal
        isOpen={isAddSubExpModalOpen}
        onClose={() => setIsAddSubExpModalOpen(false)}
        expId={targetExpForSub}
        onAddSubExperiment={handleAddSubExperiment}
      />

      {/* Profile Edit Modal */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleUpdateProfile}
      />

      {/* Sync & Export Lab Data Modal */}
      <SyncDataModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        experiments={experiments}
        modules={modules}
        profile={profile}
        onImportData={handleImportData}
        onResetToDefaults={handleResetToDefaults}
      />
    </div>
  );
}
