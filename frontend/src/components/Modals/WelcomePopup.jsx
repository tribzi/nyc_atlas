import React from 'react';

export default function WelcomePopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[150] bg-slate-900 text-white p-6 rounded-2xl shadow-2xl max-w-sm animate-in slide-in-from-bottom-8 fade-in duration-500">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
        <span className="text-2xl">👋</span> Welcome to NYC Atlas
      </h3>
      <p className="text-sm text-slate-300 leading-relaxed mb-5">
        A catalogue of NYC maps. If you want to find other cool interactive maps of NYC, click <strong className="text-white">"&larr; Back to Directory"</strong> in the sidebar.
      </p>

      <button
        onClick={onClose}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 font-bold rounded-lg transition-colors text-sm shadow-lg shadow-blue-900/50"
      >
        Got it
      </button>
    </div>
  );
}
