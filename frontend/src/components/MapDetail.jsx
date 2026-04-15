import React from 'react';

// The Blacklist: Add any new agencies that block iframes here
const BLOCKED_DOMAINS = [
  'tableau.com',
  'google.com/maps',
  'maps.google.com',
  'data.cityofnewyork.us',
  'map.mta.info',
  'treekeepersoftware.com',
  'plownyc.cityofnewyork.us',
  'nytimes.com'
];

export default function MapDetail({
  map,
  setActiveMap,
  isSaved,
  handleHeartClick
}) {
  // Scan the URL string against our blacklist
  const isBlockedProvider = BLOCKED_DOMAINS.some(domain =>
    map.url.toLowerCase().includes(domain)
  );

  return (
    <div className="w-full h-screen bg-white flex flex-col animate-in fade-in duration-200">

      {/* Top Bar with URL */}
      <div className="bg-slate-50 p-3 border-b border-slate-200 flex items-center justify-between shrink-0 z-10">
        <span className="text-xs font-medium text-slate-500 flex items-center truncate">
          <svg className="w-4 h-4 mr-2 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          {map.url}
        </span>
      </div>

      {/* Conditionally Render the Iframe OR the External Link Card */}
      {isBlockedProvider ? (

        /* EXTERNAL MAP STATE */
        <div className="flex-grow flex items-center justify-center bg-slate-50 p-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Direct Link Required</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              The website hosting this map uses security settings that prevent it from being embedded here. You can safely view the full interactive map directly on their website.
            </p>
            <a
              href={map.url}
              target="_blank"
              rel="noreferrer"
              className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-200"
            >
              Open Map in New Tab
            </a>
          </div>
        </div>

      ) : (

        /* NORMAL IFRAME STATE */
        <iframe
          src={map.url}
          className="w-full flex-grow border-0 bg-slate-100"
          title={map.title}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />

      )}
    </div>
  );
}
