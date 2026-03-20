import React, { useEffect, useState, useRef } from 'react';
import { Globe, X, ExternalLink, Maximize2, Minimize2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WebSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export function WebSidebar({ isOpen, onClose, url, title }: WebSidebarProps) {
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setIsFullscreen(true);
      setHasError(false);
    }
  }, [isOpen, url]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className={`fixed inset-y-0 right-0 ${isFullscreen ? 'w-full' : 'w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw]'} glass shadow-2xl z-50 flex flex-col border-l border-slate-200 dark:border-white/10 transition-[width,background-color,border-color] duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 dark:border-white/10 shrink-0 glass-panel">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20">
                  <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">{title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="flex p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:glass-panel rounded-lg transition-colors"
                  title={isFullscreen ? "退出全屏" : "全屏显示"}
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:glass-panel rounded-lg transition-colors"
                  title="在新标签页中打开"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button 
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:glass-panel rounded-lg transition-colors"
                  title="关闭"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 w-full glass-panel overflow-hidden relative">
              {['docs.openclaw.ai', 'github.com', 'discord.com'].some(domain => url.includes(domain)) || hasError ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 border glass-panel ${hasError ? 'border-red-100 dark:border-red-500/20' : 'border-indigo-100 dark:border-indigo-500/20'}`}>
                    {hasError ? (
                      <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                    ) : (
                      <Globe className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    需要跳转访问
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md leading-relaxed">
                    由于目标网站的安全策略（如 X-Frame-Options）限制，无法在当前页面内嵌显示。请点击下方按钮在安全的新标签页中打开。
                  </p>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`flex items-center gap-2 px-6 py-3 text-white rounded-xl font-medium transition-colors shadow-sm ${hasError ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                  >
                    <ExternalLink className="w-5 h-5" />
                    在新标签页中打开
                  </a>
                </div>
              ) : (
                <iframe 
                  ref={iframeRef}
                  src={url} 
                  className="w-full h-full border-none bg-white dark:bg-[#0A0A0B]"
                  title={title}
                  onError={() => setHasError(true)}
                  onLoad={(e) => {
                    // Some browsers don't fire onError for X-Frame-Options, 
                    // but we can try to check if we can access the content window
                    try {
                      // This will throw a DOMException if it's cross-origin
                      // But if it's cross-origin and blocked by X-Frame-Options, it might just be blank
                      // We can't perfectly detect X-Frame-Options in JS, but we can handle standard errors
                    } catch (err) {
                      // Cross-origin is expected, ignore
                    }
                  }}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
