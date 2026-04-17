import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabaseClient'
import imageCompression from 'browser-image-compression';

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
import WelcomePopup from './components/Modals/WelcomePopup'

// --- DYNAMIC RAINBOW PALETTE ---
const rainbowPalette = [
  // Tier 1: Soft Pastels
  'bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200',
  'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
  'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200',
  'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200',
  'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
  'bg-lime-100 text-lime-800 border-lime-200 hover:bg-lime-200',
  'bg-green-100 text-green-700 border-green-200 hover:bg-green-200',
  'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200',
  'bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200',
  'bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200',
  'bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-200',
  'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
  'bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200',
  'bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200',
  'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
  'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 hover:bg-fuchsia-200',
  'bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200',

  // Tier 2: Vivid Tones
  'bg-rose-200 text-rose-800 border-rose-300 hover:bg-rose-300',
  'bg-red-200 text-red-800 border-red-300 hover:bg-red-300',
  'bg-orange-200 text-orange-800 border-orange-300 hover:bg-orange-300',
  'bg-amber-200 text-amber-900 border-amber-300 hover:bg-amber-300',
  'bg-yellow-200 text-yellow-900 border-yellow-300 hover:bg-yellow-300',
  'bg-lime-200 text-lime-900 border-lime-300 hover:bg-lime-300',
  'bg-green-200 text-green-800 border-green-300 hover:bg-green-300',
  'bg-emerald-200 text-emerald-800 border-emerald-300 hover:bg-emerald-300',
  'bg-teal-200 text-teal-800 border-teal-300 hover:bg-teal-300',
  'bg-cyan-200 text-cyan-800 border-cyan-300 hover:bg-cyan-300',
  'bg-sky-200 text-sky-800 border-sky-300 hover:bg-sky-300',
  'bg-blue-200 text-blue-800 border-blue-300 hover:bg-blue-300',
  'bg-indigo-200 text-indigo-800 border-indigo-300 hover:bg-indigo-300',
  'bg-violet-200 text-violet-800 border-violet-300 hover:bg-violet-300',
  'bg-purple-200 text-purple-800 border-purple-300 hover:bg-purple-300',
  'bg-fuchsia-200 text-fuchsia-800 border-fuchsia-300 hover:bg-fuchsia-300',
  'bg-pink-200 text-pink-800 border-pink-300 hover:bg-pink-300'
];

const defaultThemeColor = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';

const getDynamicThemeColor = (themeName, allThemes) => {
  if (!allThemes || allThemes.length === 0) return defaultThemeColor;

  const sortedThemeNames = [...allThemes]
    .map(t => t.name)
    .sort((a, b) => a.localeCompare(b));

  const themeIndex = sortedThemeNames.indexOf(themeName);
  if (themeIndex === -1) return defaultThemeColor;

  const colorIndex = themeIndex % rainbowPalette.length;
  return rainbowPalette[colorIndex];
};

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
  const scrollPositionRef = useRef(0)
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const hasCheckedDeepLink = useRef(false)
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

      // Deep Linking logic: Only check on the first load!
      if (!hasCheckedDeepLink.current) {
        hasCheckedDeepLink.current = true; // Lock it so it doesn't fire again

        const urlParams = new URLSearchParams(window.location.search);
        const mapIdParam = urlParams.get('mapId');

        if (mapIdParam) {
          const linkedMap = fetchedMaps.find(m => m.id === mapIdParam || m.id.toString() === mapIdParam);
          if (linkedMap) {
            setActiveMap(linkedMap);
            setShowWelcomePopup(true); // Trigger the welcome toast!
          }
        }
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
  const handleMapNavigation = (map) => {
      if (map) {
        // Opening a map: Save current scroll depth, set map, jump to top of detail view
        scrollPositionRef.current = window.scrollY;
        setActiveMap(map);
        window.scrollTo(0, 0);
      } else {
        // Closing a map: Clear the map, then restore scroll depth once the directory repaints
        setActiveMap(null);
        setTimeout(() => {
          window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
        }, 10);
      }
    };

  async function handleLogin(e) {
      e.preventDefault()
      setAuthLoading(true)
      setMessage('')

      // THE FIX: Explicitly pass the exact origin URL without any trailing slashes or asterisks
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin
        }
      })

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
      handleMapNavigation(filteredMaps[randomIndex]); // <-- UPDATE THIS LINE
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
          let fileToUpload = formData.imageFile;

          // --- NEW COMPRESSION LOGIC ---
          const options = {
            maxSizeMB: 0.5,          // Compresses to roughly 500KB or less
            maxWidthOrHeight: 1200,  // Resizes massive images to a max of 1200px
            useWebWorker: true       // Keeps the UI from freezing during compression
          };

          try {
            fileToUpload = await imageCompression(formData.imageFile, options);
          } catch (error) {
            console.error("Compression error, uploading original:", error);
            // If compression fails for any reason, it safely falls back to the original file
          }
          // -----------------------------

          // We now use fileToUpload.name instead of file.name
          const fileExt = fileToUpload.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `thumbnails/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('map-thumbnails')
            .upload(filePath, fileToUpload); // Upload the compressed version

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
        setActiveMap={handleMapNavigation}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        isProfileMenuOpen={isProfileMenuOpen}
        setIsAboutOpen={setIsAboutOpen}
        setIsFormOpen={setIsFormOpen}
        isFormOpen={isFormOpen}
        setIsAuthOpen={setIsAuthOpen}
        setIsCreateFolderOpen={setIsCreateFolderOpen}
        getDynamicThemeColor={getDynamicThemeColor}
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
              setActiveMap={handleMapNavigation}
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
                    setActiveMap={handleMapNavigation}
                    getDynamicThemeColor={getDynamicThemeColor}
                    allThemes={themes}
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

      <WelcomePopup
        isOpen={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
      />

        </div>
      )
    }

    export default App
