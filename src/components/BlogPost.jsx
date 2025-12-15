import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Lock, Unlock, FileText, Heart } from 'lucide-react';

const BlogPost = ({ post, onBack, isDark, globalDecrypted, animationsOn, bootDuration, themeMode, themeStyles }) => {
  // Only start animation if enabled AND not in 'normal' mode
  const [decryptionStage, setDecryptionStage] = useState(animationsOn && themeMode !== 'normal' ? 0 : 3);

  useEffect(() => {
    // Skip animation if disabled OR if in 'normal' mode (standard blog feel)
    if (!animationsOn || themeMode === 'normal') {
      setDecryptionStage(3);
      return;
    }
    
    // Calculate timing steps based on the bootDuration slider
    const totalMs = bootDuration * 1000;
    const step1 = totalMs * 0.25; 
    const step2 = totalMs * 0.60; 
    const step3 = totalMs;        

    const t1 = setTimeout(() => setDecryptionStage(1), step1);
    const t2 = setTimeout(() => setDecryptionStage(2), step2);
    const t3 = setTimeout(() => setDecryptionStage(3), step3);
    
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [animationsOn, bootDuration, themeMode]);

  // Terminal Text Variations
  const hackerLines = [
    "Initiating Secure Handshake...",
    "Resolving Host...",
    "Key Exchange: RSA-4096 [OK]",
    "Verifying Signature...",
    "Connection Established.",
    "Decryption Daemon Started...",
    "Processing Payload..."
  ];

  const cuteLines = [
    "Baking Fresh Cookies...", 
    "Locating Secret Snack Stash...", 
    "Key Exchange: Rainbow Sprinkles [OK]", 
    "Checking for Cat Paws...", 
    "BFF Connection Established.", 
    "Starting the Cuddle Monster...", 
    "Processing Maximum Floof..." 
  ];

  // Select lines based on theme
  const terminalLines = themeMode === 'cute' ? cuteLines : hackerLines;

  // Helper for ID Label
  const getIdLabel = () => {
    if (themeMode === 'hacker') return `SECURE_ID: ${post.id.toString().padStart(4, '0')}`;
    if (themeMode === 'cute') return `Sparkle #${post.id}`;
    return `ID: ${post.id}`;
  };

  return (
    <div className={`min-h-screen p-6 md:p-12 transition-colors duration-500 font-mono ${themeStyles.appBg} ${themeStyles.textPrimary}`}>
      <button 
        onClick={onBack}
        className={`flex items-center gap-2 mb-8 uppercase tracking-widest text-xs hover:underline ${themeStyles.textMuted}`}
      >
        <ArrowLeft size={16} /> {themeMode === 'hacker' ? 'Abort Connection' : 'Back to Home'}
      </button>

      {/* LOADING SCREEN (Only shows if stage < 3 and not globally decrypted) */}
      {decryptionStage < 3 && !globalDecrypted ? (
        <div className="h-[60vh] flex flex-col items-center justify-center font-mono space-y-4">
          <div className={`w-full max-w-md border p-4 relative overflow-hidden ${themeStyles.borderSecondary} ${themeStyles.borderDashed} ${themeStyles.rounded}`}>
             {/* Loading Bar Animation */}
             <div className="absolute top-0 left-0 w-full h-1 bg-current animate-ping opacity-20" style={{ animationDuration: '1s' }}></div>
             
             {/* Terminal Text Output */}
             {terminalLines.slice(0, decryptionStage === 0 ? 2 : decryptionStage === 1 ? 5 : 7).map((line, i) => (
               <div key={i} className="text-sm md:text-base opacity-80 mb-1">
                 <span className="mr-2 opacity-50">{`>`}</span>
                 {line}
               </div>
             ))}
             
             {/* Status Indicator */}
             <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest animate-pulse">
               <ShieldCheck size={16} />
               {decryptionStage === 0 ? "Handshaking" : "Decrypting"}
             </div>
             
             {/* Progress Bar */}
             <div className={`h-1 mt-2 w-full bg-gray-700/30`}>
                <div 
                  className={`h-full transition-all ease-out ${isDark ? 'bg-green-500' : 'bg-slate-800'}`}
                  style={{ 
                    width: decryptionStage === 0 ? '10%' : decryptionStage === 1 ? '45%' : '100%',
                    transitionDuration: `${bootDuration / 3}s`,
                    // Override color for cute mode
                    backgroundColor: themeMode === 'cute' ? '#f472b6' : undefined 
                  }}
                ></div>
             </div>
          </div>
        </div>
      ) : (
        /* ACTUAL CONTENT */
        <article className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
           {/* Post Header */}
           <div className={`border-b-2 pb-4 mb-8 ${themeStyles.borderSecondary}`}>
             <div className={`flex items-center gap-2 text-xs mb-2 uppercase opacity-60 ${themeStyles.textMuted}`}>
                {/* Theme-Specific Icons */}
                {themeMode === 'hacker' && (globalDecrypted ? <Unlock size={12} /> : <Lock size={12} />)}
                {themeMode === 'cute' && <Heart size={12} />}
                {themeMode === 'normal' && <FileText size={12} />}
                
                {/* Theme-Specific ID Format */}
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

           {/* Post Content */}
           <div className={`prose prose-lg max-w-none font-mono ${themeStyles.textPrimary}`}>
             {post.content.split('\n').map((para, idx) => {
               const trimmed = para.trim();
               if (!trimmed) return <div key={idx} className="h-4" />;
               
               // Headings
               if (trimmed.startsWith('# ')) return <h2 key={idx} className={`text-2xl font-bold mt-8 mb-4 border-l-4 pl-4 ${themeStyles.borderPrimary} ${themeStyles.textSecondary}`}>{trimmed.replace('# ', '')}</h2>;
               if (trimmed.startsWith('## ')) return <h3 key={idx} className="text-xl font-bold mt-6 mb-2 opacity-90">{trimmed.replace('## ', '')}</h3>;
               
               // Paragraphs
               return <p key={idx} className={`mb-4 leading-relaxed opacity-90`}>{trimmed}</p>;
             })}
           </div>

           {/* Footer Marker */}
           <div className={`mt-12 p-4 border text-xs text-center uppercase tracking-widest opacity-50 ${themeStyles.borderSecondary} ${themeStyles.borderDashed} ${themeStyles.rounded}`}>
             {themeMode === 'hacker' ? 'End of Payload' : 'End of Article'}
           </div>
        </article>
      )}
    </div>
  );
};

export default BlogPost;