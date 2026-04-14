import React from 'react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-6">About NYC Atlas</h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>NYC Atlas is a catalogue of interactive maps for New York City.</p>
          <p>There is a wealth of great spatial data represented in online maps of New York City created by city agencies, individual developers, community advocates, news outlets, and others. This site catalogues these resources, making them easier to find and reference.</p>
          <p>If you would like to contribute a map that you made or found, please use the Submit a Map form at the lower left corner.</p>
          <p>NYC Atlas is created and maintained by <a href="https://bahijchancey.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Bahij Chancey</a>, an NYC-based urban planner. Bahij has not created any of the maps on this website, only the NYC Atlas catalogue. The author for each map is credited.</p>
          <p className="text-sm pt-4 border-t border-slate-100 italic">This site is built using React, Vite, Tailwind, and Supabase with lots of help from Google Gemini. You can view the code on the <a href="https://github.com/tribzi/nyc_atlas" target="_blank" title="NYC Atlas Github repo" className="text-blue-600 font-bold hover:underline">NYC Atlas Github repo</a>.</p>
        </div>
      </div>
    </div>
  );
}
