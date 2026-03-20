/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DocsViewer from './pages/DocsViewer';
import ToolsReference from './pages/ToolsReference';
import { DashboardLayout } from './layouts/DashboardLayout';
import { FullscreenToggle } from './components/FullscreenToggle';
import { ThemeProvider } from './components/ThemeProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

function AnimatedRoutes() {
  const location = useLocation();
  
  // We only want to animate top-level route changes, not nested ones
  // So we use a key based on whether it's an app route or not
  const isAppRoute = location.pathname.startsWith('/dashboard') || 
                     location.pathname.startsWith('/tools') || 
                     location.pathname.startsWith('/docs');
  const routeKey = isAppRoute ? 'app-routes' : location.pathname;

  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error - React 19 types issue with react-router-dom Routes */}
      <Routes location={location} key={routeKey}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected App Routes with Shared Layout */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tools" element={<ToolsReference />} />
          <Route path="/docs" element={<DocsViewer />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="openclaw-theme">
      <Router>
        {/* Global Animated Liquid Background */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/30 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-cyan-500/30 dark:bg-cyan-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-500/30 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>
        
        <FullscreenToggle />
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}
