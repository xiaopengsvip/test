import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { Menu } from 'lucide-react';
import { ShareModal } from '../components/ShareModal';

export function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleOpenShareModal = () => setIsShareModalOpen(true);
    window.addEventListener('open-share-modal', handleOpenShareModal);
    return () => window.removeEventListener('open-share-modal', handleOpenShareModal);
  }, []);

  // Determine the title based on the current path
  const getPageTitle = () => {
    if (location.pathname.includes('/dashboard')) return '配置中心';
    if (location.pathname.includes('/tools')) return '工具参考';
    if (location.pathname.includes('/docs')) return '官方文档';
    return '配置中心';
  };

  return (
    <div className="min-h-screen font-sans flex overflow-hidden transition-colors duration-300">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Mobile Header */}
        <header className="md:hidden h-16 glass border-b border-slate-200 dark:border-white/10 flex items-center px-4 shrink-0 sticky top-0 z-30 transition-colors duration-300">
          <button 
            className="p-2 -ml-2 mr-2 text-slate-600 dark:text-slate-400 hover:glass-panel rounded-lg transition-colors"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-lg font-bold text-slate-900 dark:text-white">{getPageTitle()}</span>
        </header>

        {/* Main Content Area with Animation */}
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />
    </div>
  );
}
