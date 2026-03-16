import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal, PlayCircle, Server, LayoutDashboard, MonitorSmartphone, Users, Activity, Settings, FileText, HelpCircle, Menu, Copy, Check, Globe, MessageSquare, Clock, Cpu, Image as ImageIcon, Wrench } from 'lucide-react';
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
    <div className="relative group mt-2 mb-4">
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

export default function ToolsReference() {
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

  const sections = [
    {
      title: "1. 安装命令",
      icon: Terminal,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      darkBg: "dark:bg-indigo-500/10",
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
      bg: "bg-emerald-50",
      darkBg: "dark:bg-emerald-500/10",
      items: [
        { desc: "最推荐的新手完整引导命令（会自动配置模型、渠道、安装服务）", code: "openclaw onboard --install-daemon" },
        { desc: "仅初始化配置（不安装系统服务）", code: "openclaw init" }
      ]
    },
    {
      title: "3. Gateway 网关核心命令",
      icon: Server,
      color: "text-blue-500",
      bg: "bg-blue-50",
      darkBg: "dark:bg-blue-500/10",
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
      bg: "bg-purple-50",
      darkBg: "dark:bg-purple-500/10",
      items: [
        { desc: "打开 Web 控制仪表板", code: "openclaw web" },
        { desc: "手动访问地址（默认）", code: "http://127.0.0.1:18789/" }
      ]
    },
    {
      title: "5. 浏览器控制命令",
      icon: MonitorSmartphone,
      color: "text-amber-500",
      bg: "bg-amber-50",
      darkBg: "dark:bg-amber-500/10",
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
      bg: "bg-pink-50",
      darkBg: "dark:bg-pink-500/10",
      items: [
        { desc: "批准某个 Telegram 用户（使用配对码）", code: "openclaw pairing approve telegram <配对码>\n\n# 示例：\nopenclaw pairing approve telegram P9U9CATH" },
        { desc: "查看所有待批准的用户列表", code: "openclaw pairing list telegram" }
      ]
    },
    {
      title: "7. 系统诊断与修复命令",
      icon: Activity,
      color: "text-rose-500",
      bg: "bg-rose-50",
      darkBg: "dark:bg-rose-500/10",
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
      color: "text-slate-500",
      bg: "bg-slate-50",
      darkBg: "dark:bg-slate-500/10",
      items: [
        { desc: "发送测试消息", code: "openclaw message send --target \"用户ID或手机号\" --message \"你好\"" },
        { desc: "查看当前版本", code: "openclaw --version" },
        { desc: "查看所有帮助信息", code: "openclaw --help" }
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
      bg: "bg-indigo-50",
      desc: "执行 Shell 命令。支持后台运行、超时控制、提权模式 (elevated)、指定主机 (sandbox | gateway | node) 等。",
      commands: ["command", "yieldMs", "background", "timeout", "elevated", "host", "security", "ask", "node", "pty"]
    },
    {
      name: "process",
      icon: Cpu,
      color: "text-blue-500",
      bg: "bg-blue-50",
      desc: "管理后台进程。可以轮询、查看日志、写入输入、终止或清除后台会话。",
      commands: ["list", "poll", "log", "write", "kill", "clear", "remove"]
    },
    {
      name: "web_search & web_fetch",
      icon: Globe,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      desc: "网页搜索与抓取。web_search 使用 Brave API 进行搜索；web_fetch 抓取网页并提取为 Markdown 或纯文本。",
      commands: ["query", "count", "url", "extractMode", "maxChars"]
    },
    {
      name: "browser",
      icon: MonitorSmartphone,
      color: "text-amber-500",
      bg: "bg-amber-50",
      desc: "浏览器控制。支持打开标签页、截图、DOM 快照 (aria/ai)、UI 交互 (click/type/fill 等) 以及文件上传。",
      commands: ["start", "stop", "tabs", "open", "snapshot", "screenshot", "act", "navigate", "upload", "profiles"]
    },
    {
      name: "nodes",
      icon: Server,
      color: "text-purple-500",
      bg: "bg-purple-50",
      desc: "节点管理与系统控制。支持节点状态查看、审批、系统通知、运行命令、调用摄像头拍照/录像、获取地理位置。",
      commands: ["status", "approve", "notify", "run", "camera_snap", "screen_record", "location_get"]
    },
    {
      name: "message",
      icon: MessageSquare,
      color: "text-rose-500",
      bg: "bg-rose-50",
      desc: "消息与渠道控制。支持发送消息、投票、表情回应、置顶、权限管理、频道与群组管理等。",
      commands: ["send", "poll", "react", "pin", "thread-create", "role-add", "kick", "ban"]
    },
    {
      name: "cron",
      icon: Clock,
      color: "text-cyan-500",
      bg: "bg-cyan-50",
      desc: "定时任务管理。添加、更新、移除和运行定时任务。",
      commands: ["status", "list", "add", "update", "remove", "run", "wake"]
    },
    {
      name: "gateway",
      icon: Wrench,
      color: "text-slate-500",
      bg: "bg-slate-50",
      desc: "网关配置与管理。支持重启网关、获取/应用/修补配置、运行更新。",
      commands: ["restart", "config.get", "config.apply", "config.patch", "update.run"]
    },
    {
      name: "sessions & agents",
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-50",
      desc: "会话与智能体管理。列出历史会话、发送会话消息、派生子智能体运行任务、列出可用智能体。",
      commands: ["sessions_list", "sessions_history", "sessions_send", "sessions_spawn", "agents_list"]
    },
    {
      name: "image & canvas",
      icon: ImageIcon,
      color: "text-pink-500",
      bg: "bg-pink-50",
      desc: "图像处理与画布。直接使用图像模型处理图片，或控制 A2UI 画布。",
      commands: ["image", "prompt", "model", "canvas present", "canvas snapshot"]
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
          <span className="text-lg font-bold text-slate-900 dark:text-white">工具</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> 返回
            </button>

            <header className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">OpenClaw 完整命令与使用文档</h1>
            </header>

            <div className="space-y-8">
              {/* 内置核心工具与命令参考 */}
              <section className="mb-12">
                <header className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">工具与命令参考</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    OpenClaw 提供了丰富的内置工具，支持智能体执行各种复杂任务。以下是核心工具清单及其支持的命令和参数。
                  </p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tools.map((tool, idx) => (
                    <div key={idx} className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-md dark:hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.bg} dark:bg-white/5 border border-transparent dark:border-white/10`}>
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
                            <span key={cIdx} className="px-2.5 py-1 bg-slate-100 dark:bg-black/30 text-slate-700 dark:text-slate-300 text-xs font-mono rounded-md border border-slate-200 dark:border-white/10">
                              {cmd}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CLI 命令参考 */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">CLI 命令行参考</h2>
              </div>
              
              {sections.map((section, idx) => (
                <section key={idx} className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
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

              {/* 配置文件位置 */}
              <section className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-white/5 border border-transparent dark:border-white/10">
                    <FileText className="w-6 h-6 text-slate-500" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">配置文件位置</h2>
                </div>
                <ul className="space-y-3">
                  {configLocations.map((loc, idx) => (
                    <li key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-700 dark:text-slate-300">
                      <span className="font-semibold min-w-[120px]">{loc.label}：</span>
                      <code className="px-2 py-1 bg-slate-100 dark:bg-black/30 rounded text-sm font-mono text-indigo-600 dark:text-indigo-400 break-all">
                        {loc.path}
                      </code>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 常见问题快速解决 */}
              <section className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-50 dark:bg-amber-500/10 border border-transparent dark:border-white/10">
                    <HelpCircle className="w-6 h-6 text-amber-500" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">常见问题快速解决</h2>
                </div>
                
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
    </PageTransition>
  );
}
