import React from 'react';

export default function MapCard({
  map,
  session,
  isSaved,
  handleHeartClick,
  setActiveMap,
  themeColors,
  defaultThemeColor,
  setActiveThemeFilter,
  setActiveFolderFilter,
  handleApproveMap // Added new prop
}) {
  return (
    <div
      onClick={() => setActiveMap(map)}
      className="bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-400 transition-all group flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Thumbnail Area */}
      <div className="w-full h-72 bg-slate-100 border-b border-slate-200 relative overflow-hidden shrink-0">
        {map.image_url ? (
          <img
            src={map.image_url}
            alt={map.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Draft Badge (Only shows if unapproved) */}
        {!map.approved && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg z-10">
            Draft / Under Review
          </div>
        )}

        {/* Heart Icon Button */}
        <button
          onClick={(e) => handleHeartClick(e, map)}
          className={`absolute top-4 right-4 backdrop-blur-sm p-2 rounded-full shadow-lg transition-all z-10 ${
            isSaved ? 'bg-rose-500 text-white scale-110' : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:scale-110'
          }`}
        >
          <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{map.title}</h3>
        <p className="text-xs text-slate-400 mt-1 mb-2 uppercase font-semibold">{map.author}</p>

        {/* Theme Tags */}
        {map.map_themes && map.map_themes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {map.map_themes.map(mt => {
              const colorClasses = themeColors[mt.themes.name] || defaultThemeColor;
              return (
                <button
                  key={mt.themes.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveThemeFilter(mt.themes.id);
                    setActiveFolderFilter(null);
                  }}
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border transition-opacity hover:opacity-80 ${colorClasses}`}
                >
                  {mt.themes.name}
                </button>
              )
            })}
          </div>
        )}

        <p className="text-slate-600 text-sm mb-4 flex-grow truncate-2-lines">{map.description}</p>

        {/* Approval Button (Only shows if map is NOT approved) */}
        {!map.approved && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Don't open map detail when clicking approve
              handleApproveMap(map.id);
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Approve & Publish
          </button>
        )}
      </div>
    </div>
  );
}
