import { useState } from 'react';
import { Check, Copy, TerminalSquare } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CommandBlockProps {
  title: string;
  command: string;
  description?: string;
  isMultiLine?: boolean;
}

export function CommandBlock({ title, command, description, isMultiLine = false }: CommandBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="mb-8 glass-panel rounded-xl overflow-hidden shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 border border-slate-200/50 dark:border-white/10">
      {/* Mac-like Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-100/50 dark:bg-slate-800/50 border-b border-slate-200/50 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-inner"></div>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <TerminalSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-semibold font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 dark:bg-indigo-500/20 px-2 py-0.5 rounded-md border border-indigo-500/20 dark:border-indigo-500/30">{title}</h3>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all glass-button",
            copied 
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              已复制
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              复制
            </>
          )}
        </button>
      </div>
      
      {/* Code Area */}
      <div className="p-5 bg-white/40 dark:bg-black/20 text-slate-800 dark:text-slate-200 font-mono text-sm overflow-x-auto hide-scrollbar leading-relaxed">
        {isMultiLine ? (
          <pre className="whitespace-pre-wrap break-all">
            <code>{command}</code>
          </pre>
        ) : (
          <code className="whitespace-nowrap">{command}</code>
        )}
      </div>
      
      {/* Description Area */}
      {description && (
        <div className="px-5 py-3.5 bg-slate-50/80 dark:bg-slate-800/30 border-t border-slate-200/50 dark:border-white/5 text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
          <span className="text-indigo-500 dark:text-indigo-400 font-bold mt-0.5">#</span>
          <span className="leading-relaxed">{description}</span>
        </div>
      )}
    </div>
  );
}
