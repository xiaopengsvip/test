import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommandBlock } from '../components/CommandBlock';
import { PageFooter } from '../components/PageFooter';
import { ShieldAlert, Globe, Settings, Terminal, LayoutDashboard, MonitorSmartphone, ChevronRight, ChevronLeft, Wrench, AlertCircle, RefreshCw, Trash2 } from 'lucide-react';

const WindowsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" className={className} fill="currentColor">
    <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453-35.67-4.904-.028-29.38zm4.326-39.04L87.314 0v41.26l-47.318.376zm47.329 39.349L87.314 88l-47.318-6.678-.011-35.145z"/>
  </svg>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('windows');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPrimarySidebarCollapsed, setIsPrimarySidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const handleSidebarChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsPrimarySidebarCollapsed(customEvent.detail.isCollapsed);
    };
    window.addEventListener('sidebar-collapse-change', handleSidebarChange);
    return () => window.removeEventListener('sidebar-collapse-change', handleSidebarChange);
  }, []);

  const sections = [
    {
      id: 'windows',
      title: 'Windows 部署',
      icon: WindowsIcon,
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
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. 环境准备 (请使用管理员权限运行 PowerShell)</h2>
            </div>
            
            <CommandBlock
              title="设置 PowerShell 执行策略"
              command="Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"
              description="允许运行本地脚本，这是执行后续安装命令的前提条件。"
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
              title="修复 node.js 命令 (可选)"
              command='Add-AppxPackage -Path "https://cdn.winget.microsoft.com/cache/source.msix"'
              description="通过 winget 修复可能存在的环境依赖问题。"
            />

            <CommandBlock
              title="修复 npm 命令 (可选)"
              command='& "C:\\Program Files\\nodejs\\npm.cmd" -v'
              description="直接调用 npm.cmd 验证 npm 是否可用并修复路径关联。"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CommandBlock
                title="验证命令 node"
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
              title="配置 npm 镜像加速 (国内用户强烈推荐)"
              command="npm config set registry https://registry.npmmirror.com"
              description="将 npm 下载源切换为淘宝镜像，大幅提升安装速度并减少网络报错。"
            />

            <CommandBlock
              title="安装 Git 命令"
              command="winget install --id Git.Git -e --source winget"
              description="使用 winget 包管理器安装 Git 版本控制工具。"
            />

            <CommandBlock
              title="验证 Git 命令"
              command="git --version"
              description="检查 Git 是否成功安装。"
            />
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. 安装与初始化 OpenClaw</h2>
            </div>

            <CommandBlock
              title="清理 npm 缓存 (推荐)"
              command="npm cache clean --force"
              description="在安装前清理缓存，避免因缓存损坏导致的安装失败。"
            />

            <CommandBlock
              title="全局安装 OpenClaw"
              command="npm install -g openclaw"
              description="使用 npm 全局安装 OpenClaw 核心包。"
            />

            <CommandBlock
              title="清理临时安装文件"
              command="Remove-Item $tmp -Force"
              description="删除之前下载的 Node.js 安装包，释放空间。"
            />

            <CommandBlock
              title="验证 openclaw 安装并启动配置向导"
              command="openclaw onboard --install-daemon"
              description="运行向导通过 openclaw onboard 和配对流程进行引导式设置，并安装后台守护进程。"
            />
            
            <CommandBlock
              title="重新向导"
              command="openclaw onboard"
              description="如果需要重新配置，可以再次运行此命令。"
            />
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <Wrench className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. 常见问题排查 (Troubleshooting)</h2>
            </div>

            <CommandBlock
              title="检查端口占用 (例如 3000 端口)"
              command='netstat -ano | findstr :3000'
              description="如果启动失败提示端口被占用，使用此命令查找占用该端口的进程 PID (最后一列数字)。"
            />

            <CommandBlock
              title="强制结束占用端口的进程"
              command="taskkill /PID <PID> /F"
              description="将 <PID> 替换为上一步查到的数字，强制结束该进程释放端口。"
            />

            <CommandBlock
              title="修复 npm 脚本执行权限问题"
              command="Set-ItemProperty -Path 'HKCU:\Software\Microsoft\Command Processor' -Name 'AutoRun' -Value ''"
              description="如果遇到 npm 脚本执行权限问题，可以尝试重置命令处理器的 AutoRun 注册表项。"
            />

            <CommandBlock
              title="解决 node-gyp 编译报错 (如安装依赖时提示 Python/C++ 缺失)"
              command="npm install --global windows-build-tools"
              description="自动安装 Python 和 Visual Studio 构建工具。注意：此过程可能需要较长时间，请耐心等待。"
            />

            <CommandBlock
              title="清除 npm 代理 (如果之前设置过导致网络错误)"
              command="npm config rm proxy&#10;npm config rm https-proxy"
              description="如果您关闭了代理软件但 npm 仍然报错网络连接失败，请清除 npm 的代理设置。"
              isMultiLine
            />
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4. 守护进程管理</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CommandBlock
                title="启动守护进程"
                command="openclaw daemon start"
                description="在后台启动 OpenClaw 服务。"
              />
              <CommandBlock
                title="停止守护进程"
                command="openclaw daemon stop"
                description="停止正在运行的 OpenClaw 服务。"
              />
            </div>

            <CommandBlock
              title="查看守护进程状态"
              command="openclaw daemon status"
              description="检查后台服务是否正在运行。"
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
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. 环境准备 (推荐使用 NVM)</h2>
            </div>
            
            <CommandBlock
              title="安装基础依赖 (Ubuntu/Debian)"
              command="sudo apt update && sudo apt install -y curl wget git build-essential"
              description="确保系统安装了 curl、git 和基础编译工具 (C++/Make)，这对于安装 Node.js 和原生依赖至关重要。"
            />

            <CommandBlock
              title="安装 NVM (Node Version Manager)"
              command='curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash'
              description="推荐使用 NVM 安装 Node.js，以避免全局权限问题 (EACCES errors)。"
            />

            <CommandBlock
              title="加载 NVM 环境变量"
              command='export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"&#10;[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'
              description="使 NVM 命令在当前终端会话中立即生效 (或者重启终端)。"
              isMultiLine
            />

            <CommandBlock
              title="持久化 NVM 配置 (写入 ~/.zshrc 或 ~/.bashrc)"
              command='echo &#39;export NVM_DIR="$HOME/.nvm"&#10;[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"&#39; >> ~/.zshrc && source ~/.zshrc'
              description="确保每次打开新终端时 NVM 都能自动加载。如果您使用的是 bash，请将 ~/.zshrc 替换为 ~/.bashrc。"
              isMultiLine
            />

            <CommandBlock
              title="安装 Node.js LTS 版本"
              command="nvm install --lts && nvm use --lts"
              description="下载并启用最新的 Node.js 长期支持版本。"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CommandBlock
                title="验证命令 node"
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
              title="配置 npm 镜像加速 (国内用户强烈推荐)"
              command="npm config set registry https://registry.npmmirror.com"
              description="将 npm 下载源切换为淘宝镜像，大幅提升安装速度并减少网络报错。"
            />

            <CommandBlock
              title="安装 Git (macOS)"
              command="brew install git"
              description="使用 Homebrew 安装 Git (macOS 用户)。"
            />

            <CommandBlock
              title="安装 Git (Ubuntu/Debian)"
              command="sudo apt update && sudo apt install git -y"
              description="使用 apt 包管理器安装 Git (Linux 用户)。"
            />
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. 安装与初始化 OpenClaw</h2>
            </div>
            
            <CommandBlock
              title="一键安装脚本 (可选)"
              command="curl -fsSL https://openclaw.ai/install.sh | bash"
              description="此脚本将自动检测您的系统环境，安装 Node.js (如未安装) 并全局安装 OpenClaw。"
            />

            <CommandBlock
              title="清理 npm 缓存 (推荐)"
              command="npm cache clean --force"
              description="在安装前清理缓存，避免因缓存损坏导致的安装失败。"
            />

            <CommandBlock
              title="全局安装 OpenClaw"
              command="npm install -g openclaw"
              description="使用 npm 全局安装 OpenClaw 核心包。如果未使用 NVM，可能需要加 sudo。"
            />

            <CommandBlock
              title="运行引导向导"
              command="openclaw onboard --install-daemon"
              description="启动配置向导，设置您的模型、渠道，并安装后台守护进程。"
            />

            <CommandBlock
              title="打开控制台 UI"
              command="openclaw dashboard"
              description="在浏览器中打开 OpenClaw 的 Web 管理界面。"
            />
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <Wrench className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. 常见问题排查 (Troubleshooting)</h2>
            </div>

            <CommandBlock
              title="修复 npm 全局权限问题 (未使用 NVM 时)"
              command="mkdir ~/.npm-global&#10;npm config set prefix '~/.npm-global'&#10;export PATH=~/.npm-global/bin:$PATH"
              description="如果您没有使用 NVM 且遇到 EACCES 权限错误，请配置 npm 使用本地目录。"
              isMultiLine
            />

            <CommandBlock
              title="检查端口占用 (例如 3000 端口)"
              command="lsof -i :3000"
              description="如果启动失败提示端口被占用，使用此命令查找占用该端口的进程 PID。"
            />

            <CommandBlock
              title="强制结束占用端口的进程"
              command="kill -9 <PID>"
              description="将 <PID> 替换为上一步查查到的数字，强制结束该进程释放端口。"
            />

            <CommandBlock
              title="解决 node-gyp 权限报错 (gyp ERR! permission denied)"
              command="sudo npm install -g openclaw --unsafe-perm=true --allow-root"
              description="如果在使用 sudo 全局安装时遇到 node-gyp 权限不足的错误，请添加 --unsafe-perm 标志。"
            />

            <CommandBlock
              title="终端提示 'openclaw: command not found'"
              command="npm root -g"
              description="检查 npm 全局安装路径。确保该路径的 bin 目录 (如 /usr/local/bin 或 ~/.npm-global/bin) 已添加到您的系统 PATH 环境变量中。"
            />
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4. 守护进程管理</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CommandBlock
                title="启动守护进程"
                command="openclaw daemon start"
                description="在后台启动 OpenClaw 服务。"
              />
              <CommandBlock
                title="停止守护进程"
                command="openclaw daemon stop"
                description="停止正在运行的 OpenClaw 服务。"
              />
            </div>

            <CommandBlock
              title="查看守护进程状态"
              command="openclaw daemon status"
              description="检查后台服务是否正在运行。"
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
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">手动前台运行</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <CommandBlock
                title="启动网关服务"
                command="openclaw gateway start"
                description="在前台运行 API 网关和控制台服务。"
              />
              <CommandBlock
                title="启动 Telegram 机器人"
                command="openclaw telegram start"
                description="在前台运行 Telegram 渠道服务。"
              />
              <CommandBlock
                title="启动 Discord 机器人"
                command="openclaw discord start"
                description="在前台运行 Discord 渠道服务。"
              />
              <CommandBlock
                title="启动微信机器人"
                command="openclaw wechat start"
                description="在前台运行微信渠道服务。"
              />
            </div>

            <div className="flex items-center gap-3 mb-8 mt-12">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">API 与配置</h2>
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

            <div className="glass-card rounded-2xl p-8 mt-8">
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
    },
    {
      id: 'troubleshooting',
      title: '常见问题与修复',
      icon: Wrench,
      content: (
        <div className="space-y-12">
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">常见问题与修复</h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              这里汇总了在使用和部署 OpenClaw 过程中可能遇到的常见问题及修复命令。
            </p>
          </header>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">通用修复命令</h2>
            </div>
            
            <CommandBlock
              title="查看运行日志"
              command="openclaw logs"
              description="查看 OpenClaw 守护进程的实时运行日志，用于排查报错原因。"
            />

            <CommandBlock
              title="查看详细日志 (Debug)"
              command="openclaw logs --level debug"
              description="查看包含调试信息的详细日志，适合深度排查问题。"
            />

            <CommandBlock
              title="清空运行日志"
              command="openclaw logs clear"
              description="清空所有历史运行日志，释放磁盘空间。"
            />

            <CommandBlock
              title="导出当前配置"
              command="openclaw config export ./backup.json"
              description="将当前的 OpenClaw 配置导出到指定文件，方便备份或迁移。"
            />

            <CommandBlock
              title="导入配置备份"
              command="openclaw config import ./backup.json"
              description="从指定的备份文件中恢复 OpenClaw 配置。"
            />

            <CommandBlock
              title="查看所有可用命令"
              command="openclaw help"
              description="列出 OpenClaw CLI 支持的所有命令及其说明。"
            />

            <CommandBlock
              title="查看当前版本"
              command="openclaw --version"
              description="检查当前安装的 OpenClaw 版本号。"
            />

            <CommandBlock
              title="强制重启守护进程"
              command="openclaw daemon restart"
              description="当服务卡死或配置未生效时，强制重启后台守护进程。"
            />

            <CommandBlock
              title="重置所有配置"
              command="openclaw reset"
              description="警告：此命令将清除所有本地配置和绑定信息，恢复到初始状态。"
            />

            <CommandBlock
              title="更新 OpenClaw"
              command="npm update -g openclaw"
              description="将 OpenClaw 更新到最新版本。"
            />
            
            <CommandBlock
              title="彻底卸载 OpenClaw"
              command="openclaw daemon stop && npm uninstall -g openclaw"
              description="停止服务并从系统中完全卸载 OpenClaw。"
            />
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <MonitorSmartphone className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">端口占用解决 (3000/18789端口)</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <CommandBlock
                title="Windows: 查找占用端口的进程"
                command="netstat -ano | findstr :18789"
                description="找到占用 18789 端口的 PID。"
              />
              <CommandBlock
                title="Windows: 强制结束进程"
                command="taskkill /PID <PID> /F"
                description="将 <PID> 替换为上一步查到的数字并执行。"
              />
              <CommandBlock
                title="Mac/Linux: 查找并结束进程"
                command="lsof -i :18789"
                description="查找占用端口的进程，然后使用 kill -9 <PID> 结束它。"
              />
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">环境与依赖修复</h2>
            </div>

            <CommandBlock
              title="清理 npm 缓存"
              command="npm cache clean --force"
              description="解决由于 npm 缓存损坏导致的安装失败问题。"
            />

            <CommandBlock
              title="重新安装依赖"
              command="npm install -g openclaw --force"
              description="强制重新下载并安装 OpenClaw，修复文件缺失或损坏问题。"
            />
          </section>
        </div>
      )
    }
  ];

  return (
    <div className="flex-1 flex overflow-hidden h-full">
      {/* Mobile Navigation */}
      <div className="lg:hidden absolute top-0 left-0 right-0 glass border-b border-slate-200 dark:border-white/10 overflow-x-auto hide-scrollbar z-20">
        <div className="flex p-2 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'glass-panel text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:glass-panel'
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} shrink-0 border-r border-slate-200 dark:border-white/10 glass hidden lg:flex flex-col transition-all duration-300 relative`}>
        <div className={`p-6 flex-1 overflow-y-auto ${isSidebarCollapsed ? 'px-4' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            {!isSidebarCollapsed && <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">部署目录</h2>}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:glass-panel rounded-lg transition-colors ${isSidebarCollapsed ? 'mx-auto' : ''}`}
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
                    ? 'glass-panel text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:glass-panel hover:text-slate-900 dark:hover:text-white'
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
      <main className="flex-1 overflow-y-auto p-6 pt-16 lg:pt-6 md:p-12 transition-colors duration-300">
        <div className={`mx-auto transition-all duration-300 ${(isPrimarySidebarCollapsed && isSidebarCollapsed) ? 'max-w-5xl 2xl:max-w-6xl' : 'max-w-4xl'}`}>
          {/* Mobile Breadcrumb */}
          <div className="lg:hidden mb-6 flex items-center text-sm text-slate-500 dark:text-slate-400">
            <span className="text-slate-900 dark:text-white font-medium">
              {sections.find(s => s.id === activeSection)?.title}
            </span>
          </div>

          <div className="glass-panel overflow-hidden p-8 md:p-12 rounded-2xl">
            {sections.find(s => s.id === activeSection)?.content}
          </div>

          <PageFooter />
        </div>
      </main>
    </div>
  );
}
