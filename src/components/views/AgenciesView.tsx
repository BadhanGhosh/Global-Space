import React, { useState } from 'react';
import { SPACE_AGENCIES, SpaceAgency } from '../../data/spaceData';
import { Search, ExternalLink, Globe2 } from 'lucide-react';
import { ViewType } from '../HeaderNav';

interface AgenciesViewProps {
  onNavigate: (view: ViewType) => void;
}

export const AgenciesView: React.FC<AgenciesViewProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');

  const filtered = SPACE_AGENCIES.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.acronym.toLowerCase().includes(search.toLowerCase()) ||
    a.country.toLowerCase().includes(search.toLowerCase()) ||
    a.focus.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#e5eaf0] py-3.5 px-6 max-w-[1200px] mx-auto text-xs text-[#778598] font-sans">
        <button onClick={() => onNavigate('home')} className="text-[#b52d2a] hover:underline font-semibold">Home</button>
        <span className="mx-2">/</span>
        <span>Space Sector</span>
        <span className="mx-2">/</span>
        <span className="text-[#101c2d]">Space Agencies</span>
      </div>

      {/* Page Hero */}
      <section className="bg-[#071a32] text-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto space-y-3">
          <div className="text-[11px] font-sans font-bold tracking-[0.16em] text-[#ef6a61] uppercase">
            GLOBAL SPACE INDEX / SPACE AGENCIES
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl text-white">
            National Space Agencies
          </h1>
          <p className="max-w-2xl text-slate-300 text-base leading-relaxed">
            A country-by-country guide to civil space agencies, governmental exploration mandates, launch vehicle programs, and planetary science.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Search Bar */}
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by agency, acronym, or country..."
              className="w-full border border-[#dce3eb] rounded-sm pl-9 pr-4 py-2 text-sm text-[#101c2d] placeholder-slate-400 focus:outline-none focus:border-[#d83b35]"
            />
          </div>
          <div className="text-xs font-mono text-slate-500">
            Showing {filtered.length} of {SPACE_AGENCIES.length} agencies
          </div>
        </div>

        {/* Agency Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(agency => (
            <article
              key={agency.acronym}
              className="border border-[#dce3eb] p-6 bg-white rounded-sm hover:border-slate-400 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 pb-3 mb-3 border-b border-[#eef2f6]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: agency.badgeColor }} />
                      <h3 className="font-display font-bold text-xl text-[#06152d]">{agency.acronym}</h3>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      <span>{agency.country}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>Est. {agency.established}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span className="font-semibold text-slate-700">${agency.budgetBillionsUSD}B Budget</span>
                    </div>
                  </div>
                </div>

                <p className="font-sans font-medium text-sm text-[#101c2d] mb-1">
                  {agency.name}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {agency.focus}
                </p>

                <div className="text-xs space-y-1.5 pt-3 border-t border-[#f1f4f8] text-slate-600">
                  <div>
                    <strong className="text-slate-800">Headquarters:</strong> {agency.headquarters}
                  </div>
                  <div>
                    <strong className="text-slate-800">Flagship Programs:</strong> {agency.flagshipPrograms.join(', ')}
                  </div>
                  <div>
                    <strong className="text-slate-800">Key Launchers:</strong> {agency.keyLaunchVehicles.join(', ')}
                  </div>
                  <div>
                    <strong className="text-slate-800">Active Fleet:</strong> {agency.activeFleet}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#dce3eb] flex items-center justify-end">
                <a
                  href={agency.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs font-bold font-sans uppercase tracking-wider text-[#d83b35] hover:underline flex items-center gap-1"
                >
                  <span>Official Agency Portal</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
