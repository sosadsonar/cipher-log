import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Lock, Unlock } from 'lucide-react';

const BlogPost = ({ post, onBack, isDark, globalDecrypted, animationsOn, bootDuration }) => {
  const [decryptionStage, setDecryptionStage] = useState(animationsOn ? 0 : 3);

  useEffect(() => {
    if (!animationsOn) {
      setDecryptionStage(3);
      return;
    }
    
    // Convert duration seconds to milliseconds and calculate step delays roughly
    // Total steps: Handshake -> Resolving -> Complete
    const totalMs = bootDuration * 1000;
    const step1 = totalMs * 0.25; // 25% for init
    const step2 = totalMs * 0.60; // 60% for intermediate
    const step3 = totalMs;        // 100% complete

    const t1 = setTimeout(() => setDecryptionStage(1), step1);
    const t2 = setTimeout(() => setDecryptionStage(2), step2);
    const t3 = setTimeout(() => setDecryptionStage(3), step3);
    
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [animationsOn, bootDuration]);

  const terminalLines = [
    "Initiating Secure Handshake...",
    "Resolving Host...",
    "Key Exchange: RSA-4096 [OK]",
    "Verifying Signature...",
    "Connection Established.",
    "Decryption Daemon Started...",
    "Processing Payload..."
  ];

  return (
    <div className={`min-h-screen p-6 md:p-12 transition-colors duration-500 font-mono ${isDark ? 'bg-black text-green-500' : 'bg-gray-100 text-slate-800'}`}>
      <button 
        onClick={onBack}
        className={`flex items-center gap-2 mb-8 uppercase tracking-widest text-xs hover:underline ${isDark ? 'text-green-400' : 'text-slate-600'}`}
      >
        <ArrowLeft size={16} /> Abort Connection
      </button>

      {decryptionStage < 3 && !globalDecrypted ? (
        <div className="h-[60vh] flex flex-col items-center justify-center font-mono space-y-4">
          <div className="w-full max-w-md border border-dashed p-4 relative overflow-hidden" 
               style={{borderColor: isDark ? '#22c55e' : '#475569'}}>
             <div className="absolute top-0 left-0 w-full h-1 bg-current animate-ping opacity-20" style={{ animationDuration: '1s' }}></div>
             {terminalLines.slice(0, decryptionStage === 0 ? 2 : decryptionStage === 1 ? 5 : 7).map((line, i) => (
               <div key={i} className="text-sm md:text-base opacity-80 mb-1">
                 <span className="mr-2 opacity-50">{`>`}</span>
                 {line}
               </div>
             ))}
             <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest animate-pulse">
               <ShieldCheck size={16} />
               {decryptionStage === 0 ? "Handshaking" : "Decrypting"}
             </div>
             <div className={`h-1 mt-2 w-full ${isDark ? 'bg-green-900' : 'bg-slate-300'}`}>
                <div 
                  className={`h-full transition-all ease-out ${isDark ? 'bg-green-500' : 'bg-slate-800'}`}
                  style={{ 
                    width: decryptionStage === 0 ? '10%' : decryptionStage === 1 ? '45%' : '100%',
                    transitionDuration: `${bootDuration / 3}s` // Smooth transition matching boot speed
                  }}
                ></div>
             </div>
          </div>
        </div>
      ) : (
        <article className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className={`border-b-2 pb-4 mb-8 ${isDark ? 'border-green-800' : 'border-slate-300'}`}>
             <div className="flex items-center gap-2 text-xs mb-2 opacity-60 uppercase">
                <Lock size={12} className={globalDecrypted || decryptionStage === 3 ? "hidden" : "block"} />
                <Unlock size={12} className={globalDecrypted || decryptionStage === 3 ? "block" : "hidden"} />
                <span>SECURE_ID: {post.id.toString().padStart(4, '0')}</span>
                <span>//</span>
                <span>{post.date}</span>
             </div>
             <h1 className={`text-3xl md:text-5xl font-bold uppercase tracking-tighter`}>
               {post.title}
             </h1>
             <p className={`mt-2 text-sm uppercase tracking-widest ${isDark ? 'text-green-700' : 'text-slate-500'}`}>
               Target: Public Knowledge
             </p>
           </div>

           <div className="prose prose-lg max-w-none font-mono">
             {post.content.split('\n').map((para, idx) => {
               const trimmed = para.trim();
               if (!trimmed) return <div key={idx} className="h-4" />;
               if (trimmed.startsWith('# ')) return <h2 key={idx} className={`text-2xl font-bold mt-8 mb-4 border-l-4 pl-4 ${isDark ? 'border-green-500 text-green-400' : 'border-slate-800 text-slate-800'}`}>{trimmed.replace('# ', '')}</h2>;
               if (trimmed.startsWith('## ')) return <h3 key={idx} className="text-xl font-bold mt-6 mb-2 opacity-90">{trimmed.replace('## ', '')}</h3>;
               return <p key={idx} className={`mb-4 leading-relaxed ${isDark ? 'text-green-300/80' : 'text-slate-700'}`}>{trimmed}</p>;
             })}
           </div>

           <div className={`mt-12 p-4 border border-dashed text-xs text-center uppercase tracking-widest opacity-50 ${isDark ? 'border-green-800' : 'border-slate-400'}`}>
             End of Payload
           </div>
        </article>
      )}
    </div>
  );
};

export default BlogPost;