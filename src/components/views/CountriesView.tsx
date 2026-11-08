import React, { useState } from 'react';
import { COUNTRIES, CountryRecord } from '../../data/spaceData';
import { Search, ExternalLink, Globe } from 'lucide-react';
import { ViewType } from '../HeaderNav';

interface CountriesViewProps {
  onNavigate: (view: ViewType) => void;
}

export const CountriesView: React.FC<CountriesViewProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.agencies.toLowerCase().includes(search.toLowerCase()) ||
    c.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#e5eaf0] py-3.5 px-6 max-w-[1200px] mx-auto text-xs text-[#778598] font-sans">
        <button onClick={() => onNavigate('home')} className="text-[#b52d2a] hover:underline font-semibold">Home</button>
        <span className="mx-2">/</span>
        <span>Space Sector</span>
        <span className="mx-2">/</span>
        <span className="text-[#101c2d]">Countries</span>
      </div>

      {/* Page Hero */}
      <section className="bg-[#071a32] text-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto space-y-3">
          <div className="text-[11px] font-sans font-bold tracking-[0.16em] text-[#ef6a61] uppercase">
            GLOBAL SPACE INDEX / COUNTRIES
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl text-white">
            Countries & Space Capabilities
          </h1>
          <p className="max-w-2xl text-slate-300 text-base leading-relaxed">
            Compare national space activities, designated agencies, institutional investments, launch sites, and documented space exploration milestones.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Search */}
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or agency mandate..."
              className="w-full border border-[#dce3eb] rounded-sm pl-9 pr-4 py-2 text-sm text-[#101c2d] placeholder-slate-400 focus:outline-none focus:border-[#d83b35]"
            />
          </div>
          <div className="text-xs font-mono text-slate-500">
            {filtered.length} nations listed
          </div>
        </div>

        {/* Clean Data Table */}
        <div className="overflow-x-auto border border-[#dce3eb] rounded-sm mb-8">
          <table className="w-full border-collapse text-left text-sm font-sans">
            <thead>
              <tr className="bg-[#f5f7fa] border-b border-[#dce3eb] text-[10px] font-bold uppercase tracking-wider text-[#06152d]">
                <th className="py-3.5 px-5">Country</th>
                <th className="py-3.5 px-5">Designated Agencies</th>
                <th className="py-3.5 px-5">Ecosystem & National Scope</th>
                <th className="py-3.5 px-5 text-right">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dce3eb]">
              {filtered.map(c => (
                <tr key={c.name} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-4 px-5 font-display font-semibold text-base text-[#06152d]">
                    {c.name}
                  </td>
                  <td className="py-4 px-5 font-mono text-xs text-slate-700">
                    {c.agencies}
                  </td>
                  <td className="py-4 px-5 text-slate-600 text-sm leading-relaxed max-w-md">
                    {c.summary}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-xs font-bold text-[#d83b35] hover:underline whitespace-nowrap"
                    >
                      Portal ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
