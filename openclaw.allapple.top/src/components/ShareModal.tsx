import React, { useState, useEffect } from 'react';
import { X, Twitter, Send, MessageCircle, Linkedin, Link as LinkIcon, CheckCircle2, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom Discord Icon since it's not in lucide-react
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 127.14 96.36" 
    fill="currentColor" 
    className={className}
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77.7,77.7,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.3,46,96.19,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
  text?: string;
}

export function ShareModal({ 
  isOpen, 
  onClose, 
  url = 'https://openclaw.allapple.top/', 
  title = 'OpenClaw - 真正能做事的个人 AI 助手', 
  text = '发现了一个超棒的本地 AI 助手 OpenClaw，支持浏览器控制、系统访问，还能接入微信、TG、Discord 等聊天软件！' 
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareLinks = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-black dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#229ED9] text-white hover:bg-[#1c84b6]',
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] text-white hover:bg-[#20bd5a]',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0A66C2] text-white hover:bg-[#0854a1]',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Discord',
      icon: DiscordIcon,
      color: 'bg-[#5865F2] text-white hover:bg-[#4752C4]',
      href: `https://discord.com/channels/@me`,
      onClick: async (e: React.MouseEvent) => {
        // Discord doesn't have a share URL, so we copy the link and open Discord
        e.preventDefault();
        await navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        window.open('https://discord.com/channels/@me', '_blank');
      }
    },
    {
      name: 'Reddit',
      icon: Share2, // Using Share2 as fallback for Reddit
      color: 'bg-[#FF4500] text-white hover:bg-[#e03d00]',
      href: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white dark:bg-[#161B22] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 pointer-events-auto overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-white/10">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-indigo-500" />
                  分享 OpenClaw
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {shareLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={link.onClick}
                      className="flex flex-col items-center gap-2 group"
                      title={`分享到 ${link.name}`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${link.color}`}>
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 text-center truncate w-full">
                        {link.name.split(' ')[0]}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white dark:bg-[#161B22] text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      或复制链接
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl">
                  <div className="flex-1 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 truncate font-mono bg-transparent outline-none">
                    {url}
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0 ${
                      copied 
                        ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    }`}
                  >
                    {copied ? (
                      <><CheckCircle2 className="w-4 h-4" /> 已复制</>
                    ) : (
                      <><LinkIcon className="w-4 h-4" /> 复制</>
                    )}
                  </button>
                </div>

                {typeof navigator !== 'undefined' && navigator.share && (
                  <button
                    onClick={() => {
                      navigator.share({
                        title,
                        text,
                        url,
                      }).catch(console.error);
                    }}
                    className="w-full py-3 mt-2 flex items-center justify-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> 调用系统分享
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
