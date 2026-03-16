import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommandBlock } from '../components/CommandBlock';
import { ShieldAlert, Globe, Settings, Terminal, LayoutDashboard, MonitorSmartphone, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('windows');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDetailedDate = (date: Date) => {
    return Math.floor(date.getTime() / 1000).toString();
  };

  const sections = [
    {
      id: 'windows',
      title: 'Windows 部署',
      icon: Terminal,
      content: (
        <div className="space-y-12">
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Windows 部署指南</h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              在这里查看和复制在 Windows 环境下安装 OpenClaw 的所有相关配置命令。请按顺序执行环境准备和安装步骤。
            </p>
          </header>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. 环境准备 (PowerShell)</h2>
            </div>
            
            <CommandBlock
              title="设置执行策略 (管理员身份)"
              command="Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned #管理员身份安装"
              description="允许在当前用户作用域内运行本地脚本，这是执行后续安装脚本的必要前提。"
            />
            
            <CommandBlock
              title="下载 Node.js LTS MSI"
              command={"$msi='https://nodejs.org/dist/v24.14.0/node-v24.14.0-x64.msi';\n$tmp=Join-Path $env:TEMP 'node-lts.msi';\nInvoke-WebRequest $msi -OutFile $tmp;"}
              description="从官方源下载 Node.js v24.14.0 的安装包到临时目录。"
              isMultiLine
            />
            
            <CommandBlock
              title="静默安装 Node.js"
              command="Start-Process msiexec.exe -ArgumentList '/i', $tmp, '/qn', '/norestart' -Wait;"
              description="在后台静默安装 Node.js，无需人工干预。"
            />

            <CommandBlock
              title="手动把 Node.js 加入当前会话 PATH"
              command="$env:PATH += ';C:\\Program Files\\nodejs\\'"
              description="将 Node.js 安装路径添加到当前 PowerShell 会话的环境变量中，使其立即生效。"
            />

            <CommandBlock
              title="修复 node.js 命令"
              command='Add-AppxPackage -Path "https://cdn.winget.microsoft.com/cache/source.msix"'
              description="通过 winget 修复可能存在的环境依赖问题。"
            />

            <CommandBlock
              title="修复 npm 命令"
              command='& "C:\\Program Files\\nodejs\\npm.cmd" -v'
              description="直接调用 npm.cmd 验证 npm 是否可用并修复路径关联。"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CommandBlock
                title="验证命令 node.js"
                command="node -v"
                description="检查 Node.js 版本"
              />
              <CommandBlock
                title="验证命令 npm"
                command="npm -v"
                description="检查 npm 版本"
              />
            </div>

            <CommandBlock
              title="安装 git 命令"
              command="winget install --id Git.Git -e --source winget"
              description="使用 winget 包管理器安装 Git 版本控制工具。"
            />

            <CommandBlock
              title="验证 git 命令"
              command="git --version"
              description="检查 Git 是否成功安装。"
            />
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. 安装与初始化 OpenClaw</h2>
            </div>

            <CommandBlock
              title="全局安装 OpenClaw"
              command="npm install -g openclaw;"
              description="使用 npm 全局安装 OpenClaw 核心包。"
            />

            <CommandBlock
              title="清理临时安装文件"
              command="Remove-Item $tmp -Force"
              description="删除之前下载的 Node.js 安装包，释放空间。"
            />

            <CommandBlock
              title="验证 openclaw 命令版本 / 启动配置向导"
              command="openclaw onboard --install-daemon"
              description="运行向导通过 openclaw onboard 和配对流程进行引导式设置，并安装后台守护进程。"
            />
            
            <CommandBlock
              title="重新向导"
              command="openclaw onboard"
              description="如果需要重新配置，可以再次运行此命令。"
            />
          </section>
        </div>
      )
    },
    {
      id: 'mac-linux',
      title: 'Mac/Linux 部署',
      icon: MonitorSmartphone,
      content: (
        <div className="space-y-12">
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Mac/Linux 部署指南</h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              在这里查看和复制在 macOS 和 Linux 环境下安装 OpenClaw 的所有相关配置命令。
            </p>
          </header>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. 一键安装脚本</h2>
            </div>
            
            <CommandBlock
              title="执行安装脚本"
              command="curl -fsSL https://openclaw.ai/install.sh | bash"
              description="此脚本将自动检测您的系统环境，安装 Node.js (如未安装) 并全局安装 OpenClaw。"
            />
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. 初始化与运行</h2>
            </div>

            <CommandBlock
              title="运行引导向导"
              command="openclaw onboard --install-daemon"
              description="启动配置向导，设置您的模型、渠道，并安装后台守护进程。"
            />

            <CommandBlock
              title="检查网关状态"
              command="openclaw gateway status"
              description="验证 OpenClaw Gateway 服务是否正常运行。"
            />

            <CommandBlock
              title="打开控制台 UI"
              command="openclaw dashboard"
              description="在浏览器中打开 OpenClaw 的 Web 管理界面。"
            />
          </section>
        </div>
      )
    },
    {
      id: 'advanced',
      title: '进阶与 API',
      icon: Globe,
      content: (
        <div className="space-y-12">
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">进阶与 API</h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              高级配置、API 接口及仪表板访问指南。
            </p>
          </header>

          <section>
            <CommandBlock
              title="浏览器验证 API (Telegram Webhook)"
              command="https://api.telegram.org/bot8669181859:AAE-CqaEW9l4UxbOVLrNNLyhb284nuimlbQ/deleteWebhook"
              description="在浏览器中访问此 URL 以删除 Telegram Bot 的 Webhook 绑定。"
            />

            <CommandBlock
              title="配置文件路径"
              command="~/.openclaw/openclaw.json"
              description="OpenClaw 的主配置文件路径。可以在此文件中配置渠道、白名单和提及规则。"
            />

            <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/10 mt-8 shadow-sm dark:shadow-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                仪表板访问
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                  本地默认地址：
                  <a href="http://127.0.0.1:18789/" target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium hover:underline">
                    http://127.0.0.1:18789/
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                  远程访问：Web 界面和 Tailscale
                </li>
              </ul>
            </div>
          </section>
        </div>
      )
    }
  ];

  return (
    <div className="flex-1 flex overflow-hidden h-full">
      {/* Mobile Navigation */}
      <div className="lg:hidden absolute top-0 left-0 right-0 bg-white dark:bg-[#0D0D0F] border-b border-slate-200 dark:border-white/10 overflow-x-auto hide-scrollbar z-20">
        <div className="flex p-2 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} shrink-0 border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D0D0F] hidden lg:flex flex-col transition-all duration-300 relative`}>
        <div className={`p-6 flex-1 overflow-y-auto ${isSidebarCollapsed ? 'px-4' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            {!isSidebarCollapsed && <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">部署目录</h2>}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors ${isSidebarCollapsed ? 'mx-auto' : ''}`}
              title={isSidebarCollapsed ? "展开目录" : "收起目录"}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                title={isSidebarCollapsed ? section.title : undefined}
                className={`w-full flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isSidebarCollapsed ? 'justify-center px-0' : 'px-3'
                } ${
                  activeSection === section.id
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <section.icon className={`w-5 h-5 shrink-0 ${activeSection === section.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                {!isSidebarCollapsed && <span className="truncate">{section.title}</span>}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0A0A0B] p-6 pt-16 lg:pt-6 md:p-12 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Mobile Breadcrumb */}
          <div className="lg:hidden mb-6 flex items-center text-sm text-slate-500 dark:text-slate-400">
            <span className="text-slate-900 dark:text-white font-medium">
              {sections.find(s => s.id === activeSection)?.title}
            </span>
          </div>

          <div className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none overflow-hidden p-8 md:p-12 rounded-2xl border">
            {sections.find(s => s.id === activeSection)?.content}
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 text-sm text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
  );
}
