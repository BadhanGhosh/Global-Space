import React, { useState } from 'react';
import { HeaderNav, ViewType } from './components/HeaderNav';
import { HomeView } from './components/views/HomeView';
import { AgenciesView } from './components/views/AgenciesView';
import { CompaniesView } from './components/views/CompaniesView';
import { CountriesView } from './components/views/CountriesView';
import { MissionsView } from './components/views/MissionsView';
import { UniverseView } from './components/views/UniverseView';
import { ObservatoryView } from './components/views/ObservatoryView';
import { AiAssistantView } from './components/views/AiAssistantView';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [subTab, setSubTab] = useState<string | undefined>(undefined);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  const handleNavigate = (view: ViewType, requestedSubTab?: string) => {
    setCurrentView(view);
    setSubTab(requestedSubTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGlobalSearch = (query: string) => {
    setGlobalSearch(query);
  };

  return (
    <div className="min-h-screen bg-white text-[#101c2d] flex flex-col font-sans selection:bg-[#ef6a61]/20 selection:text-[#06152d]">
      {/* Persistent Navigation Header with Menu & Dropdowns */}
      <HeaderNav
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area: Switched by Current Subsection */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onGlobalSearch={handleGlobalSearch}
          />
        )}

        {currentView === 'agencies' && (
          <AgenciesView
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'companies' && (
          <CompaniesView
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'countries' && (
          <CountriesView
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'missions' && (
          <MissionsView
            onNavigate={handleNavigate}
            initialSearch={globalSearch}
          />
        )}

        {currentView === 'universe' && (
          <UniverseView
            onNavigate={handleNavigate}
            selectedTopicId={subTab || 'all'}
          />
        )}

        {currentView === 'observatory' && (
          <ObservatoryView
            onNavigate={handleNavigate}
            initialTab={subTab || 'orbital'}
          />
        )}

        {currentView === 'ai-assistant' && (
          <AiAssistantView
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer
        onNavigate={handleNavigate}
      />
    </div>
  );
}
