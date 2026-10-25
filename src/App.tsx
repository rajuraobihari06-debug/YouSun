import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeFeed } from './components/HomeFeed';
import { WatchView } from './components/WatchView';
import { SettingsHub } from './components/SettingsHub';
import { StudioView } from './components/StudioView';
import { LibraryView } from './components/LibraryView';
import { UploadModal } from './components/UploadModal';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans antialiased transition-colors duration-150">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        {/* Do not show full sidebar in watch mode if theater mode or mobile */}
        {currentView !== 'watch' && <Sidebar />}

        <main className="flex-1 overflow-y-auto">
          {currentView === 'home' && <HomeFeed />}
          {currentView === 'watch' && <WatchView />}
          {currentView === 'settings' && <SettingsHub />}
          {currentView === 'studio' && <StudioView />}
          {currentView === 'downloads' && <LibraryView mode="downloads" />}
          {currentView === 'history' && <LibraryView mode="history" />}
          {currentView === 'subscriptions' && <LibraryView mode="subscriptions" />}
          {currentView === 'library' && <LibraryView mode="library" />}
        </main>
      </div>

      <UploadModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
