import React, { useState } from 'react';
import { SPACE_COMPANIES, SpaceCompany } from '../../data/spaceData';
import { Search, ExternalLink, Filter } from 'lucide-react';
import { ViewType } from '../HeaderNav';

interface CompaniesViewProps {
  onNavigate: (view: ViewType) => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');

  const filtered = SPACE_COMPANIES.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase()) ||
      c.coreCapability.toLowerCase().includes(search.toLowerCase()) ||
      c.flagshipVehicleOrConstellation.toLowerCase().includes(search.toLowerCase());

    const matchesSector = sectorFilter === 'all' || c.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#e5eaf0] py-3.5 px-6 max-w-[1200px] mx-auto text-xs text-[#778598] font-sans">
        <button onClick={() => onNavigate('home')} className="text-[#b52d2a] hover:underline font-semibold">Home</button>
        <span className="mx-2">/</span>
        <span>Space Sector</span>
        <span className="mx-2">/</span>
        <span className="text-[#101c2d]">Private Space Industry</span>
      </div>

      {/* Page Hero */}
      <section className="bg-[#071a32] text-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto space-y-3">
          <div className="text-[11px] font-sans font-bold tracking-[0.16em] text-[#ef6a61] uppercase">
            GLOBAL SPACE INDEX / COMMERCIAL INDUSTRY
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl text-white">
            Private Space Industry
          </h1>
          <p className="max-w-2xl text-slate-300 text-base leading-relaxed">
            Commercial launch vehicle developers, satellite platform operators, orbital habitation providers, and robotic logistics enterprises.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Filter controls */}
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search company, country, or vehicle..."
                className="w-full border border-[#dce3eb] rounded-sm pl-9 pr-4 py-2 text-sm text-[#101c2d] placeholder-slate-400 focus:outline-none focus:border-[#d83b35]"
              />
            </div>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="border border-[#dce3eb] bg-white text-xs py-2 px-3 rounded-sm text-slate-700 focus:outline-none focus:border-[#d83b35]"
            >
              <option value="all">All Sectors</option>
              <option value="Launch Vehicles">Launch Vehicles</option>
              <option value="Earth Observation">Earth Observation</option>
              <option value="Satellite Platforms">Satellite Platforms</option>
              <option value="Space Stations & Habitation">Space Stations</option>
              <option value="Lunar & Deep Space Logistics">Lunar Logistics</option>
            </select>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Showing {filtered.length} commercial operators
          </div>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(company => (
            <article
              key={company.name}
              className="border border-[#dce3eb] p-6 bg-white rounded-sm hover:border-slate-400 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="pb-3 mb-3 border-b border-[#eef2f6]">
                  <h3 className="font-display font-bold text-xl text-[#06152d]">{company.name}</h3>
                  <div className="text-xs text-slate-500 mt-1">
                    <span>{company.country}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span>Founded {company.founded}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span className="font-semibold text-[#1769aa]">{company.valuationOrFunding}</span>
                  </div>
                </div>

                <div className="inline-block text-[10px] font-sans font-bold tracking-wider uppercase text-[#d83b35] mb-2">
                  {company.sector}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {company.coreCapability}
                </p>

                <div className="text-xs space-y-1.5 pt-3 border-t border-[#f1f4f8] text-slate-600">
                  <div>
                    <strong className="text-slate-800">Flagship System:</strong> {company.flagshipVehicleOrConstellation}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#dce3eb] flex items-center justify-end">
                <a
                  href={company.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs font-bold font-sans uppercase tracking-wider text-[#d83b35] hover:underline flex items-center gap-1"
                >
                  <span>Company Website</span>
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
