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
import { FullscreenToggle } from './components/FullscreenToggle';
import { ThemeProvider } from './components/ThemeProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/docs" element={<ProtectedRoute><DocsViewer /></ProtectedRoute>} />
        <Route path="/tools" element={<ProtectedRoute><ToolsReference /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="openclaw-theme">
      <Router>
        <FullscreenToggle />
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}
