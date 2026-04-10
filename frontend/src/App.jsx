import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [maps, setMaps] = useState([])
  const [themes, setThemes] = useState([]) // Holds all available themes
  const [activeThemeFilter, setActiveThemeFilter] = useState(null) // Tracks sidebar filter

  const [formData, setFormData] = useState({ title: '', url: '', author: '', description: '' })
  const [imageFile, setImageFile] = useState(null)
  const [selectedThemes, setSelectedThemes] = useState([]) // Tracks themes picked in the form

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeMap, setActiveMap] = useState(null)

  useEffect(() => {
    getMaps()
    getThemes()
  }, [])

  // Fetch all themes for the sidebar and form
  async function getThemes() {
    const { data } = await supabase.from('themes').select('*').order('name')
    setThemes(data || [])
  }

  // Fetch maps AND their associated themes via the join table
  async function getMaps() {
    const { data } = await supabase
      .from('maps')
      .select('*, map_themes(themes(*))')
      .order('created_at', { ascending: false })
    setMaps(data || [])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)

    let finalImageUrl = null

    // 1. Upload Image (if any)
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

    // 2. Save Map Data (Notice the .select() at the end to return the new map's ID)
    const { data: newMap, error: mapError } = await supabase.from('maps')
      .insert([{ ...formData, image_url: finalImageUrl }])
      .select()

    if (mapError) {
      alert("Error adding map: " + mapError.message)
      setIsSubmitting(false)
      return
    }

    // 3. Save Theme Relationships (If any were selected)
    if (selectedThemes.length > 0 && newMap) {
      const mapId = newMap[0].id
      const themeRelations = selectedThemes.map(themeId => ({
        map_id: mapId,
        theme_id: themeId
      }))

      const { error: themeError } = await supabase.from('map_themes').insert(themeRelations)
      if (themeError) console.error("Error linking themes:", themeError)
    }

    // 4. Reset & Refresh
    setFormData({ title: '', url: '', author: '', description: '' })
    setImageFile(null)
    setSelectedThemes([])
    setIsFormOpen(false)
    getMaps()
    setIsSubmitting(false)
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  // Toggle themes in the creation form
  function toggleThemeSelection(themeId) {
    if (selectedThemes.includes(themeId)) {
      setSelectedThemes(selectedThemes.filter(id => id !== themeId))
    } else {
      setSelectedThemes([...selectedThemes, themeId])
    }
  }

  // Filter the maps based on the sidebar selection
  const filteredMaps = activeThemeFilter
    ? maps.filter(map => map.map_themes.some(mt => mt.themes.id === activeThemeFilter))
    : maps

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">

      {/* --- THE SIDEBAR --- */}
      <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 md:h-screen md:sticky top-0 p-8 flex flex-col shrink-0 z-20 overflow-y-auto">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">NYC Atlas</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">A curated directory of spatial data and interactive maps.</p>
        </div>

        {activeMap ? (
          /* IF A MAP IS OPEN: Sidebar Navigation Controls */
          <div className="mt-8 space-y-4 animate-in fade-in duration-300 flex-grow">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-900 leading-tight">{activeMap.title}</h3>
              <p className="text-xs text-blue-700 mt-1 uppercase tracking-wider font-semibold">{activeMap.author || 'Unknown'}</p>
            </div>

            <button onClick={() => setActiveMap(null)} className="w-full flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back to Directory
            </button>

            <a href={activeMap.url} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm">
              Open in New Tab
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </div>
        ) : (
          /* IF DIRECTORY IS OPEN: Show filters and form */
          <>
            {/* --- INTERACTIVE SIDEBAR FILTERS --- */}
            <div className="mt-10 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter by Theme</h2>
                {activeThemeFilter && (
                  <button onClick={() => setActiveThemeFilter(null)} className="text-[10px] text-blue-600 font-bold hover:underline">
                    Clear Filter
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveThemeFilter(activeThemeFilter === theme.id ? null : theme.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                      activeThemeFilter === theme.id
                        ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* EXPANDABLE FORM DRAWER */}
            <div className="mt-auto pt-6 border-t border-slate-200">
              <button onClick={() => setIsFormOpen(!isFormOpen)} className="w-full flex items-center justify-between text-slate-800 font-bold hover:text-blue-600 transition-colors group">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  Submit a Map
                </span>
                <svg className={`w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-transform duration-200 ${isFormOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </button>

              {isFormOpen && (
                <form onSubmit={handleSubmit} className="space-y-4 mt-5 animate-in slide-in-from-bottom-2 fade-in duration-200">
                  <input name="title" placeholder="Map Title" required value={formData.title} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors" />
                  <input name="url" type="url" placeholder="Map URL (https://...)" required value={formData.url} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors" />

                  <div className="border-2 border-dashed border-slate-300 bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors">
                    <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                      <svg className="w-6 h-6 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      <span className="text-sm font-semibold text-blue-600 hover:text-blue-800">{imageFile ? imageFile.name : 'Browse or Drag Image'}</span>
                    </label>
                  </div>

                  <input name="author" placeholder="Author / Agency" value={formData.author} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors" />
                  <textarea name="description" placeholder="Brief description..." rows="3" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors resize-none" />

                  {/* --- FORM THEME SELECTOR --- */}
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-slate-500 mb-2">Tag Themes:</p>
                    <div className="flex flex-wrap gap-1.5 h-32 overflow-y-auto p-2 border border-slate-200 rounded-md bg-slate-50">
                      {themes.map(theme => (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => toggleThemeSelection(theme.id)}
                          className={`px-2 py-1 text-[10px] font-bold uppercase rounded border transition-colors ${
                            selectedThemes.includes(theme.id)
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {theme.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-2.5 rounded-md transition-colors disabled:opacity-50 shadow-sm mt-2">
                    {isSubmitting ? 'Uploading...' : 'Save to Directory'}
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </aside>

      {/* --- THE MAIN CONTENT --- */}
      <main className={`flex-1 ${activeMap ? 'p-0' : 'p-8'}`}>

        {activeMap ? (
          /* IF A MAP IS OPEN: Full Bleed iframe */
          <div className="w-full h-screen bg-white flex flex-col animate-in fade-in duration-200">
            <div className="bg-slate-50 p-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs font-medium text-slate-500 flex items-center truncate">
                <svg className="w-4 h-4 mr-2 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                {activeMap.url}
              </span>
            </div>
            <iframe src={activeMap.url} className="w-full flex-grow border-0 bg-slate-100" title={activeMap.title} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
          </div>
        ) : (
          /* IF DIRECTORY IS OPEN: Render the Grid */
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <svg className="w-6 h-6 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                {activeThemeFilter ? 'Filtered Results' : 'Directory'}
              </h2>
              <span className="text-sm font-medium text-slate-500 bg-slate-200 px-3 py-1 rounded-full">{filteredMaps.length} Maps</span>
            </div>

            {filteredMaps.length === 0 ? (
              <div className="bg-white border border-slate-200 border-dashed rounded-xl p-12 text-center">
                <p className="text-slate-500">No maps found for this filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                {filteredMaps.map(map => (
                  <div key={map.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-400 transition-all group flex flex-col overflow-hidden">

                    <div className="w-full h-72 bg-slate-100 border-b border-slate-200 relative overflow-hidden shrink-0 cursor-pointer" onClick={() => setActiveMap(map)}>
                      {map.image_url ? (
                        <img src={map.image_url} alt={map.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setActiveMap(map)}>
                        {map.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 mb-2 uppercase tracking-wide font-semibold">{map.author || 'Unknown Author'}</p>

                      {/* --- MAP CARD THEME CHIPS --- */}
                      {map.map_themes && map.map_themes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {map.map_themes.map(mt => (
                            <span key={mt.themes.id} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded border border-slate-200">
                              {mt.themes.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-slate-600 text-sm mb-6 flex-grow">{map.description}</p>

                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <button onClick={() => setActiveMap(map)} className="text-blue-600 font-medium hover:text-blue-800 text-sm inline-flex items-center">
                          Launch Map
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
