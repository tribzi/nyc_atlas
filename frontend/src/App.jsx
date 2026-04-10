import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [maps, setMaps] = useState([])
  const [formData, setFormData] = useState({ title: '', url: '', author: '', description: '' })
  const [imageFile, setImageFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    getMaps()
  }, [])

  async function getMaps() {
    const { data } = await supabase.from('maps').select().order('created_at', { ascending: false })
    setMaps(data || [])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)

    let finalImageUrl = null

    if (imageFile) {
      // 1. Generate unique file name
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `thumbnails/${fileName}`

      // 2. Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from('map-thumbnails')
        .upload(filePath, imageFile)

      if (uploadError) {
        alert("Error uploading image: " + uploadError.message)
        setIsSubmitting(false)
        return
      }

      // 3. Get the raw public URL (Removed the 'transform' block for local development)
      const { data } = supabase.storage
        .from('map-thumbnails')
        .getPublicUrl(filePath)

      finalImageUrl = data.publicUrl
    }

    // 4. Save to Database
    const { error } = await supabase.from('maps').insert([
      {
        ...formData,
        image_url: finalImageUrl
      }
    ])

    if (error) {
      alert("Error adding map: " + error.message)
    } else {
      setFormData({ title: '', url: '', author: '', description: '' })
      setImageFile(null)
      setIsFormOpen(false)
      getMaps()
    }

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">

      {/* --- THE SIDEBAR --- */}
      <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 md:h-screen md:sticky top-0 p-8 flex flex-col shrink-0 z-20 overflow-y-auto">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">NYC Atlas</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">A curated directory of spatial data and interactive maps.</p>
        </div>

        <div className="mt-10 mb-8">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Filters</h2>
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-lg p-6 flex items-center justify-center text-slate-400 text-sm italic">
            Themes coming soon...
          </div>
        </div>

        {/* --- EXPANDABLE FORM DRAWER --- */}
        <div className="mt-auto pt-6 border-t border-slate-200">
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="w-full flex items-center justify-between text-slate-800 font-bold hover:text-blue-600 transition-colors group"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Submit a Map
            </span>
            <svg
              className={`w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-transform duration-200 ${isFormOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
            </svg>
          </button>

          {isFormOpen && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-5 animate-in slide-in-from-bottom-2 fade-in duration-200">
              <input
                name="title" placeholder="Map Title" required
                value={formData.title} onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors"
              />
              <input
                name="url" type="url" placeholder="Map URL (https://...)" required
                value={formData.url} onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors"
              />

              {/* --- FIXED FILE UPLOADER --- */}
              <div className="border-2 border-dashed border-slate-300 bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors">
                {/* We completely hide the actual input */}
                <input
                  id="file-upload" type="file" accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {/* The label acts as the clickable button */}
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <svg className="w-6 h-6 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  <span className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                    {imageFile ? imageFile.name : 'Browse or Drag Image'}
                  </span>
                </label>
              </div>

              <input
                name="author" placeholder="Author / Agency"
                value={formData.author} onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors"
              />
              <textarea
                name="description" placeholder="Brief description..." rows="3"
                value={formData.description} onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors resize-none"
              />
              <button
                type="submit" disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-2.5 rounded-md transition-colors disabled:opacity-50 shadow-sm"
              >
                {isSubmitting ? 'Uploading...' : 'Save to Directory'}
              </button>
            </form>
          )}
        </div>
      </aside>

      {/* --- THE MAIN CONTENT --- */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center">
              <svg className="w-6 h-6 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              Directory
            </h2>
            <span className="text-sm font-medium text-slate-500 bg-slate-200 px-3 py-1 rounded-full">{maps.length} Maps</span>
          </div>

          {maps.length === 0 ? (
            <div className="bg-white border border-slate-200 border-dashed rounded-xl p-12 text-center">
              <p className="text-slate-500">No maps found. Open the sidebar to add your first map!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {maps.map(map => (
                <div key={map.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-400 transition-all group flex flex-col overflow-hidden">

                  {/* THUMBNAIL AREA */}
                  {/* CHANGED: h-44 is now h-72 to make the image container much taller */}
                  <div className="w-full h-72 bg-slate-100 border-b border-slate-200 relative overflow-hidden shrink-0">
                    {map.image_url ? (
                      <img
                        src={map.image_url}
                        alt={map.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                    )}
                  </div>

                  {/* TEXT CONTENT AREA */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">{map.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 mb-3 uppercase tracking-wide font-semibold">{map.author || 'Unknown Author'}</p>
                    <p className="text-slate-600 text-sm mb-6 flex-grow">{map.description}</p>

                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <a
                        href={map.url} target="_blank" rel="noreferrer"
                        className="text-blue-600 font-medium hover:text-blue-800 text-sm inline-flex items-center"
                      >
                        View Map
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
