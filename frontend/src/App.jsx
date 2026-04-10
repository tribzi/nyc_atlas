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
  const [maps, setMaps] = useState([])
  const [themes, setThemes] = useState([])
  const [activeThemeFilter, setActiveThemeFilter] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({ title: '', url: '', author: '', description: '' })
  const [imageFile, setImageFile] = useState(null)
  const [selectedThemes, setSelectedThemes] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [activeMap, setActiveMap] = useState(null)

  useEffect(() => {
    getMaps()
    getThemes()
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

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) { setImageFile(e.target.files[0]) }
  }

  function toggleThemeSelection(themeId) {
    if (selectedThemes.includes(themeId)) {
      setSelectedThemes(selectedThemes.filter(id => id !== themeId))
    } else {
      setSelectedThemes([...selectedThemes, themeId])
    }
  }

  const filteredMaps = maps.filter(map => {
    const matchesThemeFilter = activeThemeFilter
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

    return matchesThemeFilter && matchesSearch;
  })

  function handleFeelingLucky() {
    if (filteredMaps.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredMaps.length);
    setActiveMap(filteredMaps[randomIndex]);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">

      {/* ABOUT MODAL */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAboutOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
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

      <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 md:h-screen md:sticky top-0 p-8 flex flex-col shrink-0 z-20 overflow-y-auto">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">NYC Atlas</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">A catalogue of NYC interactive maps.</p>
        </div>

        {activeMap ? (
          <div className="mt-8 space-y-4 animate-in fade-in duration-300 flex-grow">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-900 leading-tight">{activeMap.title}</h3>
              <p className="text-xs text-blue-700 mt-1 uppercase tracking-wider font-semibold">{activeMap.author || 'Unknown'}</p>
              {activeMap.map_themes && activeMap.map_themes.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-blue-200/50">
                  {activeMap.map_themes.map(mt => {
                    const colorClasses = themeColors[mt.themes.name] || defaultThemeColor
                    return (
                      <span key={mt.themes.id} className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${colorClasses}`}>
                        {mt.themes.name}
                      </span>
                    )
                  })}
                </div>
              )}
              {activeMap.description && (
                <p className="mt-4 text-sm text-slate-700 leading-relaxed border-t border-blue-200/50 pt-3">
                  {activeMap.description}
                </p>
              )}
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
          <>
            <div className="mt-8 mb-6 relative">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input
                type="text"
                placeholder="Search maps or themes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter by Theme</h2>
                {activeThemeFilter && (
                  <button onClick={() => setActiveThemeFilter(null)} className="text-[10px] text-blue-600 font-bold hover:underline">
                    Clear Filter
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {themes.map(theme => {
                  const colorClasses = themeColors[theme.name] || defaultThemeColor
                  const isActive = activeThemeFilter === theme.id
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setActiveThemeFilter(isActive ? null : theme.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded border transition-all ${
                        isActive ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : colorClasses
                      }`}
                    >
                      {theme.name}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-8">
              <button
                onClick={handleFeelingLucky}
                disabled={filteredMaps.length === 0}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 group"
              >
                <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM9 9a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V9zM13 5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V5zM13 13a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />
                </svg>
                I'm feeling lucky
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-200 space-y-4">
              <button
                onClick={() => setIsAboutOpen(true)}
                className="w-full flex items-center text-slate-500 text-sm font-semibold hover:text-blue-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                About NYC Atlas
              </button>
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
                <form onSubmit={handleSubmit} className="space-y-4 mt-5 animate-in slide-in-from-bottom-2 fade-in duration-200 pb-4">
                  <input name="title" placeholder="Map Title" required value={formData.title} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors" />
                  <input name="url" type="url" placeholder="Map URL (https://...)" required value={formData.url} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors" />
                  <div className="border-2 border-dashed border-slate-300 bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors">
                    <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                      <svg className="w-6 h-6 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003 3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      <span className="text-sm font-semibold text-blue-600 hover:text-blue-800">{imageFile ? imageFile.name : 'Browse or Drag Image'}</span>
                    </label>
                  </div>
                  <input name="author" placeholder="Author / Agency" value={formData.author} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors" />
                  <textarea name="description" placeholder="Brief description..." rows="3" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors resize-none" />
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-slate-500 mb-2">Tag Themes:</p>
                    <div className="flex flex-wrap gap-1.5 h-32 overflow-y-auto p-2 border border-slate-200 rounded-md bg-slate-50">
                      {themes.map(theme => {
                        const isSelected = selectedThemes.includes(theme.id)
                        const colorClasses = themeColors[theme.name] || defaultThemeColor
                        return (
                          <button key={theme.id} type="button" onClick={() => toggleThemeSelection(theme.id)} className={`px-2 py-1 text-[10px] font-bold uppercase rounded border transition-colors ${isSelected ? colorClasses : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-100 hover:text-slate-600'}`}>
                            {theme.name}
                          </button>
                        )
                      })}
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

      <main className={`flex-1 ${activeMap ? 'p-0' : 'p-8'}`}>
        {activeMap ? (
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
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {activeThemeFilter || searchQuery ? 'Filtered Results' : 'All Maps'}
              </h2>
              <span className="text-sm font-medium text-slate-500 bg-slate-200 px-3 py-1 rounded-full">{filteredMaps.length} Maps</span>
            </div>

            {filteredMaps.length === 0 ? (
              <div className="bg-white border border-slate-200 border-dashed rounded-xl p-12 text-center">
                <p className="text-slate-500">No maps found matching your criteria.</p>
                {(activeThemeFilter || searchQuery) && (
                  <button onClick={() => { setActiveThemeFilter(null); setSearchQuery(''); }} className="mt-4 text-blue-600 font-medium hover:underline text-sm">
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                {filteredMaps.map(map => (
                  <div key={map.id} onClick={() => setActiveMap(map)} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-400 transition-all group flex flex-col overflow-hidden cursor-pointer">
                    <div className="w-full h-72 bg-slate-100 border-b border-slate-200 relative overflow-hidden shrink-0">
                      {map.image_url ? (
                        <img src={map.image_url} alt={map.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">{map.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 mb-2 uppercase tracking-wide font-semibold">{map.author || 'Unknown Author'}</p>
                      {map.map_themes && map.map_themes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {map.map_themes.map(mt => {
                            const colorClasses = themeColors[mt.themes.name] || defaultThemeColor
                            return (
                              <button key={mt.themes.id} onClick={(e) => { e.stopPropagation(); setActiveThemeFilter(mt.themes.id); }} className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border transition-opacity hover:opacity-80 ${colorClasses}`}>
                                {mt.themes.name}
                              </button>
                            )
                          })}
                        </div>
                      )}
                      <p className="text-slate-600 text-sm mb-2 flex-grow">{map.description}</p>
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
