import React, { useState } from 'react';
import { SPACE_MISSIONS, SpaceMission } from '../../data/spaceData';
import { Search, ExternalLink, Filter } from 'lucide-react';
import { ViewType } from '../HeaderNav';

interface MissionsViewProps {
  onNavigate: (view: ViewType) => void;
  initialSearch?: string;
}

export const MissionsView: React.FC<MissionsViewProps> = ({ onNavigate, initialSearch = '' }) => {
  const [search, setSearch] = useState(initialSearch);
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = SPACE_MISSIONS.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.agencyOrCompany.toLowerCase().includes(search.toLowerCase()) ||
      m.countryOrRegion.toLowerCase().includes(search.toLowerCase()) ||
      m.objective.toLowerCase().includes(search.toLowerCase());

    const matchesDest = destinationFilter === 'all' || m.destination === destinationFilter;
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;

    return matchesSearch && matchesDest && matchesStatus;
  });

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#e5eaf0] py-3.5 px-6 max-w-[1200px] mx-auto text-xs text-[#778598] font-sans">
        <button onClick={() => onNavigate('home')} className="text-[#b52d2a] hover:underline font-semibold">Home</button>
        <span className="mx-2">/</span>
        <span>Space Sector</span>
        <span className="mx-2">/</span>
        <span className="text-[#101c2d]">Missions</span>
      </div>

      {/* Page Hero */}
      <section className="bg-[#071a32] text-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto space-y-3">
          <div className="text-[11px] font-sans font-bold tracking-[0.16em] text-[#ef6a61] uppercase">
            GLOBAL SPACE INDEX / FLIGHT & EXPLORATION
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl text-white">
            From Earth Orbit to Deep Space
          </h1>
          <p className="max-w-2xl text-slate-300 text-base leading-relaxed">
            Follow the missions that launch satellites, carry humans into orbit, explore the Moon and planets, and observe the wider universe.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Filters */}
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1 max-w-2xl flex-wrap">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search mission, agency, or country..."
                className="w-full border border-[#dce3eb] rounded-sm pl-9 pr-4 py-2 text-sm text-[#101c2d] placeholder-slate-400 focus:outline-none focus:border-[#d83b35]"
              />
            </div>

            <select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className="border border-[#dce3eb] bg-white text-xs py-2 px-3 rounded-sm text-slate-700 focus:outline-none focus:border-[#d83b35]"
            >
              <option value="all">All Destinations</option>
              <option value="Earth Orbit">Earth Orbit</option>
              <option value="Moon">Moon</option>
              <option value="Mars">Mars</option>
              <option value="Sun-Earth L2">Sun-Earth L2</option>
              <option value="Jupiter & Outer Solar System">Jupiter & Outer Planets</option>
              <option value="Asteroid / Deep Space">Asteroid / Interstellar</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-[#dce3eb] bg-white text-xs py-2 px-3 rounded-sm text-slate-700 focus:outline-none focus:border-[#d83b35]"
            >
              <option value="all">All Statuses</option>
              <option value="Operational">Operational</option>
              <option value="En Route">En Route</option>
              <option value="Completed">Completed</option>
              <option value="In Development">In Development</option>
            </select>
          </div>

          <div className="text-xs font-mono text-slate-500">
            Showing {filtered.length} missions
          </div>
        </div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(m => (
            <article
              key={m.id}
              className="border border-[#dce3eb] p-6 bg-white rounded-sm hover:border-slate-400 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 pb-3 mb-3 border-b border-[#eef2f6]">
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#06152d]">{m.name}</h3>
                    <div className="text-xs text-slate-500 mt-1">
                      <span>{m.agencyOrCompany}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{m.countryOrRegion}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>Launch {m.launchYear}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded ${m.status === 'Operational' ? 'bg-emerald-50 text-emerald-700' : m.status === 'En Route' ? 'bg-sky-50 text-sky-700' : 'bg-slate-100 text-slate-600'}`}>
                    {m.status}
                  </span>
                </div>

                <div className="text-[11px] font-sans font-bold text-[#d83b35] uppercase tracking-wider mb-2">
                  Destination: {m.destination}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {m.objective}
                </p>

                <div className="text-xs space-y-1.5 pt-3 border-t border-[#f1f4f8] text-slate-600">
                  <div>
                    <strong className="text-slate-800">Trajectory:</strong> {m.trajectoryType}
                  </div>
                  {m.payloadInstruments.length > 0 && (
                    <div>
                      <strong className="text-slate-800">Payload:</strong> {m.payloadInstruments.join(', ')}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#dce3eb] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">
                  Range: {m.distanceFromEarthKm >= 1000000 ? `${(m.distanceFromEarthKm / 1000000).toFixed(1)}M km` : `${m.distanceFromEarthKm.toLocaleString()} km`}
                </span>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-sans font-bold uppercase tracking-wider text-[#d83b35] hover:underline flex items-center gap-1"
                >
                  <span>Mission Record</span>
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
