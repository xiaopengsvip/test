import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useState, useRef, useEffect } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 rounded-lg glass-button text-slate-600 dark:text-slate-400 transition-colors"
        title="切换主题"
      >
        {theme === 'light' && <Sun className="w-4 h-4" />}
        {theme === 'dark' && <Moon className="w-4 h-4" />}
        {theme === 'system' && <Monitor className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 glass-panel rounded-xl shadow-lg overflow-hidden z-50">
          <div className="py-1">
            <button
              onClick={() => { setTheme('light'); setIsOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${theme === 'light' ? 'text-indigo-600 glass-panel dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:glass-panel'}`}
            >
              <Sun className="w-4 h-4" /> 浅色模式
            </button>
            <button
              onClick={() => { setTheme('dark'); setIsOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${theme === 'dark' ? 'text-indigo-600 glass-panel dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:glass-panel'}`}
            >
              <Moon className="w-4 h-4" /> 深色模式
            </button>
            <button
              onClick={() => { setTheme('system'); setIsOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${theme === 'system' ? 'text-indigo-600 glass-panel dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:glass-panel'}`}
            >
              <Monitor className="w-4 h-4" /> 跟随系统
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
