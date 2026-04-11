import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

// --- THE RAINBOW PALETTE MAPPING ---
const themeColors = {
  'Boundaries': 'bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200',
  'Demographics': 'bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200',
  'Dining': 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
  'Elections': 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
  'Employment': 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200',
  'Health': 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
  'History': 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200',
  'Housing': 'bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200',
  'Land Use': 'bg-lime-100 text-lime-800 border-lime-200 hover:bg-lime-200',
  'Nature and Parks': 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200',
  'Permits': 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200',
  'Planning': 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 hover:bg-fuchsia-200',
  'Politics': 'bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-200',
  'Population': 'bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200',
  'Property': 'bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200',
  'Public Assistance': 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
  'Public Information': 'bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200',
  'Race and Ethnicity': 'bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200',
  'Resiliency and Climate': 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200',
  'Safety': 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
  'Tourism': 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
  'Transportation': 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200',
  'Utilities': 'bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-200',
  'Waste': 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200',
  'Water': 'bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200'
}
const defaultThemeColor = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'

function App() {
  const [session, setSession] = useState(null)
  const [maps, setMaps] = useState([])
  const [themes, setThemes] = useState([])
  const [folders, setFolders] = useState([])
  const [savedMaps, setSavedMaps] = useState([])

  const [activeThemeFilter, setActiveThemeFilter] = useState(null)
  const [activeFolderFilter, setActiveFolderFilter] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({ title: '', url: '', author: '', description: '' })
  const [imageFile, setImageFile] = useState(null)
  const [selectedThemes, setSelectedThemes] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  const [saveModalMap, setSaveModalMap] = useState(null)
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const [activeMap, setActiveMap] = useState(null)
  const [email, setEmail] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        getFolders()
        getSavedMaps()
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        setIsAuthOpen(false)
        getFolders()
        getSavedMaps()
      } else {
        setFolders([])
        setSavedMaps([])
        setIsProfileMenuOpen(false)
      }
    })

    getMaps()
    getThemes()

    return () => subscription.unsubscribe()
  }, [])

  async function getThemes() {
    const { data } = await supabase.from('themes').select('*').order('name')
    setThemes(data || [])
  }

  async function getMaps() {
    const { data } = await supabase
      .from('maps')
      .select('*, map_themes(themes(*))')
      .order('title', { ascending: true })
    setMaps(data || [])
  }

  async function getFolders() {
    const { data } = await supabase.from('folders').select('*').order('name')
    setFolders(data || [])
  }

  async function getSavedMaps() {
    const { data } = await supabase.from('saved_maps').select('*')
    setSavedMaps(data || [])
  }

  async function handleCreateFolder(e) {
    if (e) e.preventDefault()
    if (!newFolderName.trim()) return;

    const { error } = await supabase.from('folders').insert([{ name: newFolderName, user_id: session.user.id }])
    if (error) {
      alert(error.message)
    } else {
      setNewFolderName('')
      setIsCreateFolderOpen(false)
      getFolders()
    }
  }

  async function handleSaveToFolder(mapId, folderId) {
    const alreadySaved = savedMaps.find(sm => sm.map_id === mapId && sm.folder_id === folderId)

    if (alreadySaved) {
        const { error } = await supabase.from('saved_maps').delete().eq('id', alreadySaved.id)
        if (error) alert(error.message)
    } else {
        const { error } = await supabase.from('saved_maps').insert([{
            map_id: mapId,
            user_id: session.user.id,
            folder_id: folderId
        }])
        if (error) alert(error.message)
    }
    getSavedMaps()
  }

  async function handleUnsaveCompletely(mapId) {
    const { error } = await supabase.from('saved_maps').delete().eq('map_id', mapId).eq('user_id', session.user.id)
    if (error) alert(error.message)
    else getSavedMaps()
    setSaveModalMap(null)
  }

  async function handleLogin(e) {
    e.preventDefault()
    setAuthLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
    else setMessage('Check Inbucket for your login link!')
    setAuthLoading(false)
  }

  function handleHeartClick(e, map) {
    if (e) e.stopPropagation()
    if (!session) {
        setIsAuthOpen(true)
    } else {
        setSaveModalMap(map)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    let finalImageUrl = null

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `thumbnails/${fileName}`
      const { error: uploadError } = await supabase.storage.from('map-thumbnails').upload(filePath, imageFile)
      if (!uploadError) {
        const { data } = supabase.storage.from('map-thumbnails').getPublicUrl(filePath)
        finalImageUrl = data.publicUrl
      }
    }

    const { data: newMap, error: mapError } = await supabase.from('maps')
      .insert([{ ...formData, image_url: finalImageUrl }])
      .select()

    if (mapError) {
      alert("Error adding map: " + mapError.message)
      setIsSubmitting(false)
      return
    }

    if (selectedThemes.length > 0 && newMap) {
      const mapId = newMap[0].id
      const themeRelations = selectedThemes.map(themeId => ({ map_id: mapId, theme_id: themeId }))
      const { error: themeError } = await supabase.from('map_themes').insert(themeRelations)
      if (themeError) console.error("Error linking themes:", themeError)
    }

    setFormData({ title: '', url: '', author: '', description: '' })
    setImageFile(null)
    setSelectedThemes([])
    setIsFormOpen(false)
    getMaps()
    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const filteredMaps = maps.filter(map => {
    let matchesFolder = true;
    if (activeFolderFilter === 'all-saved') {
        matchesFolder = savedMaps.some(sm => sm.map_id === map.id);
    } else if (activeFolderFilter) {
        matchesFolder = savedMaps.some(sm => sm.map_id === map.id && sm.folder_id === activeFolderFilter);
    }

    const matchesTheme = activeThemeFilter
      ? map.map_themes.some(mt => mt.themes.id === activeThemeFilter)
      : true;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery
      ? (
          map.title?.toLowerCase().includes(searchLower) ||
          map.description?.toLowerCase().includes(searchLower) ||
          map.author?.toLowerCase().includes(searchLower) ||
          map.map_themes.some(mt => mt.themes.name.toLowerCase().includes(searchLower))
        )
      : true;

    return matchesTheme && matchesSearch && matchesFolder;
  })

  function handleFeelingLucky() {
    if (filteredMaps.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredMaps.length);
    setActiveMap(filteredMaps[randomIndex]);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">

      {/* MODAL: CREATE FOLDER */}
      {isCreateFolderOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
                <button onClick={() => setIsCreateFolderOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Create Folder</h2>
                <form onSubmit={handleCreateFolder} className="space-y-4">
                    <input autoFocus type="text" placeholder="Folder Name" required value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setIsCreateFolderOpen(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg">Cancel</button>
                        <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Create</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* MODAL: SAVE TO FOLDER */}
      {saveModalMap && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setSaveModalMap(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Save Map</h2>
            <p className="text-xs text-slate-500 mb-4 truncate italic">{saveModalMap.title}</p>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                <button onClick={() => handleSaveToFolder(saveModalMap.id, null)} className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-bold transition-all flex justify-between items-center ${savedMaps.some(sm => sm.map_id === saveModalMap.id && !sm.folder_id) ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'}`}>📁 General {savedMaps.some(sm => sm.map_id === saveModalMap.id && !sm.folder_id) && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}</button>
                {folders.map(folder => {
                    const isInThisFolder = savedMaps.some(sm => sm.map_id === saveModalMap.id && sm.folder_id === folder.id)
                    return <button key={folder.id} onClick={() => handleSaveToFolder(saveModalMap.id, folder.id)} className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-bold transition-all flex justify-between items-center ${isInThisFolder ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'}`}>📁 {folder.name} {isInThisFolder && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}</button>
                })}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button onClick={() => setIsCreateFolderOpen(true)} className="text-xs font-bold text-blue-600 hover:underline flex items-center justify-center">+ Create Folder</button>
                <button onClick={() => handleUnsaveCompletely(saveModalMap.id)} className="text-xs font-bold text-rose-500 hover:underline flex items-center justify-center">Remove from all folders</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 md:h-screen md:sticky top-0 p-8 flex flex-col shrink-0 z-20 overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">NYC Atlas</h1>
            <p className="text-sm text-slate-500 mt-2 font-medium">A catalogue of NYC maps.</p>
          </div>
          {session && (
            <div className="relative">
                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className={`p-2 rounded-lg transition-colors ${isProfileMenuOpen || activeFolderFilter ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9l-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                {isProfileMenuOpen && (
                    <div className="absolute top-10 right-0 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-[70] animate-in slide-in-from-top-2 duration-200">
                        <div className="px-3 py-2 border-b border-slate-100 mb-2"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</p><p className="text-xs font-medium text-slate-700 truncate">{session.user.email}</p></div>
                        <div className="space-y-1">
                            <button onClick={() => { setActiveFolderFilter(null); setIsProfileMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${!activeFolderFilter ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}>🌍 All Maps</button>
                            <button onClick={() => { setActiveFolderFilter('all-saved'); setIsProfileMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${activeFolderFilter === 'all-saved' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>❤️ All Saved</button>
                            <div className="h-px bg-slate-100 my-1"></div>
                            {folders.map(folder => (
                                <button key={folder.id} onClick={() => { setActiveFolderFilter(folder.id); setIsProfileMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${activeFolderFilter === folder.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>📁 {folder.name}</button>
                            ))}
                            <button onClick={() => { setIsCreateFolderOpen(true); setIsProfileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors">+ Create Folder</button>
                        </div>
                        <button onClick={() => supabase.auth.signOut()} className="w-full mt-2 text-left px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors border-t border-slate-100">Sign Out</button>
                    </div>
                )}
            </div>
          )}
        </div>

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
                        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-4"><h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Themes</h2>{activeThemeFilter && <button onClick={() => setActiveThemeFilter(null)} className="text-[10px] text-blue-600 font-bold hover:underline">Clear</button>}</div>
                        <div className="flex flex-wrap gap-2">{themes.map(theme => { const isActive = activeThemeFilter === theme.id; return <button key={theme.id} onClick={() => { setActiveThemeFilter(isActive ? null : theme.id); setActiveFolderFilter(null); }} className={`px-3 py-1.5 text-xs font-bold rounded border transition-all ${isActive ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : (themeColors[theme.name] || defaultThemeColor)}`}>{theme.name}</button> })}</div>
                    </div>
                    <button onClick={handleFeelingLucky} className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 mb-8 transition-colors">🎲 I'm feeling lucky</button>
                </>
            )}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-200 space-y-4 shrink-0">
            {!session && <button onClick={() => setIsAuthOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-lg transition-all shadow-sm">Sign In to Save Maps</button>}
            <button onClick={() => setIsAboutOpen(true)} className="w-full text-left text-slate-500 text-sm font-semibold hover:text-blue-600 transition-colors flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>About NYC Atlas</button>
            <button onClick={() => setIsFormOpen(!isFormOpen)} className="w-full text-left text-slate-800 font-bold hover:text-blue-600 transition-colors flex items-center justify-between"><span className="flex items-center"><svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>Submit a Map</span><svg className={`w-4 h-4 text-slate-300 transition-transform ${isFormOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></button>
            {isFormOpen && (
                <div className="max-h-48 overflow-y-auto pt-2 animate-in slide-in-from-bottom-2 duration-200 pb-4">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input name="title" placeholder="Map Title" required value={formData.title} onChange={handleChange} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none" />
                        <input name="url" type="url" placeholder="URL" required value={formData.url} onChange={handleChange} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none" />
                        <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white text-xs font-bold py-2 rounded-lg">{isSubmitting ? '...' : 'Save'}</button>
                    </form>
                </div>
            )}
        </div>
      </aside>

      <main className={`flex-1 ${activeMap ? 'p-0' : 'p-8'}`}>
        {activeMap ? (
            <div className="w-full h-screen bg-white flex flex-col animate-in fade-in duration-200">
                <div className="bg-slate-50 p-3 border-b border-slate-200 text-xs font-medium text-slate-500 truncate">{activeMap.url}</div>
                <iframe src={activeMap.url} className="w-full flex-grow border-0 bg-slate-100" title={activeMap.title} />
            </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {activeFolderFilter === 'all-saved' ? 'All Saved Maps' : (activeFolderFilter ? folders.find(f => f.id === activeFolderFilter)?.name : (activeThemeFilter || searchQuery ? 'Filtered Results' : 'All Maps'))}
              </h2>
              <span className="text-sm font-medium text-slate-500 bg-slate-200 px-3 py-1 rounded-full">{filteredMaps.length} Maps</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                {filteredMaps.map(map => {
                    const isSaved = savedMaps.some(sm => sm.map_id === map.id)
                    return (
                        <div key={map.id} onClick={() => setActiveMap(map)} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-400 transition-all group flex flex-col overflow-hidden cursor-pointer relative">
                            <div className="w-full h-72 bg-slate-100 border-b border-slate-200 relative overflow-hidden shrink-0">
                                {map.image_url ? <img src={map.image_url} alt={map.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50"><svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>}
                                <button onClick={(e) => handleHeartClick(e, map)} className={`absolute top-4 right-4 backdrop-blur-sm p-2 rounded-full shadow-lg transition-all z-10 ${isSaved ? 'bg-rose-500 text-white scale-110' : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:scale-110'}`}>
                                    <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </button>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{map.title}</h3>
                                <p className="text-xs text-slate-400 mt-1 mb-2 uppercase font-semibold">{map.author}</p>
                                <p className="text-slate-600 text-sm mb-2 flex-grow truncate-2-lines">{map.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: AUTH */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button onClick={() => setIsAuthOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h2>
            <p className="text-sm text-slate-500 mb-6 font-medium">Create an account to save maps and organize them into custom folders.</p>
            {message ? (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-sm font-medium animate-in fade-in">{message}</div>
            ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" placeholder="email@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" disabled={authLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors">{authLoading ? 'Sending...' : 'Send Magic Link'}</button>
                </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: ABOUT */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative">
            <button onClick={() => setIsAboutOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">About NYC Atlas</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>NYC Atlas is a catalogue of interactive maps for New York City.</p>
              <p>There is a wealth of great spatial data represented in online maps of New York City created by city agencies, individual developers, community advocates, news outlets, and others. This site catalogues these resources, making them easier to find and reference.</p>
              <p>If you would like to contribute a map that you made or found, please use the <strong>Submit a Map</strong> form at the lower left corner.</p>
              <p>NYC Atlas is created and maintained by <a href="https://bahijchancey.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Bahij Chancey</a>, an NYC-based urban planner.</p>
              <p className="text-sm pt-4 border-t border-slate-100 italic">This site is built using React and Supabase with lots of help from Google Gemini.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
