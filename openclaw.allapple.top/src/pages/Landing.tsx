import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Terminal, Shield, Zap, Globe, ArrowRight, BookOpen, BrainCircuit, MonitorSmartphone, Puzzle, Cpu, Clock, Copy, CheckCircle2, HeadphonesIcon, Download, LayoutDashboard, User, Blocks, Presentation, MessageSquare, Github, Command, TerminalSquare, Package, PlayCircle, Activity, LayoutTemplate, Settings, Newspaper, Heart, ShieldCheck, AlertTriangle, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { APP_VERSION } from '../constants';
import { PageTransition } from '../components/PageTransition';
import { ThemeToggle } from '../components/ThemeToggle';
import { LoginSidebar } from '../components/LoginSidebar';
import { WebSidebar } from '../components/WebSidebar';
import { ShareModal } from '../components/ShareModal';

const WindowsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" className={className} fill="currentColor">
    <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453-35.67-4.904-.028-29.38zm4.326-39.04L87.314 0v41.26l-47.318.376zm47.329 39.349L87.314 88l-47.318-6.678-.011-35.145z"/>
  </svg>
);

export default function Landing() {
  const [time, setTime] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'mac' | 'win' | 'npm'>('mac');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [webPanelConfig, setWebPanelConfig] = useState({ isOpen: false, url: '', title: '' });
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOpenShareModal = () => setIsShareOpen(true);
    window.addEventListener('open-share-modal', handleOpenShareModal);
    return () => window.removeEventListener('open-share-modal', handleOpenShareModal);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (location.state?.openLogin) {
      setIsLoginOpen(true);
      if (location.state?.from) {
        setRedirectUrl(location.state.from);
      }
      // Clear the state so it doesn't reopen on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (date: Date) => {
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

  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-500/20 text-indigo-400 border-indigo-500/20",
    blue: "bg-blue-500/20 text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/20 text-purple-400 border-purple-500/20",
    emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/20 text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/20 text-rose-400 border-rose-500/20",
  };

  const subtitleText = "清理收件箱、发送邮件、管理日历、办理航班值机。在您常用的 WhatsApp、Telegram 或任何聊天应用中即可完成这一切。";
  const subtitleChars = Array.from(subtitleText);

  const openWebPanel = (url: string, title: string) => {
    setWebPanelConfig({ isOpen: true, url, title });
  };

  return (
    <PageTransition className="min-h-screen text-slate-900 dark:text-slate-300 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      <LoginSidebar isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} redirectUrl={redirectUrl} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      <WebSidebar 
        isOpen={webPanelConfig.isOpen} 
        onClose={() => setWebPanelConfig({ ...webPanelConfig, isOpen: false })} 
        url={webPanelConfig.url} 
        title={webPanelConfig.title} 
      />
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-200 dark:border-white/10 sticky top-0 z-40 glass transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30">
            <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">OpenClaw</span>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden sm:flex flex-col items-end justify-center text-[10px] md:text-xs font-medium text-slate-500 dark:text-slate-400 glass-panel px-2 md:px-3 py-1.5 rounded-xl">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span className="font-mono tracking-wide">{formatDate(time)}</span>
            </div>
            <div className="text-slate-400 dark:text-slate-500 font-mono scale-90 origin-right mt-0.5 hidden md:block">
              {formatUTC(time)}
            </div>
          </div>
          <button onClick={() => setIsShareOpen(true)} className="flex text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors items-center gap-1.5 glass-button px-3 py-1.5 rounded-lg" title="分享 OpenClaw">
            <Share2 className="w-4 h-4" /> <span className="hidden md:inline">分享</span>
          </button>
          <ThemeToggle />
          <button onClick={() => openWebPanel('https://openclaw.ai/', 'OpenClaw 官方网站')} className="hidden md:flex text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors items-center gap-1.5 glass-button px-3 py-1.5 rounded-lg">
            <Globe className="w-4 h-4" /> 官网
          </button>
          <button onClick={() => openWebPanel('https://linktr.allapple.top/', 'Linktr')} className="hidden md:flex text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors items-center gap-1.5 glass-button px-3 py-1.5 rounded-lg">
            <Globe className="w-4 h-4" /> Linktr
          </button>
          <button onClick={() => navigate('/tools')} className="hidden md:flex text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors items-center gap-2 glass-button px-3 py-1.5 rounded-lg">
            <Terminal className="w-4 h-4" /> 工具
          </button>
          <button onClick={() => openWebPanel('https://docs.openclaw.ai/zh-CN', 'OpenClaw 官方文档')} className="hidden md:flex text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors items-center gap-2 glass-button px-3 py-1.5 rounded-lg">
            <BookOpen className="w-4 h-4" /> 文档
          </button>
          <button 
            onClick={() => isAuthenticated ? navigate('/dashboard') : setIsLoginOpen(true)} 
            className="flex items-center gap-2 text-sm font-medium px-3 md:px-4 py-2 glass-button text-slate-900 dark:text-white rounded-lg transition-colors"
          >
            {isAuthenticated ? (
              <><Settings className="w-4 h-4" /> 配置中心</>
            ) : (
              <><User className="w-4 h-4" /> 登录</>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 md:px-6 py-16 md:py-32 max-w-6xl mx-auto text-center">
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[200px] md:h-[400px] bg-indigo-500/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[150px] md:h-[300px] bg-cyan-500/10 blur-[60px] md:blur-[100px] rounded-full pointer-events-none"
        />

        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-button text-xs font-medium text-indigo-600 dark:text-indigo-300 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            {APP_VERSION} LTS Ready
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight"
          >
            真正能做事的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 dark:from-indigo-400 dark:via-cyan-400 dark:to-indigo-400 bg-[length:200%_auto] animate-gradient">AI 助手</span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          >
            {subtitleChars.map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: 0.2 + index * 0.03 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 flex-wrap"
          >
            <button 
              onClick={() => isAuthenticated ? navigate('/dashboard') : setIsLoginOpen(true)} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-1"
            >
              开始部署 <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => openWebPanel('https://docs.openclaw.ai/zh-CN', 'OpenClaw 官方文档')} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 glass-button text-slate-700 dark:text-white rounded-xl font-semibold hover:-translate-y-1">
              <BookOpen className="w-4 h-4" /> 官方文档
            </button>
            <button onClick={() => openWebPanel('https://openclaw.ai/', 'OpenClaw 官方网站')} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 glass-button text-slate-700 dark:text-white rounded-xl font-semibold hover:-translate-y-1">
              <Globe className="w-4 h-4" /> 访问官网
            </button>
            <button onClick={() => openWebPanel('https://linktr.allapple.top/', 'Linktr')} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 glass-button text-slate-700 dark:text-white rounded-xl font-semibold hover:-translate-y-1">
              <Globe className="w-4 h-4" /> Linktr
            </button>
            <button onClick={() => setIsShareOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 glass-button text-indigo-600 dark:text-indigo-400 rounded-xl font-semibold hover:-translate-y-1">
              <Share2 className="w-4 h-4" /> 分享推荐
            </button>
          </motion.div>

          {/* Technical Support Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-col items-center"
          >
            <button 
              onClick={() => setShowSupport(!showSupport)}
              className="group flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors relative"
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </div>
              <HeadphonesIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium border-b border-dashed border-slate-300 dark:border-slate-600 group-hover:border-indigo-600 dark:group-hover:border-white pb-0.5">
                遇到部署问题？或寻求商业合作？点击联系我们
              </span>
            </button>
            
            {showSupport && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-5 glass-panel rounded-xl flex flex-col gap-4 text-sm text-left max-w-2xl mx-auto"
              >
                <div className="text-center text-indigo-600 dark:text-indigo-300 font-medium mb-2 flex items-center justify-center gap-2">
                  <span className="inline-block animate-bounce">👇</span> 欢迎添加微信，获取专属技术支持与合作方案
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center justify-between gap-4 glass-panel px-4 py-3 rounded-lg flex-1">
                    <div>
                      <div className="text-slate-800 dark:text-slate-300 font-medium">郑工</div>
                      <div className="text-slate-500 dark:text-slate-400 font-mono text-xs mt-1">微信号: Azaqwsx000</div>
                    </div>
                    <button onClick={() => handleCopy('Azaqwsx000', 'zheng1')} className="text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
                      {copiedId === 'zheng1' ? <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4 glass-panel px-4 py-3 rounded-lg flex-1">
                    <div>
                      <div className="text-slate-800 dark:text-slate-300 font-medium">葛工</div>
                      <div className="text-slate-500 dark:text-slate-400 font-mono text-xs mt-1">微信号: yapengwxh</div>
                    </div>
                    <button onClick={() => handleCopy('yapengwxh', 'ge')} className="text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
                      {copiedId === 'ge' ? <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4 glass-panel px-4 py-3 rounded-lg flex-1">
                    <div>
                      <div className="text-slate-800 dark:text-slate-300 font-medium">郑工</div>
                      <div className="text-slate-500 dark:text-slate-400 font-mono text-xs mt-1">微信号: ZzLosezZ</div>
                    </div>
                    <button onClick={() => handleCopy('ZzLosezZ', 'zheng2')} className="text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
                      {copiedId === 'zheng2' ? <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Mock Terminal Animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 max-w-3xl mx-auto glass-panel rounded-2xl overflow-hidden text-left"
          >
            <div className="flex items-center px-4 py-3 glass-panel border-b border-white/10 dark:border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="mx-auto text-xs text-slate-400 dark:text-slate-500 font-mono">openclaw-gateway — bash</div>
            </div>
            <div className="p-6 font-mono text-sm text-slate-700 dark:text-slate-300 space-y-2">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <span className="text-emerald-600 dark:text-emerald-400">➜</span> <span className="text-cyan-600 dark:text-cyan-400">~</span> npm install -g openclaw
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-slate-500 dark:text-slate-400">
                added 142 packages in 3s
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
                <span className="text-emerald-600 dark:text-emerald-400">➜</span> <span className="text-cyan-600 dark:text-cyan-400">~</span> openclaw gateway start
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} className="text-indigo-600 dark:text-indigo-400">
                [OpenClaw] Starting multi-agent router...
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }} className="text-emerald-600 dark:text-emerald-400">
                [OpenClaw] Gateway running on port 18789 🚀
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5 }} className="animate-pulse">
                _
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="px-6 py-24 border-t border-slate-200 dark:border-white/10 relative z-10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">快速安装指南</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">OpenClaw 支持所有主流操作系统。选择您的平台，一键完成安装。</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl overflow-hidden"
          >
            <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 dark:border-white/10">
              <button 
                onClick={() => setActiveTab('mac')}
                className={`flex-1 min-w-[160px] py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'mac' ? 'text-indigo-600 dark:text-white glass-panel border-b-2 border-indigo-600 dark:border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:glass-panel'}`}
              >
                <Command className="w-4 h-4" /> macOS / Linux
              </button>
              <button 
                onClick={() => setActiveTab('win')}
                className={`flex-1 min-w-[160px] py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'win' ? 'text-indigo-600 dark:text-white glass-panel border-b-2 border-indigo-600 dark:border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:glass-panel'}`}
              >
                <WindowsIcon className="w-4 h-4" /> Windows
              </button>
              <button 
                onClick={() => setActiveTab('npm')}
                className={`flex-1 min-w-[160px] py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'npm' ? 'text-indigo-600 dark:text-white glass-panel border-b-2 border-indigo-600 dark:border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:glass-panel'}`}
              >
                <Package className="w-4 h-4" /> NPM (通用)
              </button>
            </div>
            
            <div className="p-6 md:p-8 min-h-[200px]">
              {activeTab === 'mac' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">macOS / Linux 快速安装</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">此脚本将自动安装 Node.js (如未安装) 并全局安装 OpenClaw。</p>
                  </div>
                  
                  <div className="relative group mb-8">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative glass-panel rounded-xl border border-slate-800 dark:border-white/10 p-4 font-mono text-sm flex items-center justify-between">
                      <code className="text-emerald-400 overflow-x-auto whitespace-nowrap mr-4">
                        curl -fsSL https://openclaw.ai/install.sh | bash
                      </code>
                      <button 
                        onClick={() => handleCopy('curl -fsSL https://openclaw.ai/install.sh | bash', 'mac-install')}
                        className="flex-shrink-0 p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-white glass-button rounded-lg transition-colors"
                        title="复制代码"
                      >
                        {copiedId === 'mac-install' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="glass-card rounded-xl p-4">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-indigo-500" /> 1. 运行引导向导
                      </h4>
                      <div className="flex items-center justify-between glass-panel rounded-lg p-2 font-mono text-xs">
                        <code className="text-indigo-600 dark:text-indigo-300">openclaw onboard --install-daemon</code>
                        <button onClick={() => handleCopy('openclaw onboard --install-daemon', 'mac-cmd1')} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
                          {copiedId === 'mac-cmd1' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-500" /> 2. 检查网关状态
                      </h4>
                      <div className="flex items-center justify-between glass-panel rounded-lg p-2 font-mono text-xs">
                        <code className="text-indigo-600 dark:text-indigo-300">openclaw gateway status</code>
                        <button onClick={() => handleCopy('openclaw gateway status', 'mac-cmd2')} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
                          {copiedId === 'mac-cmd2' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <LayoutTemplate className="w-4 h-4 text-blue-500" /> 3. 打开控制台 UI
                      </h4>
                      <div className="flex items-center justify-between glass-panel rounded-lg p-2 font-mono text-xs">
                        <code className="text-indigo-600 dark:text-indigo-300">openclaw dashboard</code>
                        <button onClick={() => handleCopy('openclaw dashboard', 'mac-cmd3')} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
                          {copiedId === 'mac-cmd3' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'win' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Windows (PowerShell) 快速安装</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">请以管理员身份运行 PowerShell 并执行以下命令。</p>
                  </div>

                  <div className="relative group mb-8">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative glass-panel rounded-xl border border-slate-800 dark:border-white/10 p-4 font-mono text-sm flex items-center justify-between">
                      <code className="text-emerald-400 overflow-x-auto whitespace-nowrap mr-4">
                        iwr -useb https://openclaw.ai/install.ps1 | iex
                      </code>
                      <button 
                        onClick={() => handleCopy('iwr -useb https://openclaw.ai/install.ps1 | iex', 'win-install')}
                        className="flex-shrink-0 p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-white glass-button rounded-lg transition-colors"
                        title="复制代码"
                      >
                        {copiedId === 'win-install' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="glass-card rounded-xl p-4">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-indigo-500" /> 1. 运行引导向导
                      </h4>
                      <div className="flex items-center justify-between glass-panel rounded-lg p-2 font-mono text-xs">
                        <code className="text-indigo-600 dark:text-indigo-300">openclaw onboard --install-daemon</code>
                        <button onClick={() => handleCopy('openclaw onboard --install-daemon', 'win-cmd1')} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
                          {copiedId === 'win-cmd1' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-500" /> 2. 检查网关状态
                      </h4>
                      <div className="flex items-center justify-between glass-panel rounded-lg p-2 font-mono text-xs">
                        <code className="text-indigo-600 dark:text-indigo-300">openclaw gateway status</code>
                        <button onClick={() => handleCopy('openclaw gateway status', 'win-cmd2')} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
                          {copiedId === 'win-cmd2' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <LayoutTemplate className="w-4 h-4 text-blue-500" /> 3. 打开控制台 UI
                      </h4>
                      <div className="flex items-center justify-between glass-panel rounded-lg p-2 font-mono text-xs">
                        <code className="text-indigo-600 dark:text-indigo-300">openclaw dashboard</code>
                        <button onClick={() => handleCopy('openclaw dashboard', 'win-cmd3')} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
                          {copiedId === 'win-cmd3' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'npm' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">NPM (所有系统通用)</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">如果您已经安装了 Node.js v18+，可以直接使用 npm 全局安装。</p>
                  </div>

                  <div className="relative group mb-8">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative glass-panel rounded-xl border border-slate-800 dark:border-white/10 p-4 font-mono text-sm flex items-center justify-between">
                      <code className="text-emerald-400 overflow-x-auto whitespace-nowrap mr-4">
                        npm install -g openclaw
                      </code>
                      <button 
                        onClick={() => handleCopy('npm install -g openclaw', 'npm-install')}
                        className="flex-shrink-0 p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-white glass-button rounded-lg transition-colors"
                        title="复制代码"
                      >
                        {copiedId === 'npm-install' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="glass-card rounded-xl p-4">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-indigo-500" /> 1. 运行引导向导
                      </h4>
                      <div className="flex items-center justify-between glass-panel rounded-lg p-2 font-mono text-xs">
                        <code className="text-indigo-600 dark:text-indigo-300">openclaw onboard --install-daemon</code>
                        <button onClick={() => handleCopy('openclaw onboard --install-daemon', 'npm-cmd1')} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
                          {copiedId === 'npm-cmd1' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-500" /> 2. 检查网关状态
                      </h4>
                      <div className="flex items-center justify-between glass-panel rounded-lg p-2 font-mono text-xs">
                        <code className="text-indigo-600 dark:text-indigo-300">openclaw gateway status</code>
                        <button onClick={() => handleCopy('openclaw gateway status', 'npm-cmd2')} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
                          {copiedId === 'npm-cmd2' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <LayoutTemplate className="w-4 h-4 text-blue-500" /> 3. 打开控制台 UI
                      </h4>
                      <div className="flex items-center justify-between glass-panel rounded-lg p-2 font-mono text-xs">
                        <code className="text-indigo-600 dark:text-indigo-300">openclaw dashboard</code>
                        <button onClick={() => handleCopy('openclaw dashboard', 'npm-cmd3')} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
                          {copiedId === 'npm-cmd3' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="px-6 py-24 border-t border-slate-200 dark:border-white/10 relative z-10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">AI时代 由人使用AI工具制作</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">探索由人类创造力与 AI 工具结合所产生的无限可能，见证未来的工作方式。</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* 视频 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-[9/16] w-full rounded-2xl overflow-hidden glass-panel shadow-lg"
            >
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/z8FRB4MlgKE" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </motion.div>

            {/* 视频 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-[9/16] w-full rounded-2xl overflow-hidden glass-panel shadow-lg"
            >
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/yEH1TPD19ok" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </motion.div>

            {/* 后续预留视频位置 1 (取消注释并替换 YOUR_VIDEO_ID_HERE 即可使用) */}
            {/* 
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="aspect-[9/16] w-full rounded-2xl overflow-hidden glass-panel shadow-lg"
            >
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </motion.div>
            */}

            {/* 后续预留视频位置 2 (取消注释并替换 YOUR_VIDEO_ID_HERE 即可使用) */}
            {/* 
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="aspect-[9/16] w-full rounded-2xl overflow-hidden glass-panel shadow-lg"
            >
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </motion.div>
            */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 border-t border-slate-200 dark:border-white/10 relative z-10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">核心能力</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">OpenClaw 提供了全方位的系统访问与智能控制能力，让 AI 真正成为您的私人助理。</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Cpu, color: "indigo", title: "本地运行", desc: "支持 Mac、Windows 或 Linux。可接入 Anthropic、OpenAI 或本地模型。默认保护隐私——您的数据始终属于您自己。" },
              { icon: MonitorSmartphone, color: "blue", title: "支持任意聊天应用", desc: "通过 WhatsApp、Telegram、Discord、Slack、Signal 或 iMessage 与它对话。支持私聊与群组聊天。" },
              { icon: BrainCircuit, color: "purple", title: "持久化记忆", desc: "它能记住您，并成为独一无二的专属助手。您的偏好、您的上下文、您的专属 AI。" },
              { icon: Globe, color: "emerald", title: "浏览器控制", desc: "它可以自主浏览网页、填写表单，并从任何网站中提取您需要的数据。" },
              { icon: Shield, color: "amber", title: "完整系统访问", desc: "读取和写入文件、运行 Shell 命令、执行脚本。完全访问或沙盒模式——由您决定。" },
              { icon: Puzzle, color: "rose", title: "技能与插件", desc: "通过社区技能进行扩展，或构建您自己的技能。它甚至可以自己编写技能代码。" }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl glass-card cursor-default"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${colorMap[feature.color]}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ClawHub Section */}
      <section className="px-6 py-24 border-t border-slate-200 dark:border-white/10 relative z-10 transition-colors overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-panel border-indigo-100 dark:border-indigo-500/20 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 lg:p-16"
          >
            <div className="flex-1 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                精英特工的技能平台
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                ClawHub
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
                上传 AgentSkills 包，像 npm 一样进行版本控制，并使用向量使其可搜索。无需任何门槛，只需发出信号即可。
              </p>
              <button 
                onClick={() => openWebPanel('https://clawhub.ai/', 'ClawHub 技能平台')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-button text-indigo-600 dark:text-indigo-400 rounded-xl font-semibold hover:-translate-y-1"
              >
                <Package className="w-5 h-5" />
                访问 ClawHub
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="w-full md:w-1/3 flex justify-center z-10 mt-8 md:mt-0">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-full flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 shadow-inner relative">
                <Package className="w-24 h-24 md:w-32 md:h-32 text-indigo-600 dark:text-indigo-400 relative z-10 drop-shadow-md" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem & Trust Section */}
      <section className="px-6 py-24 border-t border-slate-200 dark:border-white/10 relative z-10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">动态与信任中心</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">了解 OpenClaw 的最新进展，以及我们如何保障您的数据安全与隐私。</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Blog Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => openWebPanel('https://openclaw.ai/blog', 'OpenClaw 博客与播客')}
              className="group cursor-pointer p-8 rounded-3xl glass-card relative overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 glass-panel border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Newspaper className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass-panel text-[10px] font-medium text-emerald-700 dark:text-emerald-300 mb-4 self-start">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                最新发布
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">官方博客与播客</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">探索 OpenClaw 的最新功能更新、技术深度解析以及社区播客内容。点击阅读最新动态。</p>
            </motion.div>

            <div className="grid grid-rows-3 gap-6">
              {/* Shoutouts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                onClick={() => openWebPanel('https://openclaw.ai/shoutouts', '社区鸣谢')}
                className="group cursor-pointer p-6 rounded-2xl glass-card flex items-center gap-6"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 glass-panel border border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">社区鸣谢 (Shoutouts)</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">感谢所有为 OpenClaw 生态做出贡献的开发者与支持者。</p>
                </div>
              </motion.div>

              {/* Trust Center */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                onClick={() => openWebPanel('https://trust.openclaw.ai/', '信任中心')}
                className="group cursor-pointer p-6 rounded-2xl glass-card flex items-center gap-6"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 glass-panel border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">信任中心 (Trust Center)</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">了解我们的安全合规标准、隐私政策及数据保护措施。</p>
                </div>
              </motion.div>

              {/* Threat Model */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                onClick={() => openWebPanel('https://trust.openclaw.ai/trust/threatmodel', '威胁模型')}
                className="group cursor-pointer p-6 rounded-2xl glass-card flex items-center gap-6"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 glass-panel border border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">威胁模型 (Threat Model)</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">深入了解 OpenClaw 的安全架构与潜在威胁防护机制。</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-white/10 relative z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-lg">
                <div className="w-8 h-8 rounded-xl glass-panel flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Terminal className="w-5 h-5 text-indigo-600 dark:text-white" />
                </div>
                OpenClaw
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                本站由 Everett/xiaopeng Design and Development
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500 glass-panel px-3 py-1.5 rounded-full">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                {APP_VERSION} LTS
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <button onClick={() => openWebPanel('https://openclaw.ai/integrations', '集成')} className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-2">
                <Blocks className="w-4 h-4" /> 集成
              </button>
              <button onClick={() => openWebPanel('https://openclaw.ai/showcase', '展示案例')} className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-2">
                <Presentation className="w-4 h-4" /> 展示案例
              </button>
              <button onClick={() => openWebPanel('https://discord.com/invite/clawd', 'Discord 社区')} className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> 社区
              </button>
              <button onClick={() => openWebPanel('https://github.com/openclaw/openclaw', 'GitHub')} className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-2">
                <Github className="w-4 h-4" /> GitHub
              </button>
              <button onClick={() => openWebPanel('https://linktr.allapple.top/', 'Linktr')} className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-2">
                <Globe className="w-4 h-4" /> Linktr
              </button>
              <button onClick={() => setIsShareOpen(true)} className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" /> 分享
              </button>
            </div>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
}
