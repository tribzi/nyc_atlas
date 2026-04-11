import React from 'react';

export default function SaveMapModal({
  map,
  isOpen,
  onClose,
  folders,
  savedMaps,
  handleSaveToFolder,
  handleUnsaveCompletely,
  setIsCreateFolderOpen
}) {
  if (!isOpen || !map) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Save Map</h2>
        <p className="text-xs text-slate-500 mb-4 truncate italic">{map.title}</p>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {/* General Bucket */}
          <button
            onClick={() => handleSaveToFolder(map.id, null)}
            className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-bold transition-all flex justify-between items-center ${
              savedMaps.some(sm => sm.map_id === map.id && !sm.folder_id)
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
            }`}
          >
            📁 General (Uncategorized)
            {savedMaps.some(sm => sm.map_id === map.id && !sm.folder_id) && (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* User Folders */}
          {folders.map(folder => {
            const isInThisFolder = savedMaps.some(sm => sm.map_id === map.id && sm.folder_id === folder.id);
            return (
              <button
                key={folder.id}
                onClick={() => handleSaveToFolder(map.id, folder.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-bold transition-all flex justify-between items-center ${
                  isInThisFolder ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                }`}
              >
                📁 {folder.name}
                {isInThisFolder && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
          <button onClick={() => setIsCreateFolderOpen(true)} className="text-xs font-bold text-blue-600 hover:underline flex items-center justify-center">
            + Create New Folder
          </button>
          <button onClick={() => handleUnsaveCompletely(map.id)} className="text-xs font-bold text-rose-500 hover:underline flex items-center justify-center">
            Remove from all folders
          </button>
        </div>
      </div>
    </div>
  );
}
