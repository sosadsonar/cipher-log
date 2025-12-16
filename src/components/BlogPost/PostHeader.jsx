import React from 'react';
import { Lock, Unlock, Heart, FileText } from 'lucide-react';

const PostHeader = ({ post, themeMode, globalDecrypted, themeStyles }) => {
  
  // Helpers
  const getIdLabel = () => {
    if (themeMode === 'hacker') return `SECURE_ID: ${post.id.toString().padStart(4, '0')}`;
    if (themeMode === 'cute') return `Sparkle #${post.id}`;
    return `ID: ${post.id}`;
  };

  return (
    <div className={`border-b-2 pb-4 mb-8 ${themeStyles.borderSecondary}`}>
      <div className={`flex items-center gap-2 text-xs mb-2 uppercase opacity-60 ${themeStyles.textMuted}`}>
         {/* Theme Icons */}
         {themeMode === 'hacker' && (globalDecrypted ? <Unlock size={12} /> : <Lock size={12} />)}
         {themeMode === 'cute' && <Heart size={12} />}
         {themeMode === 'normal' && <FileText size={12} />}
         
         {/* Metadata */}
         <span>{getIdLabel()}</span>
         <span>//</span>
         <span>{post.date}</span>
      </div>
      <h1 className={`text-3xl md:text-5xl font-bold uppercase tracking-tighter ${themeStyles.textSecondary}`}>
        {post.title}
      </h1>
      <p className={`mt-2 text-sm uppercase tracking-widest ${themeStyles.textMuted}`}>
        Target: Public Knowledge
      </p>
    </div>
  );
};

export default PostHeader;