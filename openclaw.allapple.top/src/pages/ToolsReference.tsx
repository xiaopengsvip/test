import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal, PlayCircle, Server, LayoutDashboard, MonitorSmartphone, Users, Activity, Settings, FileText, HelpCircle, Copy, Check, Globe, MessageSquare, Clock, Cpu, Image as ImageIcon, Wrench, ChevronLeft, ChevronRight, Wrench as ToolIcon } from 'lucide-react';
import { PageFooter } from '../components/PageFooter';

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
    <div className="relative group mt-2 mb-4">
      <div className="absolute right-2 top-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-1.5 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md transition-colors shadow-sm border border-slate-200/50 dark:border-white/10"
          title="复制代码"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="bg-slate-50/80 dark:bg-black/40 text-slate-800 dark:text-slate-200 p-4 rounded-xl overflow-x-auto hide-scrollbar text-sm font-mono shadow-inner border border-slate-200/50 dark:border-white/5">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function ToolsReference() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('core-tools');
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

  const cliSections = [
    {
      title: "1. 安装命令",
      icon: Terminal,
      color: "text-indigo-500",
      bg: "glass-panel",
      darkBg: "",
      items: [
        { desc: "推荐一键安装脚本", code: "curl -fsSL https://openclaw.ai/install.sh | bash" },
        { desc: "Windows 用户使用", code: "iwr -useb https://openclaw.ai/install.ps1 | iex" },
        { desc: "使用 npm 全局安装最新版", code: "npm install -g openclaw@latest" }
      ]
    },
    {
      title: "2. 初始化与新手引导（强烈推荐第一次使用）",
      icon: PlayCircle,
      color: "text-emerald-500",
      bg: "glass-panel",
      darkBg: "",
      items: [
        { desc: "最推荐的新手完整引导命令（会自动配置模型、渠道、安装服务）", code: "openclaw onboard --install-daemon" },
        { desc: "仅初始化配置（不安装系统服务）", code: "openclaw init" }
      ]
    },
    {
      title: "3. Gateway 网关核心命令",
      icon: Server,
      color: "text-blue-500",
      bg: "glass-panel",
      darkBg: "",
      items: [
        { desc: "启动 Gateway（前台运行，可看到日志）", code: "openclaw gateway start" },
        { desc: "后台运行（作为系统服务，推荐生产环境使用）", code: "openclaw gateway start --daemon" },
        { desc: "查看 Gateway 当前运行状态", code: "openclaw gateway status" },
        { desc: "重启 Gateway 服务", code: "openclaw gateway restart" },
        { desc: "停止 Gateway 服务", code: "openclaw gateway stop" },
        { desc: "查看实时日志（持续监控）", code: "openclaw gateway logs --follow" }
      ]
    },
    {
      title: "4. Web 控制界面命令",
      icon: LayoutDashboard,
      color: "text-purple-500",
      bg: "glass-panel",
      darkBg: "",
      items: [
        { desc: "打开 Web 控制仪表板", code: "openclaw web" },
        { desc: "手动访问地址（默认）", code: "http://127.0.0.1:18789/" }
      ]
    },
    {
      title: "5. 浏览器控制命令",
      icon: MonitorSmartphone,
      color: "text-amber-500",
      bg: "glass-panel",
      darkBg: "",
      items: [
        { desc: "启动浏览器实例（使用 openclaw 配置）", code: "openclaw browser --browser-profile openclaw start" },
        { desc: "使用浏览器打开指定网页", code: "openclaw browser --browser-profile openclaw open https://x.com" },
        { desc: "对当前网页进行截图", code: "openclaw browser --browser-profile openclaw snapshot" },
        { desc: "查看浏览器当前状态", code: "openclaw browser --browser-profile openclaw status" }
      ]
    },
    {
      title: "6. 用户配对与审批命令（Telegram）",
      icon: Users,
      color: "text-pink-500",
      bg: "glass-panel",
      darkBg: "",
      items: [
        { desc: "批准某个 Telegram 用户（使用配对码）", code: "openclaw pairing approve telegram <配对码>\n\n# 示例：\nopenclaw pairing approve telegram P9U9CATH" },
        { desc: "查看所有待批准的用户列表", code: "openclaw pairing list telegram" }
      ]
    },
    {
      title: "7. 系统诊断与修复命令",
      icon: Activity,
      color: "text-rose-500",
      bg: "glass-panel",
      darkBg: "",
      items: [
        { desc: "运行医生检查并自动修复配置问题（非常推荐）", code: "openclaw doctor" },
        { desc: "强制修复所有问题", code: "openclaw doctor --repair" },
        { desc: "查看完整系统状态", code: "openclaw status" },
        { desc: "健康检查", code: "openclaw health" },
        { desc: "深度状态检查", code: "openclaw status --deep" }
      ]
    },
    {
      title: "8. 其他常用命令",
      icon: Settings,
      color: "text-slate-500 dark:text-slate-400",
      bg: "glass-panel",
      darkBg: "",
      items: [
        { desc: "发送测试消息", code: "openclaw message send --target \"用户ID或手机号\" --message \"你好\"" },
        { desc: "查看当前版本", code: "openclaw --version" },
        { desc: "查看所有帮助信息", code: "openclaw --help" }
      ]
    },
    {
      title: "9. 进阶服务与日志管理 (高级)",
      icon: Terminal,
      color: "text-indigo-500",
      bg: "glass-panel",
      darkBg: "",
      items: [
        { desc: "实时查看守护进程日志", code: "openclaw logs -f" },
        { desc: "查看最近 100 行日志", code: "openclaw logs --tail 100" },
        { desc: "手动编辑全局配置文件", code: "openclaw config edit" },
        { desc: "清理所有缓存数据", code: "openclaw cache clean" },
        { desc: "重置所有配置（危险操作）", code: "openclaw reset --force" }
      ]
    }
  ];

  const configLocations = [
    { label: "主配置文件", path: "~/.openclaw/config.yaml" },
    { label: "日志文件位置", path: "~/.openclaw/logs/openclaw.log 或临时目录" },
    { label: "浏览器配置目录", path: "~/.openclaw/browser-profiles/openclaw" }
  ];

  const faqs = [
    {
      q: "问题1：启动时一直提示 groupPolicy 警告",
      a: "解决方法：在 config.yaml 中正确填写白名单：",
      code: `channels:\n  telegram:\n    policy: "allowlist"\n    allowFrom:\n      - "6059736878"\n      - "6687636872"\n      - "1729650328"\n    groupPolicy: "allowlist"\n    groupAllowFrom: []`,
      language: "yaml"
    },
    {
      q: "问题2：浏览器命令报 attachOnly 错误",
      a: "解决方法：",
      code: `browser:\n  profiles:\n    openclaw:\n      attachOnly: false\n      cdpPort: 18800`,
      language: "yaml"
    },
    {
      q: "问题3：飞书或 Telegram 不响应",
      a: "解决方法：运行 openclaw gateway restart 重启服务"
    }
  ];

  const tools = [
    {
      name: "exec",
      icon: Terminal,
      color: "text-indigo-500",
      bg: "glass-panel",
      desc: "执行 Shell 命令。支持后台运行、超时控制、提权模式 (elevated)、指定主机 (sandbox | gateway | node) 等。",
      commands: ["command", "yieldMs", "background", "timeout", "elevated", "host", "security", "ask", "node", "pty"]
    },
    {
      name: "process",
      icon: Cpu,
      color: "text-blue-500",
      bg: "glass-panel",
      desc: "管理后台进程。可以轮询、查看日志、写入输入、终止或清除后台会话。",
      commands: ["list", "poll", "log", "write", "kill", "clear", "remove"]
    },
    {
      name: "web_search & web_fetch",
      icon: Globe,
      color: "text-emerald-500",
      bg: "glass-panel",
      desc: "网页搜索与抓取。web_search 使用 Brave API 进行搜索；web_fetch 抓取网页并提取为 Markdown 或纯文本。",
      commands: ["query", "count", "url", "extractMode", "maxChars"]
    },
    {
      name: "browser",
      icon: MonitorSmartphone,
      color: "text-amber-500",
      bg: "glass-panel",
      desc: "浏览器控制。支持打开标签页、截图、DOM 快照 (aria/ai)、UI 交互 (click/type/fill 等) 以及文件上传。",
      commands: ["start", "stop", "tabs", "open", "snapshot", "screenshot", "act", "navigate", "upload", "profiles"]
    },
    {
      name: "nodes",
      icon: Server,
      color: "text-purple-500",
      bg: "glass-panel",
      desc: "节点管理与系统控制。支持节点状态查看、审批、系统通知、运行命令、调用摄像头拍照/录像、获取地理位置。",
      commands: ["status", "approve", "notify", "run", "camera_snap", "screen_record", "location_get"]
    },
    {
      name: "message",
      icon: MessageSquare,
      color: "text-rose-500",
      bg: "glass-panel",
      desc: "消息与渠道控制。支持发送消息、投票、表情回应、置顶、权限管理、频道与群组管理等。",
      commands: ["send", "poll", "react", "pin", "thread-create", "role-add", "kick", "ban"]
    },
    {
      name: "cron",
      icon: Clock,
      color: "text-cyan-500",
      bg: "glass-panel",
      desc: "定时任务管理。添加、更新、移除和运行定时任务。",
      commands: ["status", "list", "add", "update", "remove", "run", "wake"]
    },
    {
      name: "gateway",
      icon: Wrench,
      color: "text-slate-500 dark:text-slate-400",
      bg: "glass-panel",
      desc: "网关配置与管理。支持重启网关、获取/应用/修补配置、运行更新。",
      commands: ["restart", "config.get", "config.apply", "config.patch", "update.run"]
    },
    {
      name: "sessions & agents",
      icon: Users,
      color: "text-orange-500",
      bg: "glass-panel",
      desc: "会话与智能体管理。列出历史会话、发送会话消息、派生子智能体运行任务、列出可用智能体。",
      commands: ["sessions_list", "sessions_history", "sessions_send", "sessions_spawn", "agents_list"]
    },
    {
      name: "image & canvas",
      icon: ImageIcon,
      color: "text-pink-500",
      bg: "glass-panel",
      desc: "图像处理与画布。直接使用图像模型处理图片，或控制 A2UI 画布。",
      commands: ["image", "prompt", "model", "canvas present", "canvas snapshot"]
    }
  ];

  const sections = [
    {
      id: 'core-tools',
      title: '核心工具',
      icon: ToolIcon,
      content: (
        <div className="space-y-12">
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">核心工具参考</h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              OpenClaw 提供了丰富的内置工具，支持智能体执行各种复杂任务。以下是核心工具清单及其支持的命令和参数。
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, idx) => (
              <div key={idx} className="glass-card p-6 hover:shadow-md hover:glass-panel transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center glass-panel`}>
                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tool.name}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                  {tool.desc}
                </p>
                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">支持的命令 / 参数</div>
                  <div className="flex flex-wrap gap-2">
                    {tool.commands.map((cmd, cIdx) => (
                      <span key={cIdx} className="px-2.5 py-1 glass-panel text-slate-700 dark:text-slate-300 text-xs font-mono rounded-md border border-slate-200 dark:border-white/10">
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'cli-commands',
      title: 'CLI 命令行',
      icon: Terminal,
      content: (
        <div className="space-y-12">
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">CLI 命令行参考</h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              OpenClaw 命令行工具的完整命令列表和使用示例。
            </p>
          </header>
          
          <div className="space-y-8">
            {cliSections.map((section, idx) => (
              <section key={idx} className="glass-panel p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${section.bg} ${section.darkBg} border border-transparent dark:border-white/10`}>
                    <section.icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx}>
                      <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">{item.desc}</p>
                      <CodeBlock code={item.code} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'config-files',
      title: '配置文件',
      icon: FileText,
      content: (
        <div className="space-y-12">
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">配置文件位置</h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              OpenClaw 的核心配置文件和日志文件存储路径。
            </p>
          </header>
          
          <section className="glass-panel p-6 md:p-8">
            <ul className="space-y-4">
              {configLocations.map((loc, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-700 dark:text-slate-300">
                  <span className="font-semibold min-w-[120px]">{loc.label}：</span>
                  <code className="px-3 py-1.5 glass-panel rounded-lg text-sm font-mono text-indigo-600 dark:text-indigo-400 break-all border border-slate-200 dark:border-white/10">
                    {loc.path}
                  </code>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )
    },
    {
      id: 'faq',
      title: '常见问题',
      icon: HelpCircle,
      content: (
        <div className="space-y-12">
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">常见问题快速解决</h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              遇到问题？这里有一些常见问题的快速解决方案。
            </p>
          </header>
          
          <section className="glass-panel p-6 md:p-8">
            <div className="space-y-8">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-100 dark:border-white/10 last:border-0 pb-6 last:pb-0">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{faq.q}</h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">{faq.a}</p>
                  {faq.code && <CodeBlock code={faq.code} language={faq.language} />}
                </div>
              ))}
            </div>
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
            {!isSidebarCollapsed && <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">工具目录</h2>}
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

          <div className="glass-panel p-8 md:p-12 rounded-2xl">
            {sections.find(s => s.id === activeSection)?.content}
          </div>

          <PageFooter />
        </div>
      </main>
    </div>
  );
}

