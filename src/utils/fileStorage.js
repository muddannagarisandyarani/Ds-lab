// IndexedDB storage utility for large module files (PDFs, Jupyter Notebooks, CSVs, Scripts)
// This safely stores files of any size without touching localStorage limits.

const DB_NAME = 'ds_lab_file_storage';
const DB_VERSION = 2;
const STORE_NAME = 'module_files';

let dbInstance = null;
const memoryStore = new Map();
const activeBlobUrls = new Map(); // fileId -> blobUrl

function openDB() {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('moduleId', 'moduleId', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.warn('[FileStorage] IndexedDB open error:', event.target.error);
      resolve(null);
    };
  });
}

/**
 * Save file payload into IndexedDB
 */
export async function saveStoredFile(filePayload) {
  try {
    const db = await openDB();
    if (!db) {
      memoryStore.set(filePayload.id, filePayload);
      return filePayload;
    }

    return new Promise((resolve) => {
      const tx = db.transaction([STORE_NAME], 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(filePayload);

      req.onsuccess = () => resolve(filePayload);
      req.onerror = () => {
        memoryStore.set(filePayload.id, filePayload);
        resolve(filePayload);
      };
    });
  } catch (err) {
    console.warn('[FileStorage] saveStoredFile fallback:', err);
    memoryStore.set(filePayload.id, filePayload);
    return filePayload;
  }
}

/**
 * Retrieve file payload from IndexedDB
 */
export async function getStoredFile(fileId) {
  try {
    const db = await openDB();
    if (!db) {
      return memoryStore.get(fileId) || null;
    }

    return new Promise((resolve) => {
      const tx = db.transaction([STORE_NAME], 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(fileId);

      req.onsuccess = () => resolve(req.result || memoryStore.get(fileId) || null);
      req.onerror = () => resolve(memoryStore.get(fileId) || null);
    });
  } catch (err) {
    console.warn('[FileStorage] getStoredFile fallback:', err);
    return memoryStore.get(fileId) || null;
  }
}

/**
 * Get or create a valid Blob URL for a file
 */
export async function getFileBlobUrl(fileId) {
  if (activeBlobUrls.has(fileId)) {
    return activeBlobUrls.get(fileId);
  }

  const stored = await getStoredFile(fileId);
  if (!stored) return null;

  let blob = null;
  if (stored.fileBlob) {
    blob = stored.fileBlob;
  } else if (stored.content) {
    blob = new Blob([stored.content], { type: 'text/plain;charset=utf-8' });
  }

  if (blob) {
    const url = URL.createObjectURL(blob);
    activeBlobUrls.set(fileId, url);
    return url;
  }

  return null;
}

/**
 * Delete a single file
 */
export async function deleteStoredFile(fileId) {
  if (activeBlobUrls.has(fileId)) {
    URL.revokeObjectURL(activeBlobUrls.get(fileId));
    activeBlobUrls.delete(fileId);
  }
  memoryStore.delete(fileId);

  try {
    const db = await openDB();
    if (!db) return true;

    return new Promise((resolve) => {
      const tx = db.transaction([STORE_NAME], 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(fileId);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch (err) {
    console.warn('[FileStorage] deleteStoredFile error:', err);
    return true;
  }
}

/**
 * Delete all files for a module
 */
export async function deleteStoredFilesByModule(moduleId) {
  try {
    const db = await openDB();
    if (!db) return true;

    const tx = db.transaction([STORE_NAME], 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('moduleId');
    const req = index.getAllKeys(moduleId);

    req.onsuccess = () => {
      const keys = req.result || [];
      keys.forEach(k => {
        if (activeBlobUrls.has(k)) {
          URL.revokeObjectURL(activeBlobUrls.get(k));
          activeBlobUrls.delete(k);
        }
        memoryStore.delete(k);
        store.delete(k);
      });
    };

    return new Promise((resolve) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (err) {
    console.warn('[FileStorage] deleteStoredFilesByModule error:', err);
    return true;
  }
}

/**
 * Process uploaded File object (from drag & drop or file picker)
 * Returns a lightweight metadata object safe for React state and localStorage.
 */
export async function processUploadedFile(file, moduleId) {
  const extension = file.name.split('.').pop().toLowerCase();
  const fileId = `file-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
  const sizeKb = (file.size / 1024).toFixed(1);
  const displaySize = file.size >= 1024 * 1024 ? `${sizeMb} MB` : `${sizeKb} KB`;

  // Pre-generate instant Blob URL in memory
  const blobUrl = URL.createObjectURL(file);
  activeBlobUrls.set(fileId, blobUrl);

  let textContent = '';
  const textExtensions = ['txt', 'md', 'py', 'ipynb', 'csv', 'json', 'js', 'jsx', 'html', 'css', 'r', 'sql', 'yaml', 'yml'];
  if (textExtensions.includes(extension) || file.type.startsWith('text/') || extension === 'ipynb') {
    try {
      textContent = await file.text();
    } catch (_err) {
      textContent = '';
    }
  }

  // Heavy data stored ONLY in IndexedDB (never in localStorage!)
  await saveStoredFile({
    id: fileId,
    moduleId,
    name: file.name,
    type: extension,
    size: displaySize,
    rawSize: file.size,
    date: new Date().toISOString().split('T')[0],
    content: textContent,
    fileBlob: file // Direct binary Blob in IndexedDB
  });

  // Return lightweight metadata for React state
  return {
    id: fileId,
    moduleId,
    name: file.name,
    type: extension,
    size: displaySize,
    rawSize: file.size,
    date: new Date().toISOString().split('T')[0],
    blobUrl, // in-memory pointer
    content: textContent.length < 50000 ? textContent : '' // only small snippets in memory
  };
}
