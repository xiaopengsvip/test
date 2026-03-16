import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Terminal, Shield, Zap, Globe, Cpu, Server, MessageSquare, Settings, Activity, Menu, X, ChevronRight, Copy, Check, ExternalLink, ChevronLeft, Maximize2, Minimize2 } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { PageTransition } from '../components/PageTransition';

const CodeBlock = ({ code, language = 'bash' }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = code.split('\n')
      .map(line => {
        if (line.trim().startsWith('#')) return '';
        if (line.includes(' # ')) return line.split(' # ')[0].trim();
        return line;
      })
      .filter(line => line.trim() !== '')
      .join('\n')
      .trim();
      
    navigator.clipboard.writeText(textToCopy || code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mt-3 mb-5">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md transition-colors"
          title="复制代码"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-xl overflow-x-auto text-sm font-mono border border-slate-800 shadow-inner">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function DocsViewer() {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('getting-started');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDetailedDate = (date: Date) => {
    return Math.floor(date.getTime() / 1000).toString();
  };

  const docSections = [
    {
      id: 'getting-started',
      title: '入门指南',
      icon: Zap,
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">入门指南</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            欢迎使用 OpenClaw！OpenClaw 是一个真正能做事的个人 AI 助手，它可以运行在您的设备上，并通过任何聊天应用（如 Telegram、WhatsApp）进行控制。
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">快速开始</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            使用 npm 全局安装最新版本的 OpenClaw：
          </p>
          <CodeBlock code="# 使用 npm 全局安装最新版 OpenClaw\nnpm install -g openclaw@latest" />
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">运行向导 (强烈推荐)</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            运行向导将通过交互式流程引导您完成设置，包括配置模型、渠道和安装系统服务。
          </p>
          <CodeBlock code="# 启动新手引导并自动安装后台守护进程服务\nopenclaw onboard --install-daemon" />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">连接渠道</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            配对您的聊天应用（例如 WhatsApp 或 Telegram）并启动 Gateway 网关：
          </p>
          <CodeBlock code="# 登录渠道并启动网关，指定端口为 18789\nopenclaw channels login openclaw gateway --port 18789" />
        </div>
      )
    },
    {
      id: 'core-concepts',
      title: '工作原理与核心功能',
      icon: Cpu,
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">工作原理与核心功能</h1>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">核心功能</h2>
          <ul className="space-y-4 text-slate-600 dark:text-slate-400 list-disc pl-6">
            <li><strong className="text-slate-900 dark:text-white">本地运行：</strong> 支持 Mac、Windows 或 Linux。可接入 Anthropic、OpenAI 或本地模型。默认保护隐私——您的数据始终属于您自己。</li>
            <li><strong className="text-slate-900 dark:text-white">支持任意聊天应用：</strong> 通过 WhatsApp、Telegram、Discord、Slack、Signal 或 iMessage 与它对话。支持私聊与群组聊天。</li>
            <li><strong className="text-slate-900 dark:text-white">持久化记忆：</strong> 它能记住您，并成为独一无二的专属助手。您的偏好、您的上下文、您的专属 AI。</li>
            <li><strong className="text-slate-900 dark:text-white">浏览器控制：</strong> 它可以自主浏览网页、填写表单，并从任何网站中提取您需要的数据。</li>
            <li><strong className="text-slate-900 dark:text-white">完整系统访问：</strong> 读取和写入文件、运行 Shell 命令、执行脚本。完全访问或沙盒模式——由您决定。</li>
            <li><strong className="text-slate-900 dark:text-white">技能与插件：</strong> 通过社区技能进行扩展，或构建您自己的技能。它甚至可以自己编写技能代码。</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">多智能体路由 (Multi-Agent Routing)</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            OpenClaw 支持工作区隔离和按智能体的会话管理。您可以派生出多个子智能体来并行处理不同的任务。
          </p>
          <CodeBlock code={'# 列出当前所有可用的智能体\\nopenclaw agents_list\\n\\n# 派生子智能体运行特定任务\\nopenclaw sessions_spawn --task "分析日志文件"'} />
        </div>
      )
    },
    {
      id: 'configuration',
      title: '配置与管理',
      icon: Settings,
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">配置与管理</h1>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">仪表板 (Dashboard)</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            OpenClaw 提供了一个强大的 Web 控制界面，用于管理聊天、配置和会话。
          </p>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400 list-disc pl-6 mb-4">
            <li>本地默认地址：<a href="http://127.0.0.1:18789/" target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">http://127.0.0.1:18789/</a></li>
            <li>远程访问：支持通过 Web 界面和 Tailscale 进行远程访问。</li>
          </ul>
          <CodeBlock code="# 打开 Web 控制仪表板\nopenclaw web" />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">配置文件</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            主配置文件位于 <code>~/.openclaw/config.yaml</code> 或 <code>~/.openclaw/openclaw.json</code>。
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            如果您不做任何修改，OpenClaw 将使用内置的二进制文件以 RPC 模式运行，并按发送者创建独立会话。如果您想要限制访问，可以配置白名单（allowFrom）和提及规则。
          </p>
          <CodeBlock language="yaml" code={`# 示例：配置 WhatsApp 渠道的白名单和群组提及规则
channels:
  whatsapp:
    allowFrom: 
      - "+15555550123"
    groups: 
      "*": 
        requireMention: true
messages:
  groupChat:
    mentionPatterns: 
      - "@openclaw"`} />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">节点管理 (Nodes)</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            支持 iOS 和 Android 节点的配对与 Canvas 功能。您可以查看节点状态、审批节点或向节点发送系统通知。
          </p>
          <CodeBlock code="# 查看当前所有节点的状态\nopenclaw nodes status\n\n# 运行系统诊断，检查并修复配置问题\nopenclaw doctor" />
        </div>
      )
    },
    {
      id: 'troubleshooting',
      title: '故障排除与安全',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">故障排除与安全</h1>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">安全控制</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            OpenClaw 提供了令牌、白名单和安全控制机制。建议在生产环境中始终配置 <code>allowFrom</code> 白名单，防止未授权用户访问您的 AI 助手。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">常见问题快速解决</h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">问题1：启动时一直提示 groupPolicy 警告</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">解决方法：在 config.yaml 中正确填写白名单：</p>
              <CodeBlock language="yaml" code={`channels:
  telegram:
    policy: "allowlist"
    allowFrom:
      - "6059736878"
      - "6687636872"
      - "1729650328"
    groupPolicy: "allowlist"
    groupAllowFrom: []`} />
            </div>

            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">问题2：浏览器命令报 attachOnly 错误</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">解决方法：修改浏览器配置：</p>
              <CodeBlock language="yaml" code={`browser:
  profiles:
    openclaw:
      attachOnly: false
      cdpPort: 18800`} />
            </div>

            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">问题3：飞书或 Telegram 不响应</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">解决方法：运行以下命令重启 Gateway 服务：</p>
              <CodeBlock code="# 重启 Gateway 服务以恢复渠道连接\nopenclaw gateway restart" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">系统诊断</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            如果遇到未知问题，强烈建议运行内置的医生检查命令，它会自动扫描并修复大多数配置问题。
          </p>
          <CodeBlock code="# 运行医生检查并自动修复配置问题（非常推荐）\nopenclaw doctor\n\n# 查看深度系统状态\nopenclaw status --deep" />
        </div>
      )
    },
    {
      id: 'official-docs',
      title: '官方文档 (Web)',
      icon: Globe,
      content: (
        <div className="flex flex-col items-center justify-center h-full min-h-[600px] bg-slate-50 dark:bg-[#0A0A0B] p-8 text-center">
          <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 border border-indigo-100 dark:border-indigo-500/20">
            <Globe className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">OpenClaw 官方文档</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md leading-relaxed">
            由于官方文档网站的安全策略限制，无法在当前页面内嵌显示。请点击下方按钮在安全的新标签页中打开完整的官方文档。
          </p>
          <a 
            href="https://docs.openclaw.ai/zh-CN/" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-sm"
          >
            <ExternalLink className="w-5 h-5" />
            在新标签页中打开官方文档
          </a>
        </div>
      )
    },
    {
      id: 'official-website',
      title: '官方网站 (Web)',
      icon: Globe,
      content: (
        <div className={`flex flex-col h-full w-full bg-white dark:bg-[#0A0A0B] ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
          <div className="flex items-center justify-between px-4 md:px-6 py-3 shrink-0 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0A0A0B]/80 backdrop-blur-md z-10">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">OpenClaw 官方网站</span>
              <span className="sm:hidden">官方网站</span>
            </h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="flex p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                title={isFullscreen ? "退出全屏" : "全屏显示"}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <a href="https://openclaw.ai/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:underline bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4" /> <span className="hidden sm:inline">新标签页打开</span>
              </a>
            </div>
          </div>
          <iframe src="https://openclaw.ai/" className="flex-1 w-full border-none bg-white dark:bg-[#0A0A0B]" title="Official Website" />
        </div>
      )
    }
  ];

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
          <span className="text-lg font-bold text-slate-900 dark:text-white">官方文档</span>
        </header>

        {/* Mobile Docs Navigation */}
        <div className="lg:hidden bg-white dark:bg-[#0D0D0F] border-b border-slate-200 dark:border-white/10 overflow-x-auto hide-scrollbar shrink-0">
          <div className="flex p-2 gap-2">
            {docSections.map((section) => (
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

        <div className="flex-1 flex overflow-hidden">
          {/* Docs Sidebar */}
          <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} shrink-0 border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D0D0F] hidden lg:flex flex-col transition-all duration-300 relative`}>
            <div className={`p-6 flex-1 overflow-y-auto ${isSidebarCollapsed ? 'px-4' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                {!isSidebarCollapsed && <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">文档目录</h2>}
                <button 
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className={`p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors ${isSidebarCollapsed ? 'mx-auto' : ''}`}
                  title={isSidebarCollapsed ? "展开目录" : "收起目录"}
                >
                  {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
              </div>
              <nav className="space-y-1">
                {docSections.map((section) => (
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

          {/* Docs Content */}
          <main className={`flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0A0A0B] transition-colors duration-300 ${
            activeSection.startsWith('official-') ? 'p-0' : 'p-6 md:p-12'
          }`}>
            <div className={`${activeSection.startsWith('official-') ? 'h-full w-full' : 'max-w-4xl mx-auto'}`}>
              {/* Mobile Breadcrumb */}
              {!activeSection.startsWith('official-') && (
                <div className="lg:hidden mb-6 flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <button onClick={() => navigate(-1)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    返回
                  </button>
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-slate-900 dark:text-white font-medium">
                    {docSections.find(s => s.id === activeSection)?.title}
                  </span>
                </div>
              )}

              {/* Content Area */}
              <div className={`bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none overflow-hidden ${
                activeSection.startsWith('official-') 
                  ? 'h-full flex flex-col border-0 rounded-none' 
                  : 'p-8 md:p-12 rounded-2xl border'
              }`}>
                {docSections.find(s => s.id === activeSection)?.content}
              </div>

              {/* Footer Info */}
              {!activeSection.startsWith('official-') && (
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
              )}
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
