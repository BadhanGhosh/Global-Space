import React, { useState } from 'react';
import { Menu, X, ChevronDown, Sparkles, ExternalLink, Activity } from 'lucide-react';

export type ViewType =
  | 'home'
  | 'agencies'
  | 'companies'
  | 'countries'
  | 'missions'
  | 'universe'
  | 'observatory'
  | 'ai-assistant';

interface HeaderNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType, subTab?: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectorDropdownOpen, setSectorDropdownOpen] = useState(false);
  const [universeDropdownOpen, setUniverseDropdownOpen] = useState(false);
  const [observatoryDropdownOpen, setObservatoryDropdownOpen] = useState(false);

  const handleNavClick = (view: ViewType, subTab?: string) => {
    onNavigate(view, subTab);
    setMobileMenuOpen(false);
    setSectorDropdownOpen(false);
    setUniverseDropdownOpen(false);
    setObservatoryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Topline bar (User's authentic header element) */}
      <div className="h-[34px] bg-[#031126] text-[#d8e5f4] text-[10px] font-sans font-bold tracking-[0.13em] uppercase flex items-center justify-between px-6 border-b border-[#0f2747]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#6ed6a2] shadow-[0_0_0_3px_rgba(110,214,162,0.2)] animate-pulse" />
          <span>GLOBAL SPACE & COSMIC EXPLORATION</span>
        </div>
        <div className="hidden sm:block text-slate-400">
          SPACE • SCIENCE • INDUSTRY
        </div>
      </div>

      {/* 2. Site Header */}
      <header className="sticky top-0 z-50 bg-[#06152d]/98 backdrop-blur-md border-b border-[#14294a] text-white">
        <div className="max-w-[1240px] mx-auto px-6 h-[76px] flex items-center justify-between">
          {/* Brand Mark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="flex flex-col gap-1 shrink-0">
              <span className="w-4 h-[3px] bg-[#d83b35] rounded-xs" />
              <span className="w-6 h-[3px] bg-white rounded-xs" />
              <span className="w-3 h-[3px] bg-[#38bdf8] rounded-xs" />
            </div>
            <div>
              <div className="font-display font-bold text-lg sm:text-xl tracking-tight leading-none text-white">
                GLOBAL<span className="font-light text-slate-300">SPACE</span>
              </div>
              <div className="text-[9px] font-sans tracking-[0.15em] text-[#d83b35] font-bold uppercase mt-1">
                INDEPENDENT SPACE OBSERVATORY
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[12px] font-sans font-semibold tracking-wider">
            {/* HOME */}
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#ef6a61] transition-colors ${currentView === 'home' ? 'text-[#ef6a61] border-b-2 border-[#ef6a61] pb-1' : 'text-slate-200'}`}
            >
              HOME
            </button>

            {/* SPACE SECTOR ▾ */}
            <div
              className="relative group py-6"
              onMouseEnter={() => setSectorDropdownOpen(true)}
              onMouseLeave={() => setSectorDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 hover:text-[#ef6a61] transition-colors ${['agencies', 'companies', 'countries', 'missions'].includes(currentView) ? 'text-[#ef6a61]' : 'text-slate-200'}`}
              >
                <span>SPACE SECTOR</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {sectorDropdownOpen && (
                <div className="absolute top-[68px] left-0 w-60 bg-white text-slate-800 rounded-b-md shadow-2xl border-t-3 border-[#d83b35] py-2 z-50">
                  <button
                    onClick={() => handleNavClick('agencies')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Space Agencies
                  </button>
                  <button
                    onClick={() => handleNavClick('companies')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Private Space Industry
                  </button>
                  <button
                    onClick={() => handleNavClick('countries')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Countries & Capabilities
                  </button>
                  <button
                    onClick={() => handleNavClick('missions')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Missions & Flight History
                  </button>
                </div>
              )}
            </div>

            {/* THE UNIVERSE ▾ */}
            <div
              className="relative group py-6"
              onMouseEnter={() => setUniverseDropdownOpen(true)}
              onMouseLeave={() => setUniverseDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 hover:text-[#ef6a61] transition-colors ${currentView === 'universe' ? 'text-[#ef6a61]' : 'text-slate-200'}`}
              >
                <span>THE UNIVERSE</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {universeDropdownOpen && (
                <div className="absolute top-[68px] left-0 w-64 bg-white text-slate-800 rounded-b-md shadow-2xl border-t-3 border-[#d83b35] py-2 z-50">
                  <button
                    onClick={() => handleNavClick('universe', 'solar-system')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Solar System & Planets
                  </button>
                  <button
                    onClick={() => handleNavClick('universe', 'stars')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Stars & Nebulae
                  </button>
                  <button
                    onClick={() => handleNavClick('universe', 'galaxies')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Galaxies & Cosmic Web
                  </button>
                  <button
                    onClick={() => handleNavClick('universe', 'black-holes')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Black Holes
                  </button>
                  <button
                    onClick={() => handleNavClick('universe', 'exoplanets')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Exoplanets & Habitability
                  </button>
                  <button
                    onClick={() => handleNavClick('universe', 'cosmology')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Cosmology & Origins
                  </button>
                </div>
              )}
            </div>

            {/* LIVE OBSERVATORY ▾ */}
            <div
              className="relative group py-6"
              onMouseEnter={() => setObservatoryDropdownOpen(true)}
              onMouseLeave={() => setObservatoryDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 hover:text-[#ef6a61] transition-colors ${currentView === 'observatory' ? 'text-[#ef6a61]' : 'text-slate-200'}`}
              >
                <span>LIVE OBSERVATORY</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {observatoryDropdownOpen && (
                <div className="absolute top-[68px] left-0 w-64 bg-white text-slate-800 rounded-b-md shadow-2xl border-t-3 border-[#d83b35] py-2 z-50">
                  <button
                    onClick={() => handleNavClick('observatory', 'orbital')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Orbital Mechanics Simulator
                  </button>
                  <button
                    onClick={() => handleNavClick('observatory', 'dsn-chart')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block font-semibold text-[#1769aa]"
                  >
                    DSN Signal Time-Series (Recharts)
                  </button>
                  <button
                    onClick={() => handleNavClick('observatory', 'dsn')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Deep Space Network Array
                  </button>
                  <button
                    onClick={() => handleNavClick('observatory', 'neo')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    NEO Asteroid Radar
                  </button>
                  <button
                    onClick={() => handleNavClick('observatory', 'iss')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    ISS Real-Time Ground Track
                  </button>
                  <button
                    onClick={() => handleNavClick('observatory', 'mars')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    Mars Jezero Weather Station
                  </button>
                  <button
                    onClick={() => handleNavClick('observatory', 'jwst')}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-100 hover:text-[#d83b35] transition-colors block"
                  >
                    JWST Spectroscopy
                  </button>
                </div>
              )}
            </div>

            {/* AI RESEARCH CTA BUTTON */}
            <button
              onClick={() => handleNavClick('ai-assistant')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-bold transition-all ${currentView === 'ai-assistant' ? 'bg-[#d83b35] text-white shadow-md' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ef6a61]" />
              <span>AI RESEARCH ASSISTANT</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-slate-300"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#071a32] border-t border-[#14294a] px-6 py-6 space-y-4">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left py-2 font-display text-base font-semibold text-white hover:text-[#ef6a61]"
            >
              HOME
            </button>

            <div className="pt-2 border-t border-slate-800">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#d83b35] mb-2">
                Space Sector
              </div>
              <div className="space-y-2 pl-3">
                <button onClick={() => handleNavClick('agencies')} className="block text-left text-sm text-slate-300 hover:text-white">
                  Space Agencies
                </button>
                <button onClick={() => handleNavClick('companies')} className="block text-left text-sm text-slate-300 hover:text-white">
                  Private Space Industry
                </button>
                <button onClick={() => handleNavClick('countries')} className="block text-left text-sm text-slate-300 hover:text-white">
                  Countries
                </button>
                <button onClick={() => handleNavClick('missions')} className="block text-left text-sm text-slate-300 hover:text-white">
                  Missions
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#d83b35] mb-2">
                The Universe
              </div>
              <div className="space-y-2 pl-3">
                <button onClick={() => handleNavClick('universe', 'solar-system')} className="block text-left text-sm text-slate-300 hover:text-white">
                  Solar System & Planets
                </button>
                <button onClick={() => handleNavClick('universe', 'stars')} className="block text-left text-sm text-slate-300 hover:text-white">
                  Stars & Nebulae
                </button>
                <button onClick={() => handleNavClick('universe', 'galaxies')} className="block text-left text-sm text-slate-300 hover:text-white">
                  Galaxies & Cosmology
                </button>
                <button onClick={() => handleNavClick('universe', 'black-holes')} className="block text-left text-sm text-slate-300 hover:text-white">
                  Black Holes & Exoplanets
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#d83b35] mb-2">
                Live Observatory
              </div>
              <div className="space-y-2 pl-3">
                <button onClick={() => handleNavClick('observatory', 'orbital')} className="block text-left text-sm text-slate-300 hover:text-white">
                  Orbital Mechanics Simulator
                </button>
                <button onClick={() => handleNavClick('observatory', 'dsn')} className="block text-left text-sm text-slate-300 hover:text-white">
                  Deep Space Network Radar
                </button>
                <button onClick={() => handleNavClick('observatory', 'neo')} className="block text-left text-sm text-slate-300 hover:text-white">
                  NEO Asteroid Risk Matrix
                </button>
                <button onClick={() => handleNavClick('observatory', 'iss')} className="block text-left text-sm text-slate-300 hover:text-white">
                  ISS Real-Time Ground Track
                </button>
                <button onClick={() => handleNavClick('observatory', 'mars')} className="block text-left text-sm text-slate-300 hover:text-white">
                  Mars Jezero Weather Station
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={() => handleNavClick('ai-assistant')}
                className="w-full text-center py-2.5 rounded bg-[#d83b35] text-white font-bold text-xs"
              >
                AI FLIGHT DIRECTOR & RESEARCH
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
