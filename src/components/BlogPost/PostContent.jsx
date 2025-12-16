import React from 'react';

const PostContent = ({ content, themeMode, themeStyles }) => {
  return (
    <>
      <div className={`prose prose-lg max-w-none font-mono ${themeStyles.textPrimary}`}>
        {content.split('\n').map((para, idx) => {
          const trimmed = para.trim();
          if (!trimmed) return <div key={idx} className="h-4" />;
          
          // Headings
          if (trimmed.startsWith('# ')) {
            return (
              <h2 key={idx} className={`text-2xl font-bold mt-8 mb-4 border-l-4 pl-4 ${themeStyles.borderPrimary} ${themeStyles.textSecondary}`}>
                {trimmed.replace('# ', '')}
              </h2>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h3 key={idx} className="text-xl font-bold mt-6 mb-2 opacity-90">
                {trimmed.replace('## ', '')}
              </h3>
            );
          }
          
          // Paragraphs
          return <p key={idx} className={`mb-4 leading-relaxed opacity-90`}>{trimmed}</p>;
        })}
      </div>

      {/* Footer Marker */}
      <div className={`mt-12 p-4 border text-xs text-center uppercase tracking-widest opacity-50 ${themeStyles.borderSecondary} ${themeStyles.borderDashed} ${themeStyles.rounded}`}>
        {themeMode === 'hacker' ? 'End of Payload' : 'End of Article'}
      </div>
    </>
  );
};

export default PostContent;