import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabaseClient'

// Components
import Sidebar from './components/Sidebar'
import MapCard from './components/MapCard'
import MapDetail from './components/MapDetail'

// Modals
import AboutModal from './components/Modals/AboutModal'
import AuthModal from './components/Modals/AuthModal'
import SaveMapModal from './components/Modals/SaveMapModal'
import CreateFolderModal from './components/Modals/CreateFolderModal'
import ConfirmationModal from './components/Modals/ConfirmationModal'
import SubmitMapModal from './components/Modals/SubmitMapModal'

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
  // Authentication & Core Data State
  const [session, setSession] = useState(null)
  const [maps, setMaps] = useState([])
  const [themes, setThemes] = useState([])
  const [folders, setFolders] = useState([])
  const [savedMaps, setSavedMaps] = useState([])
  const [userStats, setUserStats] = useState({ submitted: 0, approved: 0 })

  // UI State
  const [activeThemeFilter, setActiveThemeFilter] = useState(null)
  const [activeFolderFilter, setActiveFolderFilter] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMap, setActiveMap] = useState(null)
  const isInitialRender = useRef(true)
  const [showReviewQueue, setShowReviewQueue] = useState(false)

  // Modal Visibility State
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [saveModalMap, setSaveModalMap] = useState(null)
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  // Folder Management State
  const [folderToEdit, setFolderToEdit] = useState(null)
  const [folderToDelete, setFolderToDelete] = useState(null)

  // Form State
  const [email, setEmail] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [newFolderName, setNewFolderName] = useState('')
  const [formData, setFormData] = useState({ title: '', url: '', author: '', description: '', selectedThemes: [], imageFile: null })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // --- INITIAL DATA FETCH EFFECT ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        getFolders()
        getSavedMaps()
        getUserStats(session.user.id)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        setIsAuthOpen(false)
        getFolders()
        getSavedMaps()
        getUserStats(session.user.id)
      } else {
        setFolders([])
        setSavedMaps([])
        setUserStats({ submitted: 0, approved: 0 })
        setIsProfileMenuOpen(false)
        setShowReviewQueue(false)
      }
    })

    getMaps()
    getThemes()

    return () => subscription.unsubscribe()
  }, [])

  // --- URL SYNC EFFECT ---
    useEffect(() => {
      // SECURITY CATCH: Don't touch the URL until the database has actually loaded the directory
      if (maps.length === 0) return;

      const url = new URL(window.location);
      if (activeMap) {
        url.searchParams.set('mapId', activeMap.id);
      } else {
        url.searchParams.delete('mapId');
      }

      window.history.replaceState({}, '', url);
    }, [activeMap, maps.length]);

  // --- DATA FUNCTIONS ---
  async function getUserStats(userId) {
    if (!userId) return;
    const { data } = await supabase
      .from('maps')
      .select('approved')
      .eq('submitted_by', userId);

    if (data) {
      setUserStats({
        submitted: data.length,
        approved: data.filter(map => map.approved).length
      });
    }
  }

  async function getThemes() {
    const { data } = await supabase.from('themes').select('*').order('name')
    setThemes(data || [])
  }

  async function getMaps() {
    const { data } = await supabase
      .from('maps')
      .select('*, map_themes(themes(*))')
      .order('title', { ascending: true });

    const fetchedMaps = data || [];
    setMaps(fetchedMaps);

    // Deep Linking logic: Automatically open map if URL param exists
    const urlParams = new URLSearchParams(window.location.search);
    const mapIdParam = urlParams.get('mapId');
    if (mapIdParam) {
      const linkedMap = fetchedMaps.find(m => m.id === mapIdParam || m.id.toString() === mapIdParam);
      if (linkedMap) setActiveMap(linkedMap);
    }
  }

  async function getFolders() {
    const { data } = await supabase.from('folders').select('*').order('name')
    setFolders(data || [])
  }

  async function getSavedMaps() {
    const { data } = await supabase.from('saved_maps').select('*')
    setSavedMaps(data || [])
  }

  // --- ACTIONS ---
  async function handleLogin(e) {
    e.preventDefault()
    setAuthLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
    else setMessage('Check Inbucket (port 54324) for your login link!')
    setAuthLoading(false)
  }

  async function handleFolderSubmit(e) {
    if (e) e.preventDefault()
    if (!newFolderName.trim()) return;

    if (folderToEdit) {
      const { error } = await supabase.from('folders').update({ name: newFolderName }).eq('id', folderToEdit.id)
      if (error) alert(error.message)
    } else {
      const { error } = await supabase.from('folders').insert([{ name: newFolderName, user_id: session.user.id }])
      if (error) alert(error.message)
    }

    setNewFolderName('')
    setFolderToEdit(null)
    setIsCreateFolderOpen(false)
    getFolders()
  }

  async function confirmDeleteFolder() {
    if (!folderToDelete) return
    const { error } = await supabase.from('folders').delete().eq('id', folderToDelete.id)
    if (error) alert(error.message)
    else {
      if (activeFolderFilter === folderToDelete.id) setActiveFolderFilter(null)
      getFolders()
    }
    setFolderToDelete(null)
  }

  async function handleSaveToFolder(mapId, folderId) {
    const alreadySaved = savedMaps.find(sm => sm.map_id === mapId && sm.folder_id === folderId)
    if (alreadySaved) {
        await supabase.from('saved_maps').delete().eq('id', alreadySaved.id)
    } else {
        await supabase.from('saved_maps').insert([{ map_id: mapId, user_id: session.user.id, folder_id: folderId }])
    }
    getSavedMaps()
  }

  async function handleUnsaveCompletely(mapId) {
    await supabase.from('saved_maps').delete().eq('map_id', mapId).eq('user_id', session.user.id)
    getSavedMaps()
    setSaveModalMap(null)
  }

  function handleHeartClick(e, map) {
    if (e) e.stopPropagation()
    if (!session) setIsAuthOpen(true)
    else setSaveModalMap(map)
  }

  function handleFeelingLucky() {
    if (filteredMaps.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredMaps.length);
    setActiveMap(filteredMaps[randomIndex]);
  }

  async function handleApproveMap(mapId) {
    const { error } = await supabase
      .from('maps')
      .update({ approved: true })
      .eq('id', mapId);

    if (error) alert(error.message);
    else {
      getMaps();
      if (session) getUserStats(session.user.id);
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = null;

      if (formData.imageFile) {
        const file = formData.imageFile;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `thumbnails/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('map-thumbnails')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('map-thumbnails').getPublicUrl(filePath);
        finalImageUrl = data.publicUrl;
      }

      const { data: newMap, error: mapError } = await supabase
        .from('maps')
        .insert([{
          title: formData.title,
          author: formData.author,
          url: formData.url,
          description: formData.description,
          image_url: finalImageUrl,
          approved: false,
          submitted_by: session?.user?.id || null
        }])
        .select();

      if (mapError) throw mapError;

      if (formData.selectedThemes?.length > 0 && newMap) {
        const mapId = newMap[0].id;
        const themeRelations = formData.selectedThemes.map(themeId => ({
          map_id: mapId,
          theme_id: themeId
        }));
        const { error: themeError } = await supabase.from('map_themes').insert(themeRelations);
        if (themeError) throw themeError;
      }

      setFormData({ title: '', url: '', author: '', description: '', selectedThemes: [], imageFile: null });
      setIsFormOpen(false);
      getMaps();
      if (session) getUserStats(session.user.id);

    } catch (error) {
      return error;
    } finally {
      setIsSubmitting(false);
    }
  }

  // --- FILTER LOGIC ---
  const filteredMaps = maps.filter(map => {
    if (showReviewQueue) return !map.approved;
    if (!map.approved) return false;

    let matchesFolder = true;
    if (activeFolderFilter === 'all-saved') matchesFolder = savedMaps.some(sm => sm.map_id === map.id);
    else if (activeFolderFilter) matchesFolder = savedMaps.some(sm => sm.map_id === map.id && sm.folder_id === activeFolderFilter);

    const matchesTheme = activeThemeFilter ? map.map_themes.some(mt => mt.themes.id === activeThemeFilter) : true;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery ? (
      map.title?.toLowerCase().includes(searchLower) ||
      map.description?.toLowerCase().includes(searchLower) ||
      map.author?.toLowerCase().includes(searchLower) ||
      map.map_themes?.some(mt => mt.themes.name.toLowerCase().includes(searchLower))
    ) : true;

    return matchesTheme && matchesSearch && matchesFolder;
  })

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">

      <Sidebar
        session={session}
        themes={themes}
        folders={folders}
        activeThemeFilter={activeThemeFilter}
        setActiveThemeFilter={setActiveThemeFilter}
        activeFolderFilter={activeFolderFilter}
        setActiveFolderFilter={setActiveFolderFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeMap={activeMap}
        setActiveMap={setActiveMap}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        isProfileMenuOpen={isProfileMenuOpen}
        setIsAboutOpen={setIsAboutOpen}
        setIsFormOpen={setIsFormOpen}
        isFormOpen={isFormOpen}
        setIsAuthOpen={setIsAuthOpen}
        setIsCreateFolderOpen={setIsCreateFolderOpen}
        themeColors={themeColors}
        defaultThemeColor={defaultThemeColor}
        handleFeelingLucky={handleFeelingLucky}
        formData={formData}
        setFormData={setFormData}
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        savedMaps={savedMaps}
        handleHeartClick={handleHeartClick}
        handleRenameFolder={(id, name) => {
          setFolderToEdit({ id, name });
          setNewFolderName(name);
          setIsCreateFolderOpen(true);
        }}
        handleDeleteFolder={(id, name) => setFolderToDelete({ id, name })}
        showReviewQueue={showReviewQueue}
        setShowReviewQueue={setShowReviewQueue}
        userStats={userStats}
      />

      <main className={`flex-1 ${activeMap ? 'p-0' : 'p-8'}`}>
        {filteredMaps.length === 0 && (activeThemeFilter || searchQuery || showReviewQueue) && (
          <div className="text-center py-12">
            <p className="text-slate-500 mb-4">
              {showReviewQueue ? "Review queue is empty!" : "No maps match these filters within this collection."}
            </p>
            <button
              onClick={() => { setActiveThemeFilter(null); setSearchQuery(''); setShowReviewQueue(false); }}
              className="text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
        {activeMap ? (
            <MapDetail
              map={activeMap}
              setActiveMap={setActiveMap}
              isSaved={savedMaps.some(sm => sm.map_id === activeMap.id)}
              handleHeartClick={handleHeartClick}
            />
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {showReviewQueue ? "Review Queue (Drafts)" :
                 activeFolderFilter === 'all-saved' ? 'All Saved Maps' :
                 activeFolderFilter ? folders.find(f => f.id === activeFolderFilter)?.name :
                 (activeThemeFilter || searchQuery) ? 'Filtered Results' : 'All Maps'}
              </h2>
              <span className="text-sm font-medium text-slate-500 bg-slate-200 px-3 py-1 rounded-full">{filteredMaps.length} Maps</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                {filteredMaps.map(map => (
                  <MapCard
                    key={map.id}
                    map={map}
                    session={session}
                    isSaved={savedMaps.some(sm => sm.map_id === map.id)}
                    handleHeartClick={handleHeartClick}
                    setActiveMap={setActiveMap}
                    themeColors={themeColors}
                    defaultThemeColor={defaultThemeColor}
                    setActiveThemeFilter={setActiveThemeFilter}
                    setActiveFolderFilter={setActiveFolderFilter}
                    handleApproveMap={handleApproveMap}
                  />
                ))}
            </div>
          </div>
        )}
      </main>

      {/* MODALS */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        email={email}
        setEmail={setEmail}
        handleLogin={handleLogin}
        authLoading={authLoading}
        message={message}
      />

      <SaveMapModal
        map={saveModalMap}
        isOpen={!!saveModalMap}
        onClose={() => setSaveModalMap(null)}
        folders={folders}
        savedMaps={savedMaps}
        handleSaveToFolder={handleSaveToFolder}
        handleUnsaveCompletely={handleUnsaveCompletely}
        setIsCreateFolderOpen={setIsCreateFolderOpen}
      />

      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={() => { setIsCreateFolderOpen(false); setFolderToEdit(null); setNewFolderName(''); }}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        handleCreateFolder={handleFolderSubmit}
        title={folderToEdit ? "Rename Folder" : "Create Folder"}
      />

      <ConfirmationModal
        isOpen={!!folderToDelete}
        onClose={() => setFolderToDelete(null)}
        onConfirm={confirmDeleteFolder}
        title="Delete Folder"
        message={`Are you sure you want to delete "${folderToDelete?.name}"? The maps inside will not be deleted, only your folder.`}
      />

      <SubmitMapModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formData={formData}
        setFormData={setFormData}
        themes={themes}
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default App
