import React from 'react';
import BackButton from './BackButton';
import PostHeader from './PostHeader';
import PostContent from './PostContent';

const BlogPost = ({ 
  post, 
  onBack, 
  globalDecrypted, 
  themeMode, 
  themeStyles 
}) => {
  
  return (
    <div className={`min-h-screen p-6 md:p-12 transition-colors duration-500 font-mono ${themeStyles.appBg} ${themeStyles.textPrimary}`}>
      
      <BackButton 
        onBack={onBack} 
        themeMode={themeMode} 
        themeStyles={themeStyles} 
      />

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
    </div>
  );
};

export default BlogPost;