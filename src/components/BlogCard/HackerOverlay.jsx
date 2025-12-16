import React from 'react';

const HackerOverlay = ({ themeMode, isDark, themeStyles }) => {
  if (themeMode !== 'hacker') return null;

  return (
    <>
      {/* Glitch/Grid Overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-repeat ${isDark ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMjJjNTVlIiAvPgo8L3N2Zz4=")]' : 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=")]'}`}></div>
      
      {/* Decorative Corners */}
      <div className={`absolute top-0 right-0 p-1 border-b border-l ${themeStyles.borderPrimary}`}></div>
      <div className={`absolute bottom-0 left-0 p-1 border-t border-r ${themeStyles.borderPrimary}`}></div>
    </>
  );
};

export default HackerOverlay;