import React, { useState } from 'react';
import { ViewType } from '../HeaderNav';
import { Search, ArrowRight, ExternalLink, Sparkles, Activity, ShieldCheck, Compass, Globe } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewType, subTab?: string) => void;
  onGlobalSearch: (query: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onGlobalSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onGlobalSearch(searchInput);
      onNavigate('missions');
    }
  };

  return (
    <div className="w-full bg-white">
      {/* 1. Page Hero (User's authentic minimal hero section) */}
      <section className="bg-[#071a32] text-white py-16 sm:py-24 px-6 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 78% 30%, #2b5b82, transparent 55%)'
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10 space-y-5">
          <div className="text-[11px] font-sans font-bold tracking-[0.16em] text-[#ef6a61] uppercase">
            GLOBAL SPACE INDEX / INDEPENDENT SPACE OBSERVATORY
          </div>

          <h1 className="font-display font-semibold text-4xl sm:text-6xl lg:text-7xl leading-[1.02] max-w-4xl text-white">
            One planet.<br />
            <em className="text-[#ef6a61] not-italic">Many space programmes.</em>
          </h1>

          <p className="max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            Search a growing, source-linked directory of space agencies, commercial companies, countries and missions, alongside a guide to the universe, advanced data visualizations, and AI aerospace research.
          </p>

          {/* Clean minimal Search Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-4 max-w-xl flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search agencies, companies, missions, or planets..."
                className="w-full bg-[#0d264a] border border-[#1d3d6e] rounded-md pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ef6a61] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#d83b35] hover:bg-[#b52d2a] text-white font-sans font-bold text-xs rounded-md transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* 2. Main Explore Grid Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 sm:py-20">
        <div className="space-y-3 mb-12">
          <div className="text-[11px] font-sans font-bold tracking-[0.16em] text-[#d83b35] uppercase">
            A GLOBAL VIEW
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#06152d] tracking-tight">
            Space is bigger than any one nation.
          </h2>
          <p className="max-w-3xl text-slate-600 text-base leading-relaxed">
            Explore the organisations building space programmes, the companies turning space into an industry, the missions expanding our reach, and the science that explains the universe.
          </p>
        </div>

        {/* The 6 Clean, Spacious Directory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Agencies */}
          <article className="border border-[#dce3eb] p-6 bg-white rounded-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div>
              <div className="text-[11px] font-sans font-bold tracking-[0.12em] text-[#d83b35] mb-4">
                01 / INDEX
              </div>
              <h3 className="font-display font-semibold text-xl text-[#06152d] mb-2 group-hover:text-[#d83b35] transition-colors">
                Space agencies
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                A country-by-country guide to national space agencies, public programmes and international organisations.
              </p>
            </div>
            <button
              onClick={() => onNavigate('agencies')}
              className="font-sans font-bold text-xs tracking-wider text-[#d83b35] uppercase text-left flex items-center gap-1 group-hover:underline"
            >
              <span>Explore agencies</span>
              <span aria-hidden="true">↗</span>
            </button>
          </article>

          {/* Card 2: Industry */}
          <article className="border border-[#dce3eb] p-6 bg-white rounded-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div>
              <div className="text-[11px] font-sans font-bold tracking-[0.12em] text-[#d83b35] mb-4">
                02 / INDEX
              </div>
              <h3 className="font-display font-semibold text-xl text-[#06152d] mb-2 group-hover:text-[#d83b35] transition-colors">
                Private space industry
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Commercial launch providers, satellite operators, spacecraft builders and emerging aerospace startups.
              </p>
            </div>
            <button
              onClick={() => onNavigate('companies')}
              className="font-sans font-bold text-xs tracking-wider text-[#d83b35] uppercase text-left flex items-center gap-1 group-hover:underline"
            >
              <span>Explore companies</span>
              <span aria-hidden="true">↗</span>
            </button>
          </article>

          {/* Card 3: Countries */}
          <article className="border border-[#dce3eb] p-6 bg-white rounded-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div>
              <div className="text-[11px] font-sans font-bold tracking-[0.12em] text-[#d83b35] mb-4">
                03 / INDEX
              </div>
              <h3 className="font-display font-semibold text-xl text-[#06152d] mb-2 group-hover:text-[#d83b35] transition-colors">
                Countries
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Compare national space capabilities, institutional partnerships, investments and documented milestones.
              </p>
            </div>
            <button
              onClick={() => onNavigate('countries')}
              className="font-sans font-bold text-xs tracking-wider text-[#d83b35] uppercase text-left flex items-center gap-1 group-hover:underline"
            >
              <span>Browse countries</span>
              <span aria-hidden="true">↗</span>
            </button>
          </article>

          {/* Card 4: Missions */}
          <article className="border border-[#dce3eb] p-6 bg-white rounded-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div>
              <div className="text-[11px] font-sans font-bold tracking-[0.12em] text-[#d83b35] mb-4">
                04 / INDEX
              </div>
              <h3 className="font-display font-semibold text-xl text-[#06152d] mb-2 group-hover:text-[#d83b35] transition-colors">
                Missions
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Launches, satellites, human spaceflight, lunar exploration, Mars missions and deep-space science.
              </p>
            </div>
            <button
              onClick={() => onNavigate('missions')}
              className="font-sans font-bold text-xs tracking-wider text-[#d83b35] uppercase text-left flex items-center gap-1 group-hover:underline"
            >
              <span>Explore missions</span>
              <span aria-hidden="true">↗</span>
            </button>
          </article>

          {/* Card 5: The Universe */}
          <article className="border border-[#dce3eb] p-6 bg-white rounded-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div>
              <div className="text-[11px] font-sans font-bold tracking-[0.12em] text-[#d83b35] mb-4">
                05 / INDEX
              </div>
              <h3 className="font-display font-semibold text-xl text-[#06152d] mb-2 group-hover:text-[#d83b35] transition-colors">
                The universe
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                A structured guide to planets, stars, galaxies, black holes, exoplanets and cosmological evolution.
              </p>
            </div>
            <button
              onClick={() => onNavigate('universe')}
              className="font-sans font-bold text-xs tracking-wider text-[#d83b35] uppercase text-left flex items-center gap-1 group-hover:underline"
            >
              <span>Explore the universe</span>
              <span aria-hidden="true">↗</span>
            </button>
          </article>

          {/* Card 6: Live Observatory */}
          <article className="border border-[#dce3eb] p-6 bg-white rounded-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div>
              <div className="text-[11px] font-sans font-bold tracking-[0.12em] text-[#d83b35] mb-4">
                06 / OBSERVATORY
              </div>
              <h3 className="font-display font-semibold text-xl text-[#06152d] mb-2 group-hover:text-[#d83b35] transition-colors">
                Live telemetry & visualizations
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Real-time orbital mechanics simulator, NASA Deep Space Network, asteroid radar, and ISS ground tracks.
              </p>
            </div>
            <button
              onClick={() => onNavigate('observatory')}
              className="font-sans font-bold text-xs tracking-wider text-[#d83b35] uppercase text-left flex items-center gap-1 group-hover:underline"
            >
              <span>Launch observatory</span>
              <span aria-hidden="true">↗</span>
            </button>
          </article>
        </div>

        {/* 3. Quiet Featured Strip (Clean 3-Zone Showcase) */}
        <div className="bg-[#f2f5f8] p-8 sm:p-10 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-8 border border-[#e5eaf0] mb-12">
          <div className="space-y-2">
            <div className="text-[11px] font-sans font-bold tracking-wider text-[#d83b35] uppercase">
              FLIGHT OPERATIONS
            </div>
            <strong className="block font-display font-semibold text-xl text-[#06152d]">
              International Space Station
            </strong>
            <p className="text-slate-600 text-sm leading-relaxed">
              Orbiting at 27,580 km/h with 7 crew onboard. Real-time pass predictor predicts next line-of-sight acquisition for global stations.
            </p>
            <button
              onClick={() => onNavigate('observatory', 'iss')}
              className="text-[#d83b35] font-bold text-xs uppercase hover:underline inline-block pt-1"
            >
              Track ISS Pass ↗
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-sans font-bold tracking-wider text-[#d83b35] uppercase">
              DEEP SPACE TELEMETRY
            </div>
            <strong className="block font-display font-semibold text-xl text-[#06152d]">
              NASA Deep Space Network
            </strong>
            <p className="text-slate-600 text-sm leading-relaxed">
              70m dishes in Goldstone, Madrid, and Canberra currently locked to Voyager 1 (22.7 hr RTLT), JWST, and Europa Clipper.
            </p>
            <button
              onClick={() => onNavigate('observatory', 'dsn')}
              className="text-[#d83b35] font-bold text-xs uppercase hover:underline inline-block pt-1"
            >
              View Antenna Array ↗
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-sans font-bold tracking-wider text-[#d83b35] uppercase">
              AI ASTRODYNAMICS
            </div>
            <strong className="block font-display font-semibold text-xl text-[#06152d]">
              Gemini Aerospace Assistant
            </strong>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ask questions about orbital mechanics, Hohmann delta-v transfer maneuvers, spacecraft instrumentation, and planetary geology.
            </p>
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="text-[#d83b35] font-bold text-xs uppercase hover:underline inline-block pt-1"
            >
              Ask AI Flight Director ↗
            </button>
          </div>
        </div>

        {/* 4. Editorial Notice */}
        <div className="border-l-[3px] border-[#d83b35] bg-[#f5f7fa] p-5 text-sm text-[#425168] leading-relaxed">
          <strong className="text-[#06152d]">Editorial note:</strong> This is a growing, curated reference and independent space observatory. There is no single complete public register of every space company or national programme. Entries link directly to primary space agency records and official mission telemetry archives.
        </div>
      </section>
    </div>
  );
};
