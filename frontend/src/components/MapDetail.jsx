import React from 'react';

export default function MapDetail({
  map,
  setActiveMap,
  isSaved,
  handleHeartClick
}) {
  return (
    <div className="w-full h-screen bg-white flex flex-col animate-in fade-in duration-200">
      {/* Top Bar with URL */}
      <div className="bg-slate-50 p-3 border-b border-slate-200 flex items-center justify-between shrink-0">
        <span className="text-xs font-medium text-slate-500 flex items-center truncate">
          <svg className="w-4 h-4 mr-2 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          {map.url}
        </span>
      </div>

      {/* The Interactive Map */}
      <iframe
        src={map.url}
        className="w-full flex-grow border-0 bg-slate-100"
        title={map.title}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}

// NOTE: The sidebar portion of the MapDetail view is actually handled
// inside the Sidebar.jsx component we created in the previous step.
// This MapDetail component specifically handles the main viewport.
