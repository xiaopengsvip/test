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
    <div className="mb-8 bg-[#0D1117] rounded-2xl border border-slate-800 overflow-hidden shadow-xl shadow-slate-900/10">
      {/* Mac-like Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-inner"></div>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <TerminalSquare className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-semibold font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">{title}</h3>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
            copied 
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
              : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
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
      <div className="p-5 text-slate-300 font-mono text-sm overflow-x-auto leading-relaxed">
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
        <div className="px-5 py-3.5 bg-[#161B22]/50 border-t border-slate-800/50 text-sm text-slate-400 flex items-start gap-2">
          <span className="text-indigo-400 font-bold mt-0.5">#</span>
          <span className="leading-relaxed">{description}</span>
        </div>
      )}
    </div>
  );
}
