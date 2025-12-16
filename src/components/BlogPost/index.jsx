import React, { useState, useEffect } from 'react';
import BootScreen from './BootScreen';
import BackButton from './BackButton';
import PostHeader from './PostHeader';
import PostContent from './PostContent';

const BlogPost = ({ 
  post, 
  onBack, 
  isDark, 
  globalDecrypted, 
  animationsOn, 
  bootDuration, 
  themeMode, 
  themeStyles 
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // If animations are off OR global decryption is on OR Normal mode -> Skip boot
    if (!animationsOn || globalDecrypted || themeMode === 'normal') {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [animationsOn, globalDecrypted, themeMode]);

  return (
    <div className={`min-h-screen p-6 md:p-12 transition-colors duration-500 font-mono ${themeStyles.appBg} ${themeStyles.textPrimary}`}>
      
      <BackButton 
        onBack={onBack} 
        themeMode={themeMode} 
        themeStyles={themeStyles} 
      />

      {!showContent ? (
        <BootScreen 
          themeMode={themeMode}
          themeStyles={themeStyles}
          isDark={isDark}
          bootDuration={bootDuration}
          onBootComplete={() => setShowContent(true)}
        />
      ) : (
        <article className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
           <PostHeader 
             post={post}
             themeMode={themeMode}
             globalDecrypted={globalDecrypted}
             themeStyles={themeStyles}
           />

           <PostContent 
             content={post.content}
             themeMode={themeMode}
             themeStyles={themeStyles}
           />
        </article>
      )}
    </div>
  );
};

export default BlogPost;