import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommandBlock } from '../components/CommandBlock';
import { Terminal, ShieldAlert, MonitorSmartphone, Menu, ArrowLeft } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { PageTransition } from '../components/PageTransition';

export default function MacLinuxInstall() {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDetailedDate = (date: Date) => {
    return Math.floor(date.getTime() / 1000).toString();
  };

  return (
    <PageTransition className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0B] font-sans flex selection:bg-indigo-100 dark:selection:bg-indigo-500/30 overflow-hidden transition-colors duration-300">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white dark:bg-[#0D0D0F] border-b border-slate-200 dark:border-white/10 flex items-center px-4 shrink-0 sticky top-0 z-30 transition-colors duration-300">
          <button 
            className="p-2 -ml-2 mr-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-lg font-bold text-slate-900 dark:text-white">Mac/Linux 安装</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> 返回
            </button>

            <header className="mb-8 md:mb-12 hidden md:block">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Mac & Linux 部署指南</h1>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                在这里查看和复制在 macOS 和 Linux 环境下安装 OpenClaw 的常见命令。
              </p>
            </header>
            
            {/* Mobile Title */}
            <div className="md:hidden mb-8">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Mac & Linux 部署指南</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                在这里查看和复制在 macOS 和 Linux 环境下安装 OpenClaw 的常见命令。
              </p>
            </div>

            <div className="space-y-12 md:space-y-16">
              {/* Section 1: Mac */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <MonitorSmartphone className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. macOS 安装指南</h2>
                </div>
                
                <CommandBlock
                  title="安装 Homebrew (如果尚未安装)"
                  command='/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
                  description="Homebrew 是 macOS 上最流行的包管理器，用于安装 Node.js 和 Git 等依赖。"
                />
                
                <CommandBlock
                  title="使用 Homebrew 安装 Node.js 和 Git"
                  command="brew install node git"
                  description="安装最新的 Node.js 运行环境和 Git 版本控制工具。"
                />
                
                <CommandBlock
                  title="验证安装"
                  command="node -v && npm -v && git --version"
                  description="检查 Node.js、npm 和 Git 是否成功安装。"
                />

                <CommandBlock
                  title="全局安装 OpenClaw"
                  command="npm install -g openclaw"
                  description="使用 npm 全局安装 OpenClaw 核心包。"
                />
              </section>

              {/* Section 2: Linux */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. Linux 安装指南 (Ubuntu/Debian)</h2>
                </div>

                <CommandBlock
                  title="更新系统包列表"
                  command="sudo apt update && sudo apt upgrade -y"
                  description="确保系统软件包是最新的。"
                />

                <CommandBlock
                  title="安装 Node.js (使用 NodeSource)"
                  command="curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -\nsudo apt-get install -y nodejs"
                  description="添加 NodeSource 仓库并安装 Node.js LTS 版本。"
                  isMultiLine
                />

                <CommandBlock
                  title="安装 Git 和构建工具"
                  command="sudo apt install -y git build-essential"
                  description="安装 Git 和一些编译原生 npm 模块可能需要的构建工具。"
                />

                <CommandBlock
                  title="验证安装"
                  command="node -v && npm -v && git --version"
                  description="检查 Node.js、npm 和 Git 是否成功安装。"
                />

                <CommandBlock
                  title="全局安装 OpenClaw"
                  command="sudo npm install -g openclaw"
                  description="使用 sudo 权限全局安装 OpenClaw 核心包。"
                />
              </section>

              {/* Section 3: 通用初始化 */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. 初始化与运行 (Mac/Linux 通用)</h2>
                </div>

                <CommandBlock
                  title="一键安装脚本 (推荐)"
                  command="curl -fsSL https://openclaw.ai/install.sh | bash"
                  description="如果你不想手动执行上述步骤，可以直接使用官方提供的一键安装脚本。"
                />

                <CommandBlock
                  title="启动配置向导"
                  command="openclaw onboard --install-daemon"
                  description="运行向导进行引导式设置，并安装后台守护进程。"
                />

                <CommandBlock
                  title="启动终端用户界面 (TUI)"
                  command="openclaw tui"
                  description="启动 OpenClaw 的终端交互界面。"
                />
              </section>

            </div>

            {/* Footer Info */}
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 text-sm text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p>最后更新：<span className="font-mono text-slate-700 dark:text-slate-300">{formatDetailedDate(currentTime)}</span></p>
                <p className="mt-1">编辑人：<span className="font-medium text-slate-700 dark:text-slate-300">本站官方人员 Everett</span></p>
              </div>
              <div className="sm:text-right">
                <p>本站如遇有其他问题可以反馈至邮箱：</p>
                <a href="mailto:Everett@allapple.top" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Everett@allapple.top</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
