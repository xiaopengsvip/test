import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Lock, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string | null;
}

export function LoginSidebar({ isOpen, onClose, redirectUrl }: LoginSidebarProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin@123') {
      localStorage.setItem('isAuthenticated', 'true');
      onClose();
      navigate(redirectUrl || '/dashboard');
    } else {
      setError('账号或密码错误');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md glass shadow-2xl z-50 flex flex-col border-l border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">登录控制台</h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:glass-panel transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex justify-center mb-8 mt-4">
                <div className="w-16 h-16 glass-panel rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20">
                  <Terminal className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              
              <p className="text-center text-slate-500 dark:text-slate-400 mb-8 text-sm">
                请输入您的管理员凭证以继续
              </p>

              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <div className="p-3 glass-panel border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-lg border text-center">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    账号
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="请输入账号"
                      className="block w-full pl-10 pr-3 py-2.5 glass-panel rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    密码
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="请输入密码"
                      className="block w-full pl-10 pr-3 py-2.5 glass-panel rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors mt-8"
                >
                  登录
                </button>
              </form>
            </div>

            <div className="p-6 glass-panel border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                提示：请使用系统初始化时配置的默认管理员凭证登录。
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
                安全提示：请妥善保管您的管理员凭证，不要泄露给他人。
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
