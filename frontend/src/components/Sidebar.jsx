import { supabase } from '../supabaseClient'

export default function Sidebar({
  session,
  themes,
  folders,
  activeThemeFilter,
  setActiveThemeFilter,
  activeFolderFilter,
  setActiveFolderFilter,
  searchQuery,
  setSearchQuery,
  activeMap,
  setActiveMap,
  setIsProfileMenuOpen,
  isProfileMenuOpen,
  setIsAboutOpen,
  setIsFormOpen,
  isFormOpen,
  setIsAuthOpen,
  setIsCreateFolderOpen,
  themeColors,
  defaultThemeColor,
  handleFeelingLucky,
  savedMaps,
  handleHeartClick,
  handleRenameFolder,
  handleDeleteFolder
}) {
  return (
    <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 md:h-screen md:sticky top-0 p-8 flex flex-col shrink-0 z-20 overflow-hidden">

      {/* TOP SECTION: TITLE & AUTH */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">NYC Atlas</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">A catalogue of NYC maps.</p>
        </div>

        {session && (
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isProfileMenuOpen || activeFolderFilter ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9l-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute top-10 right-0 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-[70] animate-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-slate-100 mb-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</p>
                  <p className="text-xs font-medium text-slate-700 truncate">{session.user.email}</p>
                </div>
                <div className="space-y-1">
                  <button onClick={() => { setActiveFolderFilter(null); setIsProfileMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${!activeFolderFilter ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}>🌍 All Maps</button>
                  <button onClick={() => { setActiveFolderFilter('all-saved'); setIsProfileMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${activeFolderFilter === 'all-saved' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>❤️ All Saved</button>
                  <div className="h-px bg-slate-100 my-1"></div>
                  {folders.map(folder => (
                    <div key={folder.id} className="group relative flex items-center">
                      <button
                        onClick={() => { setActiveFolderFilter(folder.id); setIsProfileMenuOpen(false); }}
                        className={`flex-grow text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${activeFolderFilter === folder.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        📁 {folder.name}
                      </button>

                      <div className="absolute right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRenameFolder(folder.id, folder.name); }}
                          className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Rename"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder.id, folder.name); }}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => { setIsCreateFolderOpen(true); setIsProfileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors">+ Create Folder</button>
                </div>
                <button onClick={() => supabase.auth.signOut()} className="w-full mt-2 text-left px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors border-t border-slate-100">Sign Out</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MIDDLE SECTION: SCROLLABLE FILTERS OR MAP DETAIL */}
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {activeMap ? (
          <div className="mt-2 space-y-4 animate-in fade-in duration-300">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 relative group">
              <button
                onClick={(e) => handleHeartClick(e, activeMap)}
                className={`absolute -top-2 -right-2 p-2 rounded-full shadow-md transition-all z-10 ${savedMaps.some(sm => sm.map_id === activeMap.id) ? 'bg-rose-500 text-white' : 'bg-white text-slate-400 hover:text-rose-500'}`}
              >
                <svg className="w-4 h-4" fill={savedMaps.some(sm => sm.map_id === activeMap.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
              <h3 className="font-bold text-blue-900 leading-tight pr-4">{activeMap.title}</h3>
              <p className="text-xs text-blue-700 mt-1 uppercase tracking-wider font-semibold">{activeMap.author}</p>
              {activeMap.description && <p className="mt-4 text-sm text-slate-700 leading-relaxed border-t border-blue-200/50 pt-3">{activeMap.description}</p>}
            </div>
            <div className="space-y-2">
              <button onClick={() => setActiveMap(null)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Directory
              </button>
              <a href={activeMap.url} target="_blank" rel="noreferrer" className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-lg transition-all flex items-center justify-center">
                Open in New Tab
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Themes</h2>
                {activeThemeFilter && <button onClick={() => setActiveThemeFilter(null)} className="text-[10px] text-blue-600 font-bold hover:underline">Clear</button>}
              </div>
              <div className="flex flex-wrap gap-2">
                {themes.map(theme => {
                  const isActive = activeThemeFilter === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => { setActiveThemeFilter(isActive ? null : theme.id); setActiveFolderFilter(null); }}
                      className={`px-3 py-1.5 text-xs font-bold rounded border transition-all ${isActive ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : (themeColors[theme.name] || defaultThemeColor)}`}
                    >
                      {theme.name}
                    </button>
                  )
                })}
              </div>
            </div>
            <button onClick={handleFeelingLucky} className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 mb-8 transition-colors">🎲 I'm feeling lucky</button>
          </>
        )}
      </div>

      {/* BOTTOM SECTION: PINNED ACTION LINKS */}
      <div className="mt-auto pt-6 border-t border-slate-200 space-y-4 shrink-0">
        {!session && <button onClick={() => setIsAuthOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-lg transition-all shadow-sm">Sign In to Save Maps</button>}

        <button onClick={() => setIsAboutOpen(true)} className="w-full text-left text-slate-500 text-sm font-semibold hover:text-blue-600 transition-colors flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            About NYC Atlas
        </button>

        <button
            onClick={() => setIsFormOpen(true)}
            className="w-full text-left text-slate-800 font-bold hover:text-blue-600 transition-colors flex items-center justify-between"
        >
            <span className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Submit a Map
            </span>
        </button>
      </div>
    </aside>
  )
}
