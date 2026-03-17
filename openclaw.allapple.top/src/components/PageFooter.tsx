import { Mail, Clock, User, Tag } from 'lucide-react';
import { APP_VERSION } from '../constants';

interface PageFooterProps {
  timestamp?: number;
}

export function PageFooter({ timestamp = Date.now() }: PageFooterProps) {
  const date = new Date(timestamp);
  
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const formattedDate = `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, '0')}月${String(date.getDate()).padStart(2, '0')}日 ${days[date.getDay()]} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
      <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>最后更新：</span>
            <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
              {formattedDate}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <User className="w-4 h-4 text-emerald-500" />
            <span>编辑人：</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">Everett</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Tag className="w-4 h-4 text-amber-500" />
            <span>当前版本：</span>
            <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{APP_VERSION}</span>
          </div>
        </div>
        
        <div className="md:text-right bg-slate-50 dark:bg-[#0A0A0B] p-4 rounded-xl border border-slate-100 dark:border-white/5 w-full md:w-auto">
          <div className="flex items-center md:justify-end gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
            <Mail className="w-4 h-4 text-blue-500" />
            <span>本站如遇有其他问题可以反馈至邮箱：</span>
          </div>
          <a 
            href="mailto:Everett@allapple.top" 
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium hover:underline transition-colors bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-lg"
          >
            Everett@allapple.top
          </a>
        </div>
      </div>
    </div>
  );
}
