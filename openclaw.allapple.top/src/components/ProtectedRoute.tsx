import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, UserPlus, ArrowLeft } from 'lucide-react';
import { PageTransition } from './PageTransition';
import { LoginSidebar } from './LoginSidebar';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <PageTransition className="min-h-screen bg-slate-50 dark:bg-[#0A0A0B] flex items-center justify-center p-4 transition-colors duration-300">
        <LoginSidebar 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          redirectUrl={location.pathname} 
        />
        <div className="max-w-md w-full glass-panel rounded-3xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden text-center p-8 md:p-10">
          <div className="w-20 h-20 glass-panel rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-100 dark:border-indigo-500/20">
            <Lock className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">需要登录访问</h2>
          
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            您当前未登录或登录已过期。请登录后继续访问此页面。如果您还没有账号，请联系系统管理员申请。
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors shadow-sm"
            >
              <ShieldAlert className="w-5 h-5" />
              立即登录
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 glass-button text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回首页
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <UserPlus className="w-4 h-4" />
              <span>无账号？请联系管理员微信: <span className="font-mono text-slate-700 dark:text-slate-300">Azaqwsx000</span></span>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return <>{children}</>;
}
