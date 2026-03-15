/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DocsViewer from './pages/DocsViewer';
import ToolsReference from './pages/ToolsReference';
import { FullscreenToggle } from './components/FullscreenToggle';
import { ThemeProvider } from './components/ThemeProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  // 强制刷新 GitHub Diff 状态 (v2026.03.16.0121)
  return (
    <ThemeProvider defaultTheme="system" storageKey="openclaw-theme">
      <Router>
        <FullscreenToggle />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/docs" element={<ProtectedRoute><DocsViewer /></ProtectedRoute>} />
          <Route path="/tools" element={<ProtectedRoute><ToolsReference /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
