import { useState, useEffect } from 'react';
import { Maximize, Minimize } from 'lucide-react';

// 扩展类型以支持各浏览器的前缀 API
interface DocumentWithFullscreen extends Document {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
}

interface HTMLElementWithFullscreen extends HTMLElement {
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
}

export function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPseudoFullscreen, setIsPseudoFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as DocumentWithFullscreen;
      const isCurrentlyFullscreen = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    // 监听所有可能的全屏事件
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    const doc = document as DocumentWithFullscreen;
    const el = document.documentElement as HTMLElementWithFullscreen;

    const isCurrentlyFullscreen = !!(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    );

    if (!isCurrentlyFullscreen && !isPseudoFullscreen) {
      try {
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
          await el.mozRequestFullScreen();
        } else if (el.msRequestFullscreen) {
          await el.msRequestFullscreen();
        } else {
          // Apple iOS iPhone Safari 降级方案 (Pseudo Fullscreen)
          enablePseudoFullscreen();
        }
      } catch (err) {
        console.warn(`Fullscreen API error or blocked:`, err);
        // 如果 API 调用失败（例如在某些 iOS 环境中），使用降级方案
        enablePseudoFullscreen();
      }
    } else {
      if (isPseudoFullscreen) {
        disablePseudoFullscreen();
      } else {
        try {
          if (doc.exitFullscreen) {
            await doc.exitFullscreen();
          } else if (doc.webkitExitFullscreen) {
            await doc.webkitExitFullscreen();
          } else if (doc.mozCancelFullScreen) {
            await doc.mozCancelFullScreen();
          } else if (doc.msExitFullscreen) {
            await doc.msExitFullscreen();
          }
        } catch (err) {
          console.warn(`Exit Fullscreen API error:`, err);
        }
      }
    }
  };

  const enablePseudoFullscreen = () => {
    setIsPseudoFullscreen(true);
    // 针对 iOS 的视觉全屏优化 (伪全屏)
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.bottom = '0';
    document.body.style.width = '100vw';
    document.body.style.height = '100dvh';
    document.body.style.zIndex = '99999';
    document.body.style.overflow = 'auto';
    
    // 尝试隐藏地址栏
    window.scrollTo(0, 1);
  };

  const disablePseudoFullscreen = () => {
    setIsPseudoFullscreen(false);
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.bottom = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.style.zIndex = '';
    document.body.style.overflow = '';
  };

  const active = isFullscreen || isPseudoFullscreen;

  return (
    <button
      onClick={toggleFullscreen}
      className="fixed bottom-6 right-6 z-[99999] p-3 bg-indigo-600/80 backdrop-blur-md text-white rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:bg-indigo-500 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent"
      title={active ? "退出全屏" : "全屏显示"}
    >
      {active ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
    </button>
  );
}
