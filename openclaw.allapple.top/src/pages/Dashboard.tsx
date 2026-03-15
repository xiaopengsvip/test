import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommandBlock } from '../components/CommandBlock';
import { ShieldAlert, Globe, Settings, Menu, LayoutDashboard, Terminal } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export default function Dashboard() {
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
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0B] font-sans flex selection:bg-indigo-100 dark:selection:bg-indigo-500/30 overflow-hidden transition-colors duration-300">
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
          <span className="text-lg font-bold text-slate-900 dark:text-white">控制台</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8 md:mb-12 hidden md:block">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">部署与配置中心</h1>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                在这里查看和复制 OpenClaw 的所有相关配置命令。请按顺序执行环境准备和安装步骤。
              </p>
            </header>
            
            {/* Mobile Title */}
            <div className="md:hidden mb-8">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">部署与配置中心</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                在这里查看和复制 OpenClaw 的所有相关配置命令。请按顺序执行环境准备和安装步骤。
              </p>
            </div>

            <div className="space-y-12 md:space-y-16">
            {/* Section 1 */}
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

            {/* Section 2 */}
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

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. 运行与管理</h2>
              </div>

              <CommandBlock
                title="启动终端用户界面 (TUI)"
                command="openclaw tui"
                description="启动 OpenClaw 的终端用户界面 (Terminal User Interface)，提供直观的交互式命令行管理体验。"
              />

              <CommandBlock
                title="启动网关"
                command="openclaw gateway"
                description="启动 OpenClaw Gateway 网关服务。"
              />

              <CommandBlock
                title="重启网关"
                command="openclaw gateway restart"
                description="重新启动 OpenClaw Gateway 服务以应用新配置。"
              />

              <CommandBlock
                title="停止网关"
                command="openclaw gateway stop"
                description="安全停止 OpenClaw Gateway 服务。"
              />

              <CommandBlock
                title="配置会话命令聊天"
                command="openclaw channels add"
                description="添加并配置新的通讯渠道（如 WhatsApp, Telegram 等）。"
              />

              <CommandBlock
                title="配对 WhatsApp 并启动 Gateway 网关"
                command="openclaw channels login openclaw gateway --port 18789"
                description="登录 WhatsApp 渠道并指定网关运行端口为 18789。"
              />

              <CommandBlock
                title="升级 OpenClaw 版本"
                command="npm install -g openclaw@latest --force"
                description="强制更新 OpenClaw 到最新版本。"
              />
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4. 进阶与 API</h2>
              </div>

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
        </div>
        </main>
      </div>
    </div>
  );
}
