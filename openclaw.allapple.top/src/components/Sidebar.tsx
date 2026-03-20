import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, BookOpen, Terminal, Home, Menu, X, ChevronLeft, ChevronRight, Clock, Sun, Moon, MonitorSmartphone, Settings, Share2 } from 'lucide-react';
import { APP_VERSION } from '../constants';
import { useTheme } from './ThemeProvider';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [time, setTime] = useState(new Date());
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
    window.dispatchEvent(new CustomEvent('sidebar-collapse-change', { detail: { isCollapsed } }));
  }, [isCollapsed]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}年${m}月${d}日 ${h}:${min}:${s}`;
  };

  const formatUTC = (date: Date) => {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    const h = String(date.getUTCHours()).padStart(2, '0');
    const min = String(date.getUTCMinutes()).padStart(2, '0');
    const s = String(date.getUTCSeconds()).padStart(2, '0');
    return `${y}-${m}-${d} ${h}:${min}:${s} UTC`;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const NavItem = ({ icon: Icon, label, to, active }: any) => {
    const isActive = active || location.pathname === to;
    return (
      <button
        onClick={() => {
          navigate(to);
          setIsMobileOpen(false);
        }}
        className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl font-medium transition-colors group ${
          isActive 
            ? 'glass-panel text-indigo-700 dark:text-indigo-400' 
            : 'text-slate-600 dark:text-slate-400 hover:glass-panel hover:text-slate-900 dark:hover:text-white'
        } ${isCollapsed ? 'justify-center' : ''}`}
        title={isCollapsed ? label : undefined}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`} />
        {!isCollapsed && <span className="truncate">{label}</span>}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-50
          glass border-r border-slate-200 dark:border-white/10 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]
          transition-all duration-300 ease-in-out transform
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-20' : 'md:w-72'}
          w-72 h-screen shrink-0
        `}
      >
        <div className="p-6 border-b border-slate-100 dark:border-white/10 flex items-center justify-between shrink-0 h-[88px]">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'md:hidden' : ''}`}>
            <button onClick={() => navigate('/')} className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm shrink-0 hover:bg-indigo-500 transition-colors">
              <Terminal className="w-5 h-5 text-white" />
            </button>
            <button onClick={() => navigate('/')} className="text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              OpenClaw
            </button>
          </div>
          
          {/* Collapsed Logo */}
          <div className={`hidden ${isCollapsed ? 'md:flex' : 'hidden'} w-full justify-center`}>
            <button onClick={() => navigate('/')} className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm shrink-0 hover:bg-indigo-500 transition-colors" title="首页">
              <Terminal className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Mobile Close Button */}
          <button 
            className="md:hidden p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:glass-panel transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto overflow-x-hidden">
          {!isCollapsed && <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-3">菜单</div>}
          <nav className="space-y-1">
            <NavItem icon={Home} label="首页" to="/" />
            <NavItem icon={Settings} label="配置中心" to="/dashboard" />
            <NavItem icon={Terminal} label="工具参考" to="/tools" />
            <NavItem icon={BookOpen} label="官方文档" to="/docs" />
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-white/10 shrink-0">
          {/* Time Display */}
          <div className={`mb-4 flex flex-col gap-1 ${isCollapsed ? 'items-center' : 'px-3'}`}>
            <div className={`flex items-center gap-2 text-slate-600 dark:text-slate-400 ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? formatTime(time) : undefined}>
              <Clock className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
              {!isCollapsed && <span className="text-xs font-mono font-medium truncate">{formatTime(time)}</span>}
            </div>
            {!isCollapsed && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 pl-6">
                <span className="text-[10px] font-mono truncate">{formatUTC(time)}</span>
              </div>
            )}
          </div>

          {/* PC Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex w-full items-center justify-center p-2 mb-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:glass-panel rounded-xl transition-colors"
            title={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              setIsMobileOpen(false);
              window.dispatchEvent(new CustomEvent('open-share-modal'));
            }}
            className={`flex items-center gap-3 px-3 py-2.5 mb-2 w-full text-left text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:glass-panel rounded-xl font-medium transition-colors group ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? "分享" : undefined}
          >
            <Share2 className="w-5 h-5 flex-shrink-0 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            {!isCollapsed && <span className="truncate">分享 OpenClaw</span>}
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`flex items-center gap-3 px-3 py-2.5 mb-2 w-full text-left text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:glass-panel rounded-xl font-medium transition-colors group ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? "切换主题" : undefined}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 flex-shrink-0 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            ) : (
              <Moon className="w-5 h-5 flex-shrink-0 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            )}
            {!isCollapsed && <span className="truncate">{theme === 'dark' ? '浅色模式' : '深色模式'}</span>}
          </button>

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2.5 w-full text-left text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:glass-panel rounded-xl font-medium transition-colors group ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? "退出" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
            {!isCollapsed && <span className="truncate">退出</span>}
          </button>

          <div className={`flex items-center gap-2 mt-4 ${isCollapsed ? 'md:justify-center' : 'px-3'}`}>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
            {!isCollapsed && (
              <span className="text-xs font-mono text-slate-500 dark:text-slate-500 font-medium tracking-wide truncate">
                {APP_VERSION} LTS
              </span>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
