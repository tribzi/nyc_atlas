import React, { useState, useEffect } from 'react';

export default function SubmitMapModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  themes,
  handleFormSubmit,
  isSubmitting
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Reset states when modal closes/opens
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSuccess(false);
        setErrorMessage(null);
      }, 200);
    }
  }, [isOpen]);

  const onInternalSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const error = await handleFormSubmit(e);

    if (error) {
      // 23505 is the Postgres error code for unique violation
      if (error.code === '23505') {
        setErrorMessage("It appears we already have a map with that URL in the database. Please search it in the directory. It may also not yet be approved.");
      } else {
        setErrorMessage(error.message);
      }
    } else {
      setIsSuccess(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          /* SUCCESS VIEW */
          <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Thank You!</h2>
            <p className="text-slate-600 max-w-sm mb-8 text-base leading-relaxed">
              Your map has been submitted for review. It will appear in the directory once approved.
            </p>
            <div className="flex gap-3">
              <button onClick={onClose} className="py-3 px-8 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">Close</button>
              <button onClick={() => {
                setIsSuccess(false);
                setFormData({ title: '', url: '', author: '', description: '', selectedThemes: [], imageFile: null });
              }} className="py-3 px-8 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all">Submit Another</button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Submit a Map</h2>
            <p className="text-slate-500 mb-8 font-medium">Add a new resource to the NYC Atlas directory.</p>

            <form onSubmit={onInternalSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Map Title</label>
                    <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Author / Agency</label>
                    <input required value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Map URL</label>
                    <input required type="url" value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Thumbnail</label>
                    <input type="file" accept="image/*" onChange={(e) => setFormData({...formData, imageFile: e.target.files[0]})} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  </div>
                </div>

                {/* Themes */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Select Themes</label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200 h-64 overflow-y-auto custom-scrollbar">
                    {themes.map(theme => (
                      <label key={theme.id} className="flex items-center space-x-3 text-sm text-slate-600 hover:text-blue-600 cursor-pointer p-1">
                        <input type="checkbox" checked={formData.selectedThemes?.includes(theme.id)} onChange={(e) => {
                          const currentThemes = formData.selectedThemes || [];
                          const nextThemes = e.target.checked ? [...currentThemes, theme.id] : currentThemes.filter(id => id !== theme.id);
                          setFormData({...formData, selectedThemes: nextThemes});
                        }} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
                        <span className="truncate font-medium">{theme.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Description</label>
                <textarea rows="2" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              {/* WARNING MESSAGE SECTION */}
              {errorMessage && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-xs font-bold text-amber-800 leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button type="button" onClick={onClose} className="flex-1 py-3 px-6 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50">
                  {isSubmitting ? 'Checking...' : 'Submit Map'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
