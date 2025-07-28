import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from '@/pages/LoginPage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ServersPage from '@/pages/ServersPage';
import ServerDashboard from '@/pages/ServerDashboard';
import ModulesPage from '@/pages/ModulesPage';
import ModerationPage from '@/pages/ModerationPage';
import LeaderboardPage from '@/pages/LeaderboardPage';
import CustomCommandsPage from '@/pages/CustomCommandsPage';
import ReactionRolesPage from '@/pages/ReactionRolesPage';
import EmbedCreatorPage from '@/pages/EmbedCreatorPage';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<ServersPage />} />
          <Route path="servers" element={<ServersPage />} />
          <Route path="servers/:serverId" element={<ServerDashboard />} />
          <Route path="servers/:serverId/modules" element={<ModulesPage />} />
          <Route path="servers/:serverId/moderation" element={<ModerationPage />} />
          <Route path="servers/:serverId/leaderboard" element={<LeaderboardPage />} />
          <Route path="servers/:serverId/commands" element={<CustomCommandsPage />} />
          <Route path="servers/:serverId/reaction-roles" element={<ReactionRolesPage />} />
          <Route path="servers/:serverId/embed-creator" element={<EmbedCreatorPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;